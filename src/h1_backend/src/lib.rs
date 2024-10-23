use ic_cdk::api;
use ic_cdk_macros::{query, update};
use candid::{CandidType, Deserialize};
use ic_cdk::api::management_canister::main::raw_rand;
use ic_cdk::export_candid;


#[derive(CandidType, Deserialize)]
struct InputData {
    collateral: f64,
    borrowed: f64,
}

#[update]
async fn store_data(input: InputData) -> Result<u64, String> {
    let stored_collateral = input.collateral;
    let stored_borrowed = input.borrowed;

    let (random_bytes,) = raw_rand().await.map_err(|err| format!("Failed to generate random number: {:?}", err))?;

    let random_value = if random_bytes.len() >= 8 {
        u64::from_le_bytes(random_bytes[..8].try_into().unwrap())
    } else {
        return Err("Not enough random bytes".to_string());
    };

    ic_cdk::print(&format!(
        "Stored collateral: {}, Stored borrowed: {}, Random value: {}",
        stored_collateral, stored_borrowed, random_value
    ));

    Ok(random_value)
}

export_candid!();