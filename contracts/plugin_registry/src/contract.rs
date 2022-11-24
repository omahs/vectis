#[cfg(not(feature = "library"))]
use cosmwasm_std::entry_point;
use cosmwasm_std::{to_binary, Binary, Deps, DepsMut, Env, MessageInfo, Response, StdResult};

use crate::{
    msg::{ExecuteMsg, InstantiateMsg, Plugin, QueryMsg, RegistryConfig},
    ContractError,
};

#[cfg_attr(not(feature = "library"), entry_point)]
pub fn instantiate(
    _deps: DepsMut,
    _env: Env,
    _info: MessageInfo,
    _msg: InstantiateMsg,
) -> Result<Response, ContractError> {
    unimplemented!()
    // Save instantiation configuration
}

#[cfg_attr(not(feature = "library"), entry_point)]
pub fn execute(
    deps: DepsMut,
    _env: Env,
    info: MessageInfo,
    msg: ExecuteMsg,
) -> Result<Response, ContractError> {
    match msg {
        ExecuteMsg::RegisterPlugin {
            name,
            version,
            ipfs_hash,
            chain_id,
            code_id,
            checksum,
            permissions,
        } => execute_register_plugin(
            deps,
            info,
            name,
            version,
            ipfs_hash,
            chain_id,
            code_id,
            checksum,
            permissions,
        ),
        ExecuteMsg::UnregisterPlugin { id } => execute_unregister_plugin(deps, info, id),
        ExecuteMsg::UpdatePlugin {
            id,
            name,
            version,
            ipfs_hash,
            code_id,
            checksum,
            permissions,
        } => execute_update_plugin(
            deps,
            info,
            id,
            name,
            version,
            ipfs_hash,
            code_id,
            checksum,
            permissions,
        ),
        ExecuteMsg::BuyPlugin { id } => execute_buy_plugin(deps, info, id),
        ExecuteMsg::UpdateConfig {
            reviewers,
            supported_denoms,
        } => execute_update_config(deps, info, reviewers, supported_denoms),
    }
}

pub fn execute_register_plugin(
    _deps: DepsMut,
    _info: MessageInfo,
    _name: String,
    _version: String,
    _ipfs_hash: String,
    _chain_id: String,
    _code_id: u64,
    _checksum: String,
    _permissions: Vec<String>,
) -> Result<Response, ContractError> {
    unimplemented!()
    // check is executed by one of the reviewers
    // store plugin information in PLUGINS Map<u64(id), Plugin>
}

pub fn execute_unregister_plugin(
    _deps: DepsMut,
    _info: MessageInfo,
    _id: u64,
) -> Result<Response, ContractError> {
    // check is executed by one of the reviewers
    // remove plugin information from PLUGINS Map<u64(id), Plugin>
    unimplemented!()
}

pub fn execute_update_plugin(
    _deps: DepsMut,
    _info: MessageInfo,
    _id: u64,
    _name: Option<String>,
    _version: String,
    _ipfs_hash: Option<String>,
    _code_id: Option<u64>,
    _checksum: Option<String>,
    _permissions: Option<Vec<String>>,
) -> Result<Response, ContractError> {
    // check is executed by one of the reviewers
    // enforce a new version using semver.
    // update plugin information in PLUGINS Map<u64(id), Plugin>
    unimplemented!()
}

pub fn execute_buy_plugin(
    _deps: DepsMut,
    _info: MessageInfo,
    _id: u64,
) -> Result<Response, ContractError> {
    // check that plugin exists
    // check that user sent enough funds to buy the plugin
    // include buyer into PURCHASES_HISTORY
    unimplemented!()
}

pub fn execute_update_config(
    _deps: DepsMut,
    _info: MessageInfo,
    _reviewers: Option<Vec<String>>,
    _supported_denoms: Option<Vec<String>>,
) -> Result<Response, ContractError> {
    // check admin
    // update config
    unimplemented!()
}

#[cfg_attr(not(feature = "library"), entry_point)]
pub fn query(deps: Deps, _env: Env, msg: QueryMsg) -> StdResult<Binary> {
    match msg {
        QueryMsg::GetConfig {} => to_binary(&query_config(deps)?),
        QueryMsg::GetPlugins { limit, start_after } => {
            to_binary(&query_plugins(deps, limit, start_after)?)
        }
        QueryMsg::GetPluginsByAddr {
            addr,
            limit,
            start_after,
        } => to_binary(&query_plugins_by_addr(deps, addr, limit, start_after)?),
        QueryMsg::GetPluginById { id } => to_binary(&query_plugin_by_id(deps, id)?),
    }
}

pub fn query_config(_deps: Deps) -> StdResult<RegistryConfig> {
    unimplemented!()
    // Return configuration
}

pub fn query_plugins(
    _deps: Deps,
    _limit: Option<u32>,
    _start_after: Option<u32>,
) -> StdResult<Vec<Plugin>> {
    unimplemented!()
    // Return all plugins
}

pub fn query_plugins_by_addr(
    _deps: Deps,
    _addr: String,
    _limit: Option<u32>,
    _start_after: Option<u32>,
) -> StdResult<Vec<Plugin>> {
    unimplemented!()
    // Return all plugins owned by addr
}

pub fn query_plugin_by_id(_deps: Deps, _id: u64) -> StdResult<Plugin> {
    unimplemented!()
    // Return plugin with id
}
