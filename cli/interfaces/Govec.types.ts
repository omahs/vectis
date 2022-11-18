/**
 * This file was automatically generated by @cosmwasm/ts-codegen@0.22.0.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run the @cosmwasm/ts-codegen generate command to regenerate this file.
 */

export type Uint128 = string;
export type LogoInfo =
    | "embedded"
    | {
          url: string;
      };
export type Addr = string;
export interface InstantiateMsg {
    dao_tunnel?: string | null;
    factory?: string | null;
    initial_balances: Cw20Coin[];
    marketing?: MarketingInfoResponse | null;
    mint_cap?: Uint128 | null;
    name: string;
    staking_addr?: string | null;
    symbol: string;
}
export interface Cw20Coin {
    address: string;
    amount: Uint128;
    [k: string]: unknown;
}
export interface MarketingInfoResponse {
    description?: string | null;
    logo?: LogoInfo | null;
    marketing?: Addr | null;
    project?: string | null;
    [k: string]: unknown;
}
export type ExecuteMsg =
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
export type QueryMsg =
    | {
          balance: {
              address: string;
          };
      }
    | {
          joined: {
              address: string;
          };
      }
    | {
          token_info: {};
      }
    | {
          minters: {};
      }
    | {
          staking: {};
      }
    | {
          dao: {};
      }
    | {
          dao_tunnel: {};
      }
    | {
          factory: {};
      }
    | {
          all_accounts: {
              limit?: number | null;
              start_after?: string | null;
          };
      }
    | {
          marketing_info: {};
      }
    | {
          download_logo: {};
      }
    | {
          token_contract: {};
      };
export interface AllAccountsResponse {
    accounts: string[];
    [k: string]: unknown;
}
export interface BalanceResponse {
    balance: Uint128;
    [k: string]: unknown;
}
export interface DownloadLogoResponse {
    data: Binary;
    mime_type: string;
    [k: string]: unknown;
}
export type NullableBalanceResponse = BalanceResponse | null;
export interface MintResponse {
    cap?: Uint128 | null;
    minters?: string[] | null;
}
export type String = string;
export interface TokenInfoResponse {
    decimals: number;
    name: string;
    symbol: string;
    total_supply: Uint128;
    [k: string]: unknown;
}
