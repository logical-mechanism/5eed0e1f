use colored::Colorize;
use seedelf_cli::display;

pub fn run(network_flag: bool) {
    display::preprod_text(network_flag);
    println!(
        "{}",
        "\nCreating Order".bright_white(),
    );
}
