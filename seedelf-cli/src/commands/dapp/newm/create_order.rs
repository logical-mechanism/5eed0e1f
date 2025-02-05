use colored::Colorize;
use pallas_primitives::Fragment;
use seedelf_cli::display;
use clap::Args;
use seedelf_cli::utxos;
use crate::commands::dapp::newm::constants::{ get_config, Config, USE_USD_FLAG, MAINNET_PROFIT_MARGIN, PREPROD_PROFIT_MARGIN, MAINNET_PROFIT_POLICY_ID, MAINNET_PROFIT_TOKEN_NAME, PREPROD_PROFIT_POLICY_ID, PREPROD_PROFIT_TOKEN_NAME
};
use crate::commands::dapp::newm::types::{extract_token, extract_price, queue_datum};
use blstrs::Scalar;
use seedelf_cli::setup;
use seedelf_cli::address;
use seedelf_cli::convert;
use pallas_txbuilder::{BuildConway, BuiltTransaction, Input, Output, StagingTransaction};
use seedelf_cli::register::Register;
use seedelf_cli::constants::{VARIANT, COLLATERAL_HASH, plutus_v3_cost_model};
use seedelf_cli::assets::{Asset, Assets};
use seedelf_cli::koios::{
    ada_handle_address, evaluate_transaction, extract_bytes_with_logging, submit_tx,
    witness_collateral, UtxoResponse, nft_utxo
};
use pallas_crypto::key::ed25519::{PublicKey, SecretKey};
use rand_core::OsRng;
use pallas_primitives::Hash;
use pallas_wallet::PrivateKey;
use seedelf_cli::transaction::{
    address_minimum_lovelace_with_assets, collateral_input, extract_budgets, total_computation_fee,
    wallet_minimum_lovelace_with_assets, wallet_reference_utxo,
};
use pallas_addresses::Address;

/// Struct to hold command-specific arguments
#[derive(Args)]
pub struct CreateOrderArgs {
    #[arg(
        short = 'p',
        long,
        help = "The pointer token name for locating a sale.",
        display_order = 1
    )]
    pointer: String,

    #[arg(
        short = 'a',
        long,
        help = "The amount of stream tokens.",
        display_order = 2
    )]
    amount: u64,
}

pub async fn run(args: CreateOrderArgs, network_flag: bool) -> Result<(), String> {
    display::preprod_text(network_flag);
    let config: Config = get_config(network_flag);
    let token_name: String = args.pointer;

    println!(
        "\n Creating Order: {} For {} Tokens",
        token_name.bright_white(),
        args.amount.to_string().bright_white(),
    );

    let mut sale_utxo: UtxoResponse = UtxoResponse::default();
    let mut oracle_utxo: UtxoResponse = UtxoResponse::default();

    // get the sale
    match nft_utxo(config.pointer_policy.to_string(), token_name.clone(), network_flag).await {
        Ok(utxos) => {
            if utxos.is_empty() {
                return Err("No Sale Found".to_string());
            }
            sale_utxo = utxos.first().unwrap().clone();
        }
        Err(err) => {
            eprintln!("Failed to fetch UTxOs: {}", err);
        }
    }

    // get the oracle
    match nft_utxo(config.oracle_token.policy_id.to_string(), config.oracle_token.token_name.to_string(), network_flag).await {
        Ok(utxos) => {
            if utxos.is_empty() {
                return Err("No Oracle Found".to_string());
            }
            oracle_utxo = utxos.first().unwrap().clone();
        }
        Err(err) => {
            eprintln!("Failed to fetch UTxOs: {}", err);
        }
    }

    let oracle_datum = oracle_utxo.clone().inline_datum;
    let price = extract_price(&oracle_datum);
    let sale_datum = sale_utxo.clone().inline_datum;
    let bundle = extract_token(&sale_datum, true).unwrap();
    let cost = extract_token(&sale_datum, false).unwrap();
    

    let (_sale_lovelace, tokens) = utxos::assets_of(vec![sale_utxo.clone()]);
    println!(
        "{} {}",
        "\nTokens Left On Sale:".bright_magenta(),
        tokens.quantity_of(bundle.pid, bundle.tkn).unwrap()
    );
    let incentive: u64 = 1_000_000;

    let profit = if network_flag {
        PREPROD_PROFIT_MARGIN / price
    } else {
        MAINNET_PROFIT_MARGIN / price
    };
    
    let newm_payment: u64 = if cost.pid == USE_USD_FLAG {
        // Convert to f64 for floating-point division
        let result: f64 = cost.amt as f64 / 1_000_000.0 / 1_000_000.0;
        println!(
            "{} {} {}",
            "Each Stream Token is".yellow(),
            result,
            "USD".yellow()
        );
        args.amount * cost.amt / price
    } else {
        println!(
            "{} {} {}",
            "Each Stream Token is".yellow(),
            format_args!("{:.6}", cost.amt as f64 / 1_000_000.0),
            "NEWM".yellow()
        );
        args.amount * cost.amt
    };
    
    println!("Pay: {:?} NEWM", newm_payment as f64 / 1_000_000.0);
    println!("Profit: {:?} NEWM", profit as f64 / 1_000_000.0);
    println!("Incentive: {:?} NEWM", (incentive as f64) / 1_000_000.0);
    // add in an additional 5% newm for price variation
    let total_newm = 2*incentive + profit + (profit / 20) + newm_payment;
    println!("Total: {:?} NEWM", (total_newm as f64) / 1_000_000.0);

    let scalar: Scalar = setup::load_wallet();
    let vkey: String = convert::secret_key_to_public_key(scalar);
    let stake: &str = address::stake_key(network_flag);
    let outbound_datum: Vec<u8> = queue_datum(&vkey, stake, args.amount, incentive, &token_name.clone(), network_flag);
    println!("Queue Datum: {}", hex::encode(outbound_datum.clone()));
    
    // this is used to calculate the real fee
    let mut draft_tx: StagingTransaction = StagingTransaction::new();

    let mut selected_tokens: Assets = Assets::new();
    let newm_pid = if network_flag {PREPROD_PROFIT_POLICY_ID} else {MAINNET_PROFIT_POLICY_ID};
    let newm_tkn = if network_flag {PREPROD_PROFIT_TOKEN_NAME} else {MAINNET_PROFIT_TOKEN_NAME};
    selected_tokens = selected_tokens.add(Asset::new(newm_pid.to_string(), newm_tkn.to_string(), total_newm));

    let mut input_vector: Vec<Input> = Vec::new();
    let mut register_vector: Vec<Register> = Vec::new();
    
    // just set the min lovelace is 5 ada
    let minimum_lovelace: u64 = 5_000_000;

    let collat_addr: Address = address::collateral_address(network_flag);

    let owned_utxos: Vec<UtxoResponse> =
        utxos::collect_wallet_utxos(scalar, network_flag, VARIANT).await;
    
    let usuable_utxos: Vec<UtxoResponse> =
        utxos::select(owned_utxos, minimum_lovelace, selected_tokens.clone());
    
    if usuable_utxos.is_empty() {
        return Err("Not Enough Lovelace/Tokens".to_string());
    }

    let (total_lovelace_found, tokens) = utxos::assets_of(usuable_utxos.clone());
    let change_tokens: Assets = tokens.separate(selected_tokens.clone());

    for utxo in usuable_utxos.clone() {
        let this_input: Input = Input::new(
            pallas_crypto::hash::Hash::new(
                hex::decode(utxo.tx_hash.clone())
                    .expect("Invalid hex string")
                    .try_into()
                    .expect("Failed to convert to 32-byte array"),
            ),
            utxo.tx_index,
        );
        let inline_datum: Register = extract_bytes_with_logging(&utxo.inline_datum)
            .ok_or("Not Register Type".to_string())
            .unwrap();
        // draft and raw are built the same here
        draft_tx = draft_tx.input(this_input.clone());
        input_vector.push(this_input.clone());
        // do the registers
        register_vector.push(inline_datum.clone());
    }

    // This is some semi legit fee to be used to estimate it
    let tmp_fee: u64 = 200_000;

    let mut queue_output: Output =
        Output::new(config.queue_address, minimum_lovelace).set_inline_datum(outbound_datum);
    for asset in selected_tokens.items.clone() {
        queue_output = queue_output
            .add_asset(asset.policy_id, asset.token_name, asset.amount)
            .unwrap();
    }

    // we can fake the signature here to get the correct tx size
    let one_time_secret_key: SecretKey = SecretKey::new(OsRng);
    let one_time_private_key: PrivateKey = PrivateKey::from(one_time_secret_key.clone());
    let public_key_hash: Hash<28> =
        pallas_crypto::hash::Hasher::<224>::hash(one_time_private_key.public_key().as_ref());
    let pkh: String = hex::encode(public_key_hash);

    // build out the rest of the draft tx with the tmp fee
    draft_tx = draft_tx
        .output(queue_output)
        .collateral_input(collateral_input(network_flag))
        .collateral_output(Output::new(
            collat_addr.clone(),
            5_000_000 - (tmp_fee) * 3 / 2,
        ))
        .fee(tmp_fee)
        .reference_input(wallet_reference_utxo(network_flag, VARIANT))
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
    
    Ok(())
}
