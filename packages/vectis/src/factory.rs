use crate::guardians::Guardians;
use crate::wallet::{RelayTransaction, WalletAddr};
use crate::MigrationMsgError;
use cosmwasm_schema::{cw_serde, QueryResponses};
use cosmwasm_std::{Addr, Binary, Coin};
use cw_utils::Expiration;

/// Declares that a fixed weight of Yes votes is needed to pass.
/// See `ThresholdResponse.AbsoluteCount` in the cw3 spec for details.
/// Only Fixed multisig is supported in this version
pub type ThresholdAbsoluteCount = u64;

#[cw_serde]
pub struct CreateWalletMsg {
    pub user_addr: String,
    pub guardians: Guardians,
    /// A List of keys can act as relayer for
    pub relayers: Vec<String>,
    pub proxy_initial_funds: Vec<Coin>,
    pub label: String,
}

#[cw_serde]
#[derive(Default)]
pub struct UnclaimedWalletList {
    pub wallets: Vec<(Addr, Expiration)>,
}

#[cw_serde]
#[derive(Default)]
pub struct MultiSig {
    // Declares that a fixed weight of Yes votes is needed to pass.
    /// Only Fixed multisig is supported in this version
    pub threshold_absolute_count: ThresholdAbsoluteCount,
    // intial funds for multisig contract
    pub multisig_initial_funds: Vec<Coin>,
}

#[cw_serde]
pub enum CodeIdType {
    Proxy,
    Multisig,
}

#[cw_serde]
pub enum ProxyMigrationTxMsg {
    RelayTx(RelayTransaction),
    DirectMigrationMsg(Binary),
}

#[cw_serde]
pub struct ProxyMigrateMsg {
    pub new_code_id: u64,
}

impl ProxyMigrateMsg {
    /// Ensures code id of multisig contract is equal to current factory multisig code id,
    pub fn ensure_is_supported_proxy_code_id(
        &self,
        factory_proxy_code_id: u64,
    ) -> Result<(), MigrationMsgError> {
        if factory_proxy_code_id != self.new_code_id {
            return Err(MigrationMsgError::MismatchProxyCodeId);
        }
        Ok(())
    }
}

#[cw_serde]
pub struct WalletFactoryInstantiateMsg {
    /// Smart contract wallet contract code id
    pub proxy_code_id: u64,
    /// Wallet guardians multisig contract code id
    /// Currently v0.13.0 cw-plus cw3-fixed-multisig
    pub proxy_multisig_code_id: u64,
    /// Chain address prefix
    pub addr_prefix: String,
    /// Fee in native token to be sent to Admin (DAO)
    pub wallet_fee: Coin,
    /// Governance Token, Govec, address
    pub govec_minter: Option<String>,
}

#[cw_serde]
pub enum WalletFactoryExecuteMsg {
    CreateWallet {
        create_wallet_msg: CreateWalletMsg,
    },
    MigrateWallet {
        wallet_address: WalletAddr,
        migration_msg: ProxyMigrationTxMsg,
    },
    UpdateCodeId {
        ty: CodeIdType,
        new_code_id: u64,
    },
    UpdateWalletFee {
        new_fee: Coin,
    },
    UpdateGovecAddr {
        addr: String,
    },
    UpdateDao {
        addr: String,
    },
    ClaimGovec {},
    GovecMinted {
        success: bool,
        wallet_addr: String,
    },
    PurgeExpiredClaims {
        // Address string to start after
        start_after: Option<String>,
        // Max is 30 and default is 10
        limit: Option<u32>,
    },
}

#[cw_serde]
#[derive(QueryResponses)]
pub enum WalletFactoryQueryMsg {
    /// Shows proxy wallet address of unclaimed wallets which has not been removed due to
    /// expiration
    /// Returns UnclaimedWalletList
    #[returns(UnclaimedWalletList)]
    UnclaimedGovecWallets {
        // Address string to start after
        start_after: Option<String>,
        // Max is 100 and default is 50
        limit: Option<u32>,
    },
    #[returns(Vec<Addr>)]
    PendingGovecClaimWallets {
        // Address string to start after
        start_after: Option<String>,
        // Max is 100 and default is 50
        limit: Option<u32>,
    },
    /// Returns the expiration date for claiming Govec if not yet claimed or expired
    #[returns(Expiration)]
    ClaimExpiration { wallet: String },
    /// Total wallets created in this contract
    #[returns(u64)]
    TotalCreated {},
    #[returns(u64)]
    CodeId { ty: CodeIdType },
    /// Returns the fee required to create a wallet
    /// Fee goes to the DAO
    #[returns(Coin)]
    Fee {},
    /// Returns the address of the Govec Voting Tokens Contract
    #[returns(Addr)]
    GovecAddr {},
    /// Returns the address of the DAO which holds the admin role of this contract
    #[returns(Addr)]
    DaoAddr {},
}
