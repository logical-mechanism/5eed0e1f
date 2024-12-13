use clap::Args;
use blstrs::Scalar;
use pallas_addresses::Address;
use pallas_crypto::key::ed25519::{SecretKey, PublicKey};
use pallas_primitives::Hash;
use pallas_traverse::fees;
use pallas_txbuilder::{BuildConway, Input, Output, StagingTransaction, BuiltTransaction};
use pallas_wallet::PrivateKey;
use rand_core::OsRng;
use seedelf_cli::address;
use seedelf_cli::constants::{
    plutus_v3_cost_model, COLLATERAL_HASH, COLLATERAL_PUBLIC_KEY, SEEDELF_POLICY_ID,
    WALLET_CONTRACT_HASH,
};
use seedelf_cli::data_structures;
use seedelf_cli::koios::{
    contains_policy_id, credential_utxos, evaluate_transaction, extract_bytes_with_logging,
    submit_tx, witness_collateral,
};
use seedelf_cli::register::Register;
use seedelf_cli::schnorr::create_proof;
use seedelf_cli::transaction;
use crate::setup;

/// Struct to hold command-specific arguments
#[derive(Args)]
pub struct TransforArgs {
    /// Seedelf to send funds too
    #[arg(long, help = "The Seedelf receiving funds.")]
    seedelf: String,

    /// The amount of ADA to send
    #[arg(long, help = "The amount of ADA being sent to the Seedelf.")]
    lovelace: u64,
}

pub async fn run(args: TransforArgs, network_flag: bool) -> Result<(), String> {
    if network_flag {
        println!("\nRunning In Preprod Environment");
    }

    if args.lovelace < transaction::wallet_minimum_lovelace() {
        return Err("Amount Too Small For Min UTxO".to_string());
    }

    let collat_addr: Address = address::collateral_address(network_flag);
    let wallet_addr: Address = address::wallet_contract(network_flag);

    // this is used to calculate the real fee
    let mut draft_tx: StagingTransaction = StagingTransaction::new();

    let mut input_vector: Vec<Input> = Vec::new();
    let mut register_vector: Vec<Register> = Vec::new();

    // we will assume lovelace only right now
    let mut total_lovelace_found: u64 = 0;
    let mut number_of_utxos: u64 = 0;
    let max_utxos: u64 = 20;
    let lovelace_goal: u64 = args.lovelace;

    // if there is change going back then we need this to rerandomize a datum
    let scalar: Scalar = setup::load_wallet();

    let mut found_seedelf: bool = false;
    let mut seedelf_datum: Register = Register::default();


    match credential_utxos(WALLET_CONTRACT_HASH, network_flag).await {
        Ok(utxos) => {
            for utxo in utxos {
                // Extract bytes
                if let Some(inline_datum) = extract_bytes_with_logging(&utxo.inline_datum) {
                    if !found_seedelf && contains_policy_id(&utxo.asset_list, SEEDELF_POLICY_ID) {
                        let asset_name = utxo
                                .asset_list
                                .as_ref()
                                .and_then(|vec| {
                                    vec.iter()
                                        .find(|asset| asset.policy_id == SEEDELF_POLICY_ID)
                                        .map(|asset| &asset.asset_name)
                                })
                                .unwrap();
                            if asset_name == &args.seedelf {
                                found_seedelf = true;
                                seedelf_datum = inline_datum.clone();
                            }
                    }
                    // utxo must be owned by this secret scaler
                    if inline_datum.is_owned(scalar) {
                        // its owned but it can't hold a seedelf
                        if !contains_policy_id(&utxo.asset_list, SEEDELF_POLICY_ID) {
                            if number_of_utxos >= max_utxos {
                                // all is set and we hit the max utxos allowed in a single tx
                                println!("Too many utxos");
                                break;
                            }

                            if total_lovelace_found >= (lovelace_goal + 2_000_000) {
                                // The extra two ada is for the chnage that has to exist
                                println!("Found all the required lovelace");
                                break;
                            }

                            let lovelace: u64 =
                                utxo.value.parse::<u64>().expect("Invalid Lovelace");
                            // draft and raw are built the same here
                            draft_tx = draft_tx.input(Input::new(
                                pallas_crypto::hash::Hash::new(
                                    hex::decode(utxo.tx_hash.clone())
                                        .expect("Invalid hex string")
                                        .try_into()
                                        .expect("Failed to convert to 32-byte array"),
                                ),
                                utxo.tx_index,
                            ));
                            input_vector.push(Input::new(
                                pallas_crypto::hash::Hash::new(
                                    hex::decode(utxo.tx_hash.clone())
                                        .expect("Invalid hex string")
                                        .try_into()
                                        .expect("Failed to convert to 32-byte array"),
                                ),
                                utxo.tx_index,
                            ));
                            // do the registers
                            register_vector.push(inline_datum.clone());
                            // just sum up all the lovelace of the ada only inputs
                            total_lovelace_found += lovelace;
                            number_of_utxos += 1;
                        }
                    }
                }
            }
        }
        Err(err) => {
            eprintln!(
                "Failed to fetch UTxOs: {}\nWait a few moments and try again.",
                err
            );
        }
    }

    if !found_seedelf {
        return Err("Seedelf Not Found".to_string());
    }

    if total_lovelace_found < (lovelace_goal + 2_000_000) {
        return Err("Not Enough Lovelace".to_string());
    }

    // This is some semi legit fee to be used to estimate it
    let tmp_fee: u64 = 200_000;

    // we can fake the signature here to get the correct tx size
    let one_time_secret_key: SecretKey = SecretKey::new(&mut OsRng);
    let one_time_private_key: PrivateKey = PrivateKey::from(one_time_secret_key.clone());
    let public_key_hash: Hash<28> =
        pallas_crypto::hash::Hasher::<224>::hash(one_time_private_key.public_key().as_ref());
    let pkh: String = hex::encode(public_key_hash);

    // build out the rest of the draft tx with the tmp fee
    draft_tx = draft_tx
        .output(Output::new(
            wallet_addr.clone(),
                lovelace_goal,
        ).set_inline_datum(seedelf_datum.clone().rerandomize().to_vec()))
        .output(Output::new(
            wallet_addr.clone(),
            total_lovelace_found - lovelace_goal - tmp_fee,
        )
        .set_inline_datum(Register::create(scalar).rerandomize().to_vec()))
        .collateral_input(transaction::collateral_input(network_flag))
        .collateral_output(Output::new(
            collat_addr.clone(),
            5_000_000 - (tmp_fee) * 3 / 2,
        ))
        .fee(tmp_fee)
        .reference_input(transaction::wallet_reference_utxo(network_flag))
        .language_view(
            pallas_txbuilder::ScriptKind::PlutusV3,
            plutus_v3_cost_model(),
        )
        .disclosed_signer(pallas_crypto::hash::Hash::new(
            hex::decode(&pkh)
                .unwrap()
                .try_into()
                .expect("Not Correct Length"),
        ))
        .disclosed_signer(pallas_crypto::hash::Hash::new(
            hex::decode(COLLATERAL_HASH)
                .unwrap()
                .try_into()
                .expect("Not Correct Length"),
        ));
    
    // Use zip to pair elements from the two lists
    for (input, datum) in input_vector.clone()
        .into_iter()
        .zip(register_vector.clone().into_iter())
    {
        let (z, g_r) = create_proof(datum, scalar, pkh.clone());
        let spend_redeemer_vector = data_structures::create_spend_redeemer(z, g_r, pkh.clone());
        draft_tx = draft_tx.add_spend_redeemer(
            input,
            spend_redeemer_vector.clone(),
            Some(pallas_txbuilder::ExUnits {
                mem: 14_000_000,
                steps: 10_000_000_000,
            }),
        )
    }

    // this is what will be signed when the real fee is known
    let mut raw_tx: StagingTransaction = draft_tx
        .clone()
        .clear_fee()
        .clear_collateral_output()
        .remove_output(1);

    // Use zip to pair elements from the two lists
    for input in input_vector.clone()
        .into_iter()
    {
        raw_tx = raw_tx.remove_spend_redeemer(
            input,
        );
    }

    let intermediate_tx: BuiltTransaction = draft_tx.build_conway_raw().unwrap();

    let mut budgets: Vec<(u64, u64)> = Vec::new();
    match evaluate_transaction(hex::encode(intermediate_tx.tx_bytes.as_ref()), network_flag).await {
        Ok(execution_units) => {
            if let Some(_error) = execution_units.get("error") {
                println!("{:?}", execution_units);
                std::process::exit(1);
            }
            budgets = transaction::extract_budgets(&execution_units)
        }
        Err(err) => {
            eprintln!("Failed to evaluate transaction: {}", err);
        }
    };

    // we can fake the signature here to get the correct tx size
    let fake_signer_secret_key: SecretKey = SecretKey::new(&mut OsRng);
    let fake_signer_private_key: PrivateKey = PrivateKey::from(fake_signer_secret_key);

    let tx_size: u64 = intermediate_tx
        .sign(one_time_private_key)
        .unwrap()
        .sign(fake_signer_private_key)
        .unwrap()
        .tx_bytes
        .0
        .len()
        .try_into()
        .unwrap();
    let tx_fee: u64 = fees::compute_linear_fee_policy(tx_size, &(fees::PolicyParams::default()));
    println!("\nTx Size Fee: {:?}", tx_fee);

    // This probably should be a function
    let compute_fee: u64 = transaction::total_computation_fee(budgets.clone());
    println!("Compute Fee: {:?}", compute_fee);

    // 587 for mint, 633 for spend
    let script_reference_fee: u64 = 633 * 15;
    println!("Script Reference Fee: {:?}", script_reference_fee);

    // total fee is the sum of everything
    let mut total_fee: u64 = tx_fee + compute_fee + script_reference_fee;
    // total fee needs to be even for the collateral calculation to work
    total_fee = if total_fee % 2 == 1 {
        total_fee + 1
    } else {
        total_fee
    };
    println!("Total Fee: {:?}", total_fee);

    raw_tx = raw_tx
        .output(Output::new(
            wallet_addr.clone(),
            total_lovelace_found - lovelace_goal - total_fee,
        )
        .set_inline_datum(Register::create(scalar).rerandomize().to_vec()))
        .collateral_output(Output::new(
            collat_addr.clone(),
            5_000_000 - (total_fee) * 3 / 2,
        ))
        .fee(total_fee);
    
    for ((input, datum), (cpu, mem)) in input_vector.clone()
        .into_iter()
        .zip(register_vector.clone().into_iter())
        .zip(budgets.clone().into_iter())
    {
        let (z, g_r) = create_proof(datum, scalar, pkh.clone());
        let spend_redeemer_vector = data_structures::create_spend_redeemer(z, g_r, pkh.clone());
        raw_tx = raw_tx.add_spend_redeemer(
            input,
            spend_redeemer_vector.clone(),
            Some(pallas_txbuilder::ExUnits {
                mem: mem,
                steps: cpu,
            }),
        )
    }

    let tx: BuiltTransaction = raw_tx.build_conway_raw().unwrap();
    // need to witness it now
    let tx_cbor: String = hex::encode(tx.tx_bytes.as_ref());

    let public_key_vector: [u8; 32] = hex::decode(COLLATERAL_PUBLIC_KEY)
        .unwrap()
        .try_into()
        .unwrap();
    let witness_public_key: PublicKey = PublicKey::from(public_key_vector);

    match witness_collateral(tx_cbor.clone(), network_flag).await {
        Ok(witness) => {
            let witness_cbor = witness.get("witness").and_then(|v| v.as_str()).unwrap();
            let witness_sig = &witness_cbor[witness_cbor.len() - 128..];
            let witness_vector: [u8; 64] = hex::decode(witness_sig).unwrap().try_into().unwrap();

            let signed_tx_cbor = tx
                .sign(pallas_wallet::PrivateKey::from(one_time_secret_key.clone()))
                .unwrap()
                .add_signature(witness_public_key, witness_vector)
                .unwrap();

            println!(
                "\nTx Cbor: {:?}",
                hex::encode(signed_tx_cbor.tx_bytes.clone())
            );

            match submit_tx(hex::encode(signed_tx_cbor.tx_bytes), network_flag).await {
                Ok(response) => {
                    if let Some(_error) = response.get("contents") {
                        println!("\nError: {}", response);
                        std::process::exit(1);
                    }
                    println!("\nTransaction Successfully Submitted!");
                    println!("\nTx Hash: {}", response.as_str().unwrap_or("default"));
                    if network_flag {
                        println!(
                            "\nhttps://preprod.cardanoscan.io/transaction/{}",
                            response.as_str().unwrap_or("default")
                        );
                    } else {
                        println!(
                            "\nhttps://cardanoscan.io/transaction/{}",
                            response.as_str().unwrap_or("default")
                        );
                    }
                }
                Err(err) => {
                    eprintln!("Failed to submit tx: {}", err);
                }
            }
        }
        Err(err) => {
            eprintln!("Failed to fetch UTxOs: {}", err);
        }
    }


    Ok(())
}
