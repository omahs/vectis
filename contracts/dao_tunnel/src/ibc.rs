use cosmwasm_std::{
    from_slice, CosmosMsg, Deps, DepsMut, Env, Ibc3ChannelOpenResponse, IbcBasicResponse,
    IbcChannelCloseMsg, IbcChannelConnectMsg, IbcChannelOpenMsg, IbcChannelOpenResponse,
    IbcPacketAckMsg, IbcPacketReceiveMsg, IbcPacketTimeoutMsg, IbcReceiveResponse, StdResult,
    SubMsg,
};
use vectis_wallet::{
    acknowledge_dispatch, check_order, check_version, DispatchResponse, IbcError, PacketMsg,
    StdAck, IBC_APP_VERSION, RECEIVE_DISPATCH_ID,
};

use crate::{
    error::ContractError,
    state::{IBC_CONTROLLERS, RESULTS},
};

#[cfg_attr(not(feature = "library"), entry_point)]
/// enforces ordering and versioing constraints
/// note: anyone can create a channel but only the DAO approved (connection_id, port) will be able
/// to reflect calls
pub fn ibc_channel_open(
    deps: DepsMut,
    _env: Env,
    msg: IbcChannelOpenMsg,
) -> Result<IbcChannelOpenResponse, ContractError> {
    let channel = msg.channel();

    check_order(&channel.order)?;
    // In ibcv3 we don't check the version string passed in the message
    // and only check the counterparty version.
    if let Some(counter_version) = msg.counterparty_version() {
        check_version(counter_version)?;
    }

    is_authorised_tunnel(
        deps.as_ref(),
        channel.connection_id.clone(),
        channel.endpoint.port_id.clone(),
    )?;

    // We return the version we need (which could be different than the counterparty version)
    Ok(Some(Ibc3ChannelOpenResponse {
        version: IBC_APP_VERSION.to_string(),
    }))
}

#[cfg_attr(not(feature = "library"), entry_point)]
pub fn ibc_packet_ack(
    _deps: DepsMut,
    _env: Env,
    msg: IbcPacketAckMsg,
) -> StdResult<IbcBasicResponse> {
    let original_packet: PacketMsg = from_slice(&msg.original_packet.data)?;
    match original_packet {
        PacketMsg::Dispatch { job_id, sender, .. } => {
            Ok(acknowledge_dispatch(job_id, sender, msg)?)
        }
        _ => Ok(IbcBasicResponse::new().add_attribute("action", "ibc_packet_ack")),
    }
}

#[cfg_attr(not(feature = "library"), entry_point)]
pub fn ibc_packet_receive(
    deps: DepsMut,
    _env: Env,
    msg: IbcPacketReceiveMsg,
) -> Result<IbcReceiveResponse, ContractError> {
    let packet = msg.packet;

    match from_slice(&packet.data)? {
        PacketMsg::Dispatch { msgs, .. } => receive_dispatch(deps, msgs),
        PacketMsg::MintGovec { wallet_addr } => receive_mint_govec(deps, wallet_addr),
        _ => Err(ContractError::IbcError(IbcError::InvalidPacket)),
    }
}

fn receive_mint_govec(
    _deps: DepsMut,
    _wallet_addr: String,
) -> Result<IbcReceiveResponse, ContractError> {
    // Call Govec for minting and ack
    Ok(IbcReceiveResponse::new().add_attribute("action", "receive_mint_govec"))
}

pub fn receive_dispatch(
    deps: DepsMut,
    msgs: Vec<CosmosMsg>,
) -> Result<IbcReceiveResponse, ContractError> {
    let response = DispatchResponse { results: vec![] };
    let acknowledgement = StdAck::success(&response);

    let sub_msgs: Vec<SubMsg> = msgs
        .iter()
        .map(|m| SubMsg::reply_on_success(m.clone(), RECEIVE_DISPATCH_ID))
        .collect();

    // reset the data field
    RESULTS.save(deps.storage, &vec![])?;

    Ok(IbcReceiveResponse::new()
        .set_ack(acknowledgement)
        .add_submessages(sub_msgs)
        .add_attribute("action", "vectis_tunnel_remote_receive_dispatch"))
}

#[cfg_attr(not(feature = "library"), entry_point)]
/// never should be called as we do not send packets
pub fn ibc_packet_timeout(
    _deps: DepsMut,
    _env: Env,
    _msg: IbcPacketTimeoutMsg,
) -> StdResult<IbcBasicResponse> {
    Ok(IbcBasicResponse::new().add_attribute("action", "ibc_packet_timeout"))
}

#[cfg_attr(not(feature = "library"), entry_point)]
pub fn ibc_channel_connect(
    _deps: DepsMut,
    _env: Env,
    msg: IbcChannelConnectMsg,
) -> StdResult<IbcBasicResponse> {
    Ok(IbcBasicResponse::new()
        .add_attribute("action", "ibc_connect")
        .add_attribute("channel_id", &msg.channel().endpoint.channel_id))
}

#[cfg_attr(not(feature = "library"), entry_point)]
/// We don't do anything when a channel is closed
pub fn ibc_channel_close(
    _deps: DepsMut,
    _env: Env,
    msg: IbcChannelCloseMsg,
) -> StdResult<IbcBasicResponse> {
    Ok(IbcBasicResponse::new()
        .add_attribute("action", "ibc_close")
        .add_attribute("channel_id", &msg.channel().endpoint.channel_id))
}

/// Makes sure that the incoming connection is from a smart contract that the DAO has approved
fn is_authorised_tunnel(
    deps: Deps,
    caller_connection_id: String,
    caller_port_id: String,
) -> Result<(), ContractError> {
    if IBC_CONTROLLERS
        .may_load(deps.storage, (caller_connection_id, caller_port_id))?
        .is_none()
    {
        return Err(ContractError::InvalidController {});
    }

    Ok(())
}