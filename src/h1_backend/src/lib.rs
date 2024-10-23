use ic_cdk::api;
use ic_cdk_macros::{query, update};
use candid::{CandidType, Deserialize};
use ic_cdk::export_candid;

#[derive(CandidType, Deserialize)]
struct InputData {
    collateral: f64,
    borrowed: f64,
}

// A simple random number generator using a linear congruential generator (LCG)
struct LCG {
    seed: u64,
}

impl LCG {
    fn new(seed: u64) -> Self {
        LCG { seed }
    }

    fn next(&mut self) -> u64 {
        // LCG parameters (these are common parameters, you can adjust them)
        self.seed = (self.seed.wrapping_mul(6364136223846793005).wrapping_add(1)) % (1 << 48);
        self.seed
    }
}

#[update]
fn store_data(input: InputData) -> Result<u64, String> {
    // Store the input data in variables
    let stored_collateral = input.collateral;
    let stored_borrowed = input.borrowed;

    // Use LCG to generate a random value
    let mut rng = LCG::new(api::time());
    let random_value = rng.next(); // Generate the random value

    // Log the stored values and generated random value
    ic_cdk::print(&format!(
        "Stored collateral: {}, Stored borrowed: {}, Random value: {}",
        stored_collateral, stored_borrowed, random_value
    ));

    Ok(random_value)
}

export_candid!();