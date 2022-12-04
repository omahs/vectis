use cosmwasm_std::{coin, Addr, BankMsg, Binary, Coin, CosmosMsg, DepsMut};
use cw_multi_test::Executor;
use vectis_proxy::{msg::ExecuteMsg as ProxyExecuteMsg, msg::PluginParams, ContractError};
use vectis_wallet::WalletInfo;

// Need to update with code
//pub use croncat::{
//    contract::{
//        execute as croncat_execute, instantiate as croncat_instantitate,
//        migrate as croncat_migrate, query as croncat_query, reply as croncat_reply,
//    },
//    msg::ExecuteMsg as CroncatInstantiateMsg,
//    msg::ExecuteMsg as CroncatExecuteMsg,
//    msg::QueryMsg as CroncatQueryMsg,
//};

pub use cronkitty::contract::{
    CronKittyPlugin, ExecMsg as CronKittyExecMsg, InstantiateMsg as CronKittyInstMsg,
};

use crate::common::{common::*, dao_common::*};

#[test]
fn cronkitty_plugin_works() {
    let mut suite = DaoChainSuite::init().unwrap();
    let init_proxy_fund: Coin = coin(90, "ucosm");
    let wallet_address = suite
        .create_new_proxy(
            suite.controller.clone(),
            vec![init_proxy_fund.clone()],
            None,
            WALLET_FEE + init_proxy_fund.amount.u128(),
        )
        .unwrap();

    let cronkitty_code_id = suite.app.store_code(Box::new(CronKittyPlugin::new()));

    suite
        .app
        .execute_contract(
            suite.controller,
            wallet_address,
            &ProxyExecuteMsg::InstantiatePlugin::<Empty> {
                code_id: cronkitty_code_id,
                instantiate_msg: to_binary(&CronKittyInstMsg {
                    croncat_addr: "CronCat".into(),
                })
                .unwrap(),
                plugin_params: PluginParams { grantor: false },
                label: "cronkitty-plugin".into(),
            },
            &[],
        )
        .unwrap();
}
