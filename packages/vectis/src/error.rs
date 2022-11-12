#![allow(clippy::derive_partial_eq_without_eq)]
use thiserror::Error;

/// Relay transaction related errors
#[derive(Error, Debug, PartialEq)]
pub enum RelayTxError {
    #[error("MismatchUserAddr")]
    IsNotUser {},
    #[error("NoncesAreNotEqual")]
    NoncesAreNotEqual {},
    #[error("SignatureVerificationError")]
    SignatureVerificationError {},
}

/// Contract migration related errors
#[derive(Error, Debug, PartialEq)]
pub enum MigrationMsgError {
    #[error("InvalidWalletAddr")]
    InvalidWalletAddr,
    #[error("MismatchProxyCodeId")]
    MismatchProxyCodeId,
    #[error("MismatchMultisigCodeId")]
    MismatchMultisigCodeId,
    #[error("InvalidWasmMsg")]
    InvalidWasmMsg,
    #[error("MultisigFeatureIsNotSet")]
    MultisigFeatureIsNotSet,
    #[error("IsNotAProxyMsg")]
    IsNotAProxyMsg,
    #[error("IsNotAMultisigMsg")]
    IsNotAMultisigMsg,
}

#[derive(Error, Debug, PartialEq)]
pub enum IbcError {
    #[error("Only supports unordered channels")]
    InvalidChannelOrder,
    #[error("Counterparty version must be '{0}'")]
    InvalidChannelVersion(&'static str),
    #[error("Connection id must be = '{0}'")]
    InvalidConnectionId(String),
    #[error("Port id must be = '{0}'")]
    InvalidPortId(String),
    #[error("Invalid source endpoint")]
    InvalidSrc,
    #[error("Invalid PacketMsg")]
    InvalidPacketMsg,
    #[error("Invalid PacketMsg.msg")]
    InvalidInnerMsg,
    #[error("Invalid Job id")]
    UnsupportedJobId,
    #[error("Invalid DAO action id")]
    InvalidDaoActionId,
}
