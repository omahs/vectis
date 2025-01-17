/**
 * This file was automatically generated by @cosmwasm/ts-codegen@0.22.0.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run the @cosmwasm/ts-codegen generate command to regenerate this file.
 */

export type CanonicalAddr = string;
export interface InstantiateMsg {
    chain_config: ChainConfig;
    dao_config: DaoConfig;
    init_ibc_transfer_mod?: IbcTransferChannels | null;
}
export interface ChainConfig {
    denom: string;
    remote_factory?: CanonicalAddr | null;
}
export interface DaoConfig {
    addr: string;
    connection_id: string;
    dao_tunnel_channel?: string | null;
    dao_tunnel_port_id: string;
}
export interface IbcTransferChannels {
    endpoints: [string, string][];
}
export type ExecuteMsg =
    | {
          dao_actions: {
              msg: RemoteTunnelPacketMsg;
          };
      }
    | {
          ibc_transfer: {
              receiver: Receiver;
          };
      };
export type RemoteTunnelPacketMsg =
    | {
          mint_govec: {
              wallet_addr: string;
          };
      }
    | {
          govec_actions: GovecExecuteMsg;
      }
    | {
          stake_actions: ExecuteMsg1;
      }
    | {
          proposal_actions: {
              msg: ExecuteMsg1;
              prop_module_addr: string;
          };
      };
export type GovecExecuteMsg =
    | {
          transfer: {
              amount: Uint128;
              recipient: string;
              relayed_from?: string | null;
          };
      }
    | {
          proposal_transfer: {
              deposit: Uint128;
              proposer: string;
          };
      }
    | {
          burn: {
              amount: Uint128;
          };
      }
    | {
          exit: {
              relayed_from?: string | null;
          };
      }
    | {
          send: {
              amount: Uint128;
              contract: string;
              msg: Binary;
              relayed_from?: string | null;
          };
      }
    | {
          mint: {
              new_wallet: string;
          };
      }
    | {
          update_mint_cap: {
              new_mint_cap?: Uint128 | null;
          };
      }
    | {
          update_mint_amount: {
              new_amount: Uint128;
          };
      }
    | {
          update_config_addr: {
              new_addr: UpdateAddrReq;
          };
      }
    | {
          update_marketing: {
              description?: string | null;
              marketing?: string | null;
              project?: string | null;
          };
      }
    | {
          upload_logo: Logo;
      };
export type Uint128 = string;
export type Binary = string;
export type UpdateAddrReq =
    | {
          dao: string;
      }
    | {
          dao_tunnel: string;
      }
    | {
          factory: string;
      }
    | {
          staking: string;
      }
    | {
          proposal: string;
      };
export type Logo =
    | {
          url: string;
      }
    | {
          embedded: EmbeddedLogo;
      };
export type EmbeddedLogo =
    | {
          svg: Binary;
      }
    | {
          png: Binary;
      };
export type ExecuteMsg1 =
    | {
          receive: Cw20ReceiveMsg;
      }
    | {
          unstake: {
              amount: Uint128;
              relayed_from?: string | null;
              [k: string]: unknown;
          };
      }
    | {
          claim: {
              relayed_from?: string | null;
              [k: string]: unknown;
          };
      }
    | {
          update_config: {
              duration?: Duration | null;
              manager?: string | null;
              owner?: string | null;
              [k: string]: unknown;
          };
      }
    | {
          add_hook: {
              addr: string;
              [k: string]: unknown;
          };
      }
    | {
          remove_hook: {
              addr: string;
              [k: string]: unknown;
          };
      };
export type Duration =
    | {
          height: number;
      }
    | {
          time: number;
      };
export interface Cw20ReceiveMsg {
    amount: Uint128;
    msg: Binary;
    sender: string;
    [k: string]: unknown;
}
export interface Receiver {
    addr: string;
    connection_id: string;
}
export type QueryMsg =
    | {
          dao_config: {};
      }
    | {
          chain_config: {};
      }
    | {
          ibc_transfer_channels: {
              limit?: number | null;
              start_after?: string | null;
          };
      }
    | {
          next_job_id: {};
      };
export type Addr = string;
export interface ChainConfigResponse {
    denom: string;
    remote_factory?: Addr | null;
}
export type Uint64 = number;
