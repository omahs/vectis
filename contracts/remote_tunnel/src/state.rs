

use cosmwasm_schema::cw_serde;
use cosmwasm_std::{CanonicalAddr};
use cw_storage_plus::{Item};

#[cw_serde]
pub struct Config {
    pub port_id: String,
    pub connection_id: String,
}

pub const CONFIG: Item<Config> = Item::new("config");
pub const FACTORY: Item<CanonicalAddr> = Item::new("factory");
pub const CHANNEL: Item<String> = Item::new("channel");