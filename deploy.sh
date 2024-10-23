cargo build --release --target wasm32-unknown-unknown --package h1_backend

candid-extractor target/wasm32-unknown-unknown/release/h1_backend.wasm > src/h1_backend/h1_backend.did
