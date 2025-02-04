use clap::{Args, Subcommand};
pub mod constants;
pub mod types;
pub mod view_sale;
pub mod create_order;
pub mod guide;

#[derive(Subcommand)]
pub enum NEWMCommands {
    /// A Basic How-To Guide For dApp Interactions
    Guide,
    /// View Sale Information
    View(view_sale::ViewSaleArgs),
    // Create Order For Sale
    Create,
}

#[derive(Args)]
pub struct NEWMArgs {
    #[command(subcommand)]
    pub command: NEWMCommands,
}

pub async fn run(args: NEWMArgs, preprod_flag: bool) -> Result<(), String> {
    match args.command {
        NEWMCommands::View(args) => view_sale::run(args, preprod_flag).await,
        NEWMCommands::Guide => Ok(guide::run(preprod_flag)),
        NEWMCommands::Create => Ok(create_order::run(preprod_flag)),
    }
}
