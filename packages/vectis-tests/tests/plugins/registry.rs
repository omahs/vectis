use cosmwasm_std::coins;

use crate::common::common::*;
use crate::common::plugins_common::*;

#[test]
fn cannot_register_plugins_without_fee() {
    let mut suite = PluginsSuite::init().unwrap();

    let err = suite
        .register_plugin_mocked(&suite.controller.clone(), &[])
        .unwrap_err();

    assert_eq!(err, PRegistryContractError::RegistryFeeRequired);
}

#[test]
fn no_reviewers_cannot_register_plugins() {
    let mut suite = PluginsSuite::init().unwrap();

    let err = suite
        .register_plugin_mocked(&suite.controller.clone(), &[coin(REGISTRY_FEE, "ucosm")])
        .unwrap_err();

    assert_eq!(err, PRegistryContractError::Unauthorized);
}

#[test]
fn no_reviewers_cannot_unregister_plugins() {
    let mut suite = PluginsSuite::init().unwrap();

    let err = suite
        .unregister_plugin(&suite.controller.clone(), 1)
        .unwrap_err();

    assert_eq!(err, PRegistryContractError::Unauthorized);
}

#[test]
fn no_reviewers_cannot_update_plugins() {
    let mut suite = PluginsSuite::init().unwrap();

    let err = suite
        .update_plugin(
            &suite.controller.clone(),
            1,
            None,
            None,
            None,
            None,
            None,
            None,
        )
        .unwrap_err();

    assert_eq!(err, PRegistryContractError::Unauthorized);
}

#[test]
fn no_dao_cannot_update_reviewers() {
    let mut suite = PluginsSuite::init().unwrap();

    let err = suite
        .update_reviewers(&suite.controller.clone(), vec![])
        .unwrap_err();

    assert_eq!(err, PRegistryContractError::Unauthorized);
}

#[test]
fn no_dao_cannot_update_registry_fee() {
    let mut suite = PluginsSuite::init().unwrap();

    let err = suite
        .update_registry_fee(&suite.controller.clone(), coin(100_000, "ucosm"))
        .unwrap_err();

    assert_eq!(err, PRegistryContractError::Unauthorized);
}

#[test]
fn no_dao_cannot_update_dao_addr() {
    let mut suite = PluginsSuite::init().unwrap();

    let err = suite
        .update_dao_addr(&suite.controller.clone(), "test")
        .unwrap_err();

    assert_eq!(err, PRegistryContractError::Unauthorized);
}

#[test]
fn reviewers_should_be_able_to_register_plugins() {
    let mut suite = PluginsSuite::init().unwrap();

    let dao_previous_balance = suite.query_balance(&suite.dao.clone()).unwrap();

    suite
        .register_plugin_mocked(&suite.deployer.clone(), &coins(REGISTRY_FEE, "ucosm"))
        .unwrap();

    let dao_current_balance = suite.query_balance(&suite.dao.clone()).unwrap();
    let resp = suite.query_plugins(None, None).unwrap();

    // check there is a plugin
    assert_eq!(resp.total, 1);

    // check the dao received the register fee;
    assert_eq!(
        dao_current_balance.amount,
        dao_previous_balance
            .amount
            .checked_add(Uint128::from(REGISTRY_FEE))
            .unwrap()
    )
}

#[test]
fn reviewers_should_be_able_to_unregister_plugins() {
    let mut suite = PluginsSuite::init().unwrap();

    suite
        .register_plugin_mocked(&suite.deployer.clone(), &coins(REGISTRY_FEE, "ucosm"))
        .unwrap();

    let resp = suite.query_plugins(None, None).unwrap();

    assert_eq!(resp.total, 1);

    suite.unregister_plugin(&suite.deployer.clone(), 1).unwrap();

    let resp = suite.query_plugins(None, None).unwrap();

    assert_eq!(resp.total, 0);
}

#[test]
fn reviewers_should_be_able_to_update_plugins() {
    let mut suite = PluginsSuite::init().unwrap();

    suite
        .register_plugin_mocked(&suite.deployer.clone(), &coins(REGISTRY_FEE, "ucosm"))
        .unwrap();

    let plugin = suite.query_plugin(1).unwrap().unwrap();

    let new_code_id = 2;
    let new_name = "super_cool_plugin";
    let new_creator = "creator";
    let new_ipfs_hash = "new_ipfs_hash";
    let new_checksum = "new_checksum";
    let new_version = "new_version";

    suite
        .update_plugin(
            &suite.deployer.clone(),
            plugin.id,
            Some(new_code_id),
            Some(new_name.to_string()),
            Some(new_creator.to_string()),
            Some(new_ipfs_hash.to_string()),
            Some(new_checksum.to_string()),
            Some(new_version.to_string()),
        )
        .unwrap();

    let plugin_after = suite.query_plugin(1).unwrap().unwrap();

    assert_ne!(plugin.code_id, new_code_id);
    assert_ne!(plugin.name, new_name);
    assert_ne!(plugin.ipfs_hash, new_ipfs_hash);
    assert_ne!(plugin.checksum, new_checksum);
    assert_ne!(plugin.version, new_version);

    assert_eq!(plugin_after.code_id, new_code_id);
    assert_eq!(plugin_after.name, new_name);
    assert_eq!(plugin_after.ipfs_hash, new_ipfs_hash);
    assert_eq!(plugin_after.checksum, new_checksum);
    assert_eq!(plugin_after.version, new_version);
}

#[test]
fn dao_should_be_able_to_update_reviewers() {
    let mut suite = PluginsSuite::init().unwrap();

    let new_reviewers = vec![suite.deployer.to_string(), suite.controller.to_string()];

    suite
        .update_reviewers(&suite.dao.clone(), new_reviewers.clone())
        .unwrap();

    let config = suite.query_config().unwrap();

    assert_eq!(config.reviewers, new_reviewers);
}

#[test]
fn dao_should_be_able_to_update_registry_fee() {
    let mut suite = PluginsSuite::init().unwrap();

    let new_registry_fee = coin(100_000, "ucosm");

    suite
        .update_registry_fee(&suite.dao.clone(), new_registry_fee.clone())
        .unwrap();

    let config = suite.query_config().unwrap();

    assert_eq!(config.registry_fee, new_registry_fee);
}

#[test]
fn dao_should_be_able_to_update_dao_addr() {
    let mut suite = PluginsSuite::init().unwrap();

    let new_dao_addr = "new_dao_addr";

    suite
        .update_dao_addr(&suite.dao.clone(), new_dao_addr)
        .unwrap();

    let config = suite.query_config().unwrap();

    assert_eq!(config.dao_addr, new_dao_addr);
}
