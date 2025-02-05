use seedelf_cli::koios::InlineDatum;
use serde::{Deserialize, Serialize};
use serde_json::Value;
use pallas_primitives::{
    alonzo::{Constr, MaybeIndefArray, PlutusData},
    BoundedBytes, Fragment, BigInt
};
use hex::FromHex;
use crate::commands::dapp::newm::constants::{MAINNET_PROFIT_POLICY_ID, MAINNET_PROFIT_TOKEN_NAME, PREPROD_PROFIT_POLICY_ID, PREPROD_PROFIT_TOKEN_NAME};


#[derive(Serialize, Deserialize, PartialEq, Eq, Debug, Hash, Clone, Default)]
pub struct Wallet {
    pub pkh: String,
    pub sc: String,
}

#[derive(Serialize, Deserialize, PartialEq, Eq, Debug, Hash, Clone, Default)]
pub struct Token {
    pub pid: String,
    pub tkn: String,
    pub amt: u64,
}

impl Token {
    pub fn new(pid: String, tkn: String, amt: u64) -> Self {
        Self { pid, tkn, amt }
    }
}

#[derive(Serialize, Deserialize, PartialEq, Eq, Debug, Hash, Clone, Default)]
pub struct SaleDatum {
    pub owner: Wallet,
    pub bundle: Token,
    pub cost: Token,
    pub max_bundle_size: u64,
}

pub fn extract_token(inline_datum: &Option<InlineDatum>, bundle_flag: bool) -> Option<Token> {
    let position: usize = if bundle_flag { 1 } else { 2 };
    inline_datum
        .as_ref()
        .and_then(|datum| match &datum.value {
            Value::Object(value_map) => value_map.get("fields"),
            _ => None,
        })
        .and_then(|fields| match fields {
            Value::Array(fields) => fields.get(position), // Get the third element
            _ => None,
        })
        .and_then(|field| match field {
            Value::Object(field_map) => field_map.get("fields"),
            _ => None,
        })
        .and_then(|fields| match fields {
            Value::Array(fields) => {
                // Extract the pid, tkn, and amt fields
                let pid = fields.first().and_then(|field| match field {
                    Value::Object(obj) => {
                        obj.get("bytes").and_then(|b| b.as_str().map(String::from))
                    }
                    _ => None,
                })?;

                let tkn = fields.get(1).and_then(|field| match field {
                    Value::Object(obj) => {
                        obj.get("bytes").and_then(|b| b.as_str().map(String::from))
                    }
                    _ => None,
                })?;

                let amt = fields.get(2).and_then(|field| match field {
                    Value::Object(obj) => obj.get("int").and_then(|i| i.as_u64()),
                    _ => None,
                })?;

                Some(Token::new(pid, tkn, amt))
            }
            _ => None,
        })
}


pub fn extract_price(inline_datum: &Option<InlineDatum>) -> u64 {
    // Get a reference to the datum; panic if missing.
    let datum = inline_datum.as_ref().expect("Missing InlineDatum");
    
    // Navigate to the map array using a JSON pointer.
    let map_entries = datum.value
        .pointer("/fields/0/fields/0/map")
        .expect("Couldn't find map entries")
        .as_array()
        .expect("Map is not an array");
    
    // Find the entry where the key ("k") has an "int" of 0.
    let price = map_entries.iter()
        .find(|entry| {
            entry.get("k")
                .and_then(|k| k.get("int"))
                .and_then(Value::as_u64)
                == Some(0)
        })
        .and_then(|entry| {
            entry.get("v")
                .and_then(|v| v.get("int"))
                .and_then(Value::as_u64)
        })
        .expect("Price not found");
    
    price
}


// {
//     "constructor": 0,
//     "fields": [
//       {
//         "constructor": 0,
//         "fields": [
//           {
//             "bytes": "0d28d4a2e4c1504b8bf77f7db89561ca6421eef8ee1ea5a99300e88e"
//           },
//           {
//             "bytes": ""
//           }
//         ]
//       },
//       {
//         "int": 123456
//       },
//       {
//         "constructor": 0,
//         "fields": [
//           {
//             "bytes": "769c4c6e9bc3ba5406b9b89fb7beb6819e638ff2e2de63f008d5bcff"
//           },
//           {
//             "bytes": "744e45574d"
//           },
//           {
//             "int": 1000000
//           }
//         ]
//       },
//       {
//         "bytes": "ca11ab1e00024d14abb60f7ea40867d4cf9a6f52f0f6cc0e815aa738f2d5aef0"
//       }
//     ]
//   }

pub fn queue_datum(vkey: &str, stake: &str, amount: u64, incentive: u64, pointer: &str, network_flag: bool) -> Vec<u8> {
    let newm_pid = if network_flag {PREPROD_PROFIT_POLICY_ID} else {MAINNET_PROFIT_POLICY_ID};
    let newm_tkn = if network_flag {PREPROD_PROFIT_TOKEN_NAME} else {MAINNET_PROFIT_TOKEN_NAME};
    // construct the plutus data
    let plutus_data: PlutusData = PlutusData::Constr(Constr {
        tag: 121,
        any_constructor: None,
        fields: MaybeIndefArray::Indef(vec![
            PlutusData::Constr(Constr {
                tag: 121,
                any_constructor: None,
                fields: MaybeIndefArray::Indef(vec![
                    PlutusData::BoundedBytes(BoundedBytes::from(Vec::from_hex(&vkey).expect("Public Key Hash Error"))),
                    PlutusData::BoundedBytes(BoundedBytes::from(Vec::from_hex(&stake).expect("Stake Key Error"))),
                ]),
            }),
            PlutusData::BigInt(BigInt::Int((amount as i64).into())),
            PlutusData::Constr(Constr {
                tag: 121,
                any_constructor: None,
                fields: MaybeIndefArray::Indef(vec![
                    PlutusData::BoundedBytes(BoundedBytes::from(Vec::from_hex(&newm_pid).expect("NEWM PID Error"))),
                    PlutusData::BoundedBytes(BoundedBytes::from(Vec::from_hex(&newm_tkn).expect("NEWM TKN Error"))),
                    PlutusData::BigInt(BigInt::Int((incentive as i64).into())),
                ]),
            }),
            PlutusData::BoundedBytes(BoundedBytes::from(Vec::from_hex(&pointer).expect("Stake Key Error"))),
        ]),
    });
    plutus_data.encode_fragment().unwrap()
}