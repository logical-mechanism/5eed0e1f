use colored::Colorize;
use seedelf_cli::display;
use clap::Args;
use seedelf_cli::utxos;
use seedelf_cli::koios::{nft_utxo, UtxoResponse};
use crate::commands::dapp::newm::constants::{ get_config, Config, USE_USD_FLAG,
};
use crate::commands::dapp::newm::types::extract_token;


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
    match nft_utxo(config.pointer_policy.to_string(), token_name, network_flag).await {
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

    println!("{:?}", oracle_utxo);
    let sale_datum = sale_utxo.clone().inline_datum;
    let bundle = extract_token(&sale_datum, true).unwrap();
    let cost = extract_token(&sale_datum, false).unwrap();

    let (_sale_lovelace, tokens) = utxos::assets_of(vec![sale_utxo.clone()]);
    println!(
        "{} {}",
        "\nTokens Left On Sale:".bright_magenta(),
        tokens.quantity_of(bundle.pid, bundle.tkn).unwrap()
    );
    if cost.pid == USE_USD_FLAG {
        // Convert to f64 for floating-point division
        println!("{:?}",cost);
        let result: f64 = cost.amt as f64 / 1_000_000.0 / 1_000_000.0;
        println!(
            "{} {} {}",
            "Each Stream Token is".yellow(),
            result,
            "USD".yellow()
        )
    } else {
        println!(
            "{} {} {}",
            "Each Stream Token is".yellow(),
            format_args!("{:.6}", cost.amt as f64 / 1_000_000.0),
            "NEWM".yellow()
        )
    }

    Ok(())
}
