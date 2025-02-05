use pallas_addresses::{
    Address, Network, ScriptHash, ShelleyAddress, ShelleyDelegationPart,
    ShelleyPaymentPart, StakeKeyHash,
};

pub struct Currency {
    pub policy_id: &'static str,
    pub token_name: &'static str,
}

pub struct Config {
    pub queue_address: Address,
    pub oracle_token: Currency,
    pub profit_token: Currency,
    pub pointer_policy: &'static str,
}

/// We can store all variants of the contracts inside this function then call it whenever we need it.
pub fn get_config(network_flag: bool) -> Config {
    // Construct the Shelley wallet address based on the network flag.
    let shelly_queue_address: ShelleyAddress = if network_flag {
        ShelleyAddress::new(
            Network::Testnet,
            ShelleyPaymentPart::Script(ScriptHash::new(
                hex::decode("b729a61f224d6688a05e8388cf3ff7a2071d43618c38335c9aecaea2")
                    .unwrap()
                    .try_into()
                    .expect("Incorrect Length"),
            )),
            ShelleyDelegationPart::Key(StakeKeyHash::new(
                hex::decode("071f5d431a0b4c79c62ae51362a1b449db1c9791adeab0744d6fcdb3")
                    .unwrap()
                    .try_into()
                    .expect("Incorrect Length"),
            )),
        )
    } else {
        ShelleyAddress::new(
            Network::Mainnet,
            ShelleyPaymentPart::Script(ScriptHash::new(
                hex::decode("fd4572b20a1d76e7dc0aaa548579bacc2b318a4862a7e12f94b7e76d")
                    .unwrap()
                    .try_into()
                    .expect("Incorrect Length"),
            )),
            ShelleyDelegationPart::Key(StakeKeyHash::new(
                hex::decode("db7245ff4fe23633e2c10ef62374ca6b64efd80d31fc3f7c431386e0")
                    .unwrap()
                    .try_into()
                    .expect("Incorrect Length"),
            )),
        )
    };
    // we need this as the address type and not the shelley
    let queue_address: Address = Address::from(shelly_queue_address.clone());

    let oracle_token: Currency =  if network_flag {
        Currency {
            policy_id: "362e3f869c98ce971ead0e2705c56df467ddd2aecb44f6f216c3e1d5",
            token_name: "4f7261636c6546656564",
        }
    } else {
        Currency {
            policy_id: "f155a26044efe91b3c44f87a7536d2d631c847717930ff547ae9d05c",
            token_name: "4f7261636c6546656564",
        }
    };
    
    let profit_token: Currency =  if network_flag {
        Currency {
            policy_id: "769c4c6e9bc3ba5406b9b89fb7beb6819e638ff2e2de63f008d5bcff",
            token_name: "744e45574d",
        }
    } else {
        Currency {
            policy_id: "682fe60c9918842b3323c43b5144bc3d52a23bd2fb81345560d73f63",
            token_name: "4e45574d",
        }
    };
    
    let pointer_policy: &str = if network_flag {
        "f5cb10641e282c4a18084e51bd717475d6984978b0e32d624b4b1c32"
    } else {
        "26c0f8e2d3be37de297fa57c48820fcb24c7b09aebe280430cef9d87"
    };
    
    Config {
        queue_address,
        oracle_token,
        profit_token,
        pointer_policy,
    }
}

pub const _MAINNET_QUEUE_CONTRACT_HASH: &str =
    "fd4572b20a1d76e7dc0aaa548579bacc2b318a4862a7e12f94b7e76d";
pub const _MAINNET_NEWM_STAKE_KEY: &str =
    "db7245ff4fe23633e2c10ef62374ca6b64efd80d31fc3f7c431386e0";

pub const _PREPROD_QUEUE_CONTRACT_HASH: &str =
    "b729a61f224d6688a05e8388cf3ff7a2071d43618c38335c9aecaea2";
pub const _PREPROD_NEWM_STAKE_KEY: &str =
    "071f5d431a0b4c79c62ae51362a1b449db1c9791adeab0744d6fcdb3";

pub const _MAINNET_ORACLE_POLICY_ID: &str =
    "f155a26044efe91b3c44f87a7536d2d631c847717930ff547ae9d05c";
pub const _MAINNET_ORACLE_TOKEN_NAME: &str = "4f7261636c6546656564";

pub const _PREPROD_ORACLE_POLICY_ID: &str =
    "362e3f869c98ce971ead0e2705c56df467ddd2aecb44f6f216c3e1d5";
pub const _PREPROD_ORACLE_TOKEN_NAME: &str = "4f7261636c6546656564";

pub const _MAINNET_PROFIT_MARGIN: u64 = 500000000000;
pub const _PREPROD_PROFIT_MARGIN: u64 = 500000000000;
pub const USE_USD_FLAG: &str = "555344";

pub const _MAINNET_PROFIT_POLICY_ID: &str =
    "682fe60c9918842b3323c43b5144bc3d52a23bd2fb81345560d73f63";
pub const _MAINNET_PROFIT_TOKEN_NAME: &str = "4e45574d";

pub const _PREPROD_PROFIT_POLICY_ID: &str =
    "769c4c6e9bc3ba5406b9b89fb7beb6819e638ff2e2de63f008d5bcff";
pub const _PREPROD_PROFIT_TOKEN_NAME: &str = "744e45574d";


pub const MAINNET_POINTER_POLICY_ID: &str =
    "26c0f8e2d3be37de297fa57c48820fcb24c7b09aebe280430cef9d87";
pub const PREPROD_POINTER_POLICY_ID: &str =
    "f5cb10641e282c4a18084e51bd717475d6984978b0e32d624b4b1c32";

