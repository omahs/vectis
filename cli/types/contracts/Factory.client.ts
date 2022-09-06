/**
 * This file was automatically generated by @cosmwasm/ts-codegen@0.10.0.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run the @cosmwasm/ts-codegen generate command to regenerate this file.
 */

import { CosmWasmClient, SigningCosmWasmClient, ExecuteResult } from "@cosmjs/cosmwasm-stargate";
import { StdFee } from "@cosmjs/amino";
import {
    AdminAddrResponse,
    CodeIdResponse,
    CodeIdType,
    Uint128,
    CreateWalletMsg,
    Guardians,
    MultiSig,
    Coin,
    Cw20Coin,
    ExecuteMsg,
    Addr,
    ProxyMigrationTxMsg,
    Binary,
    WalletAddr,
    CanonicalAddr,
    RelayTransaction,
    FeeResponse,
    GovecAddrResponse,
    InstantiateMsg,
    QueryMsg,
    WalletQueryPrefix,
    Duration,
    StakingOptions,
    WalletInfo,
    ContractVersion,
    WalletsOfResponse,
    WalletsResponse,
} from "./Factory.types";
export interface FactoryReadOnlyInterface {
    contractAddress: string;
    wallets: ({ limit, startAfter }: { limit?: number; startAfter?: WalletQueryPrefix }) => Promise<WalletsResponse>;
    walletsOf: ({
        limit,
        startAfter,
        user,
    }: {
        limit?: number;
        startAfter?: string;
        user: string;
    }) => Promise<WalletsOfResponse>;
    codeId: ({ ty }: { ty: CodeIdType }) => Promise<CodeIdResponse>;
    fee: () => Promise<FeeResponse>;
    govecAddr: () => Promise<GovecAddrResponse>;
    adminAddr: () => Promise<AdminAddrResponse>;
}
export class FactoryQueryClient implements FactoryReadOnlyInterface {
    client: CosmWasmClient;
    contractAddress: string;

    constructor(client: CosmWasmClient, contractAddress: string) {
        this.client = client;
        this.contractAddress = contractAddress;
        this.wallets = this.wallets.bind(this);
        this.walletsOf = this.walletsOf.bind(this);
        this.codeId = this.codeId.bind(this);
        this.fee = this.fee.bind(this);
        this.govecAddr = this.govecAddr.bind(this);
        this.adminAddr = this.adminAddr.bind(this);
    }

    wallets = async ({
        limit,
        startAfter,
    }: {
        limit?: number;
        startAfter?: WalletQueryPrefix;
    }): Promise<WalletsResponse> => {
        return this.client.queryContractSmart(this.contractAddress, {
            wallets: {
                limit,
                start_after: startAfter,
            },
        });
    };
    walletsOf = async ({
        limit,
        startAfter,
        user,
    }: {
        limit?: number;
        startAfter?: string;
        user: string;
    }): Promise<WalletsOfResponse> => {
        return this.client.queryContractSmart(this.contractAddress, {
            wallets_of: {
                limit,
                start_after: startAfter,
                user,
            },
        });
    };
    codeId = async ({ ty }: { ty: CodeIdType }): Promise<CodeIdResponse> => {
        return this.client.queryContractSmart(this.contractAddress, {
            code_id: {
                ty,
            },
        });
    };
    fee = async (): Promise<FeeResponse> => {
        return this.client.queryContractSmart(this.contractAddress, {
            fee: {},
        });
    };
    govecAddr = async (): Promise<GovecAddrResponse> => {
        return this.client.queryContractSmart(this.contractAddress, {
            govec_addr: {},
        });
    };
    adminAddr = async (): Promise<AdminAddrResponse> => {
        return this.client.queryContractSmart(this.contractAddress, {
            admin_addr: {},
        });
    };
}
export interface FactoryInterface extends FactoryReadOnlyInterface {
    contractAddress: string;
    sender: string;
    createWallet: (
        {
            createWalletMsg,
        }: {
            createWalletMsg: CreateWalletMsg;
        },
        fee?: number | StdFee | "auto",
        memo?: string,
        funds?: Coin[]
    ) => Promise<ExecuteResult>;
    updateProxyUser: (
        {
            newUser,
            oldUser,
        }: {
            newUser: Addr;
            oldUser: Addr;
        },
        fee?: number | StdFee | "auto",
        memo?: string,
        funds?: Coin[]
    ) => Promise<ExecuteResult>;
    migrateWallet: (
        {
            migrationMsg,
            walletAddress,
        }: {
            migrationMsg: ProxyMigrationTxMsg;
            walletAddress: WalletAddr;
        },
        fee?: number | StdFee | "auto",
        memo?: string,
        funds?: Coin[]
    ) => Promise<ExecuteResult>;
    updateCodeId: (
        {
            newCodeId,
            ty,
        }: {
            newCodeId: number;
            ty: CodeIdType;
        },
        fee?: number | StdFee | "auto",
        memo?: string,
        funds?: Coin[]
    ) => Promise<ExecuteResult>;
    updateWalletFee: (
        {
            newFee,
        }: {
            newFee: Coin;
        },
        fee?: number | StdFee | "auto",
        memo?: string,
        funds?: Coin[]
    ) => Promise<ExecuteResult>;
    updateGovecAddr: (
        {
            addr,
        }: {
            addr: string;
        },
        fee?: number | StdFee | "auto",
        memo?: string,
        funds?: Coin[]
    ) => Promise<ExecuteResult>;
    updateAdmin: (
        {
            addr,
        }: {
            addr: string;
        },
        fee?: number | StdFee | "auto",
        memo?: string,
        funds?: Coin[]
    ) => Promise<ExecuteResult>;
}
export class FactoryClient extends FactoryQueryClient implements FactoryInterface {
    client: SigningCosmWasmClient;
    sender: string;
    contractAddress: string;

    constructor(client: SigningCosmWasmClient, sender: string, contractAddress: string) {
        super(client, contractAddress);
        this.client = client;
        this.sender = sender;
        this.contractAddress = contractAddress;
        this.createWallet = this.createWallet.bind(this);
        this.updateProxyUser = this.updateProxyUser.bind(this);
        this.migrateWallet = this.migrateWallet.bind(this);
        this.updateCodeId = this.updateCodeId.bind(this);
        this.updateWalletFee = this.updateWalletFee.bind(this);
        this.updateGovecAddr = this.updateGovecAddr.bind(this);
        this.updateAdmin = this.updateAdmin.bind(this);
    }

    createWallet = async (
        {
            createWalletMsg,
        }: {
            createWalletMsg: CreateWalletMsg;
        },
        fee: number | StdFee | "auto" = "auto",
        memo?: string,
        funds?: Coin[]
    ): Promise<ExecuteResult> => {
        return await this.client.execute(
            this.sender,
            this.contractAddress,
            {
                create_wallet: {
                    create_wallet_msg: createWalletMsg,
                },
            },
            fee,
            memo,
            funds
        );
    };
    updateProxyUser = async (
        {
            newUser,
            oldUser,
        }: {
            newUser: Addr;
            oldUser: Addr;
        },
        fee: number | StdFee | "auto" = "auto",
        memo?: string,
        funds?: Coin[]
    ): Promise<ExecuteResult> => {
        return await this.client.execute(
            this.sender,
            this.contractAddress,
            {
                update_proxy_user: {
                    new_user: newUser,
                    old_user: oldUser,
                },
            },
            fee,
            memo,
            funds
        );
    };
    migrateWallet = async (
        {
            migrationMsg,
            walletAddress,
        }: {
            migrationMsg: ProxyMigrationTxMsg;
            walletAddress: WalletAddr;
        },
        fee: number | StdFee | "auto" = "auto",
        memo?: string,
        funds?: Coin[]
    ): Promise<ExecuteResult> => {
        return await this.client.execute(
            this.sender,
            this.contractAddress,
            {
                migrate_wallet: {
                    migration_msg: migrationMsg,
                    wallet_address: walletAddress,
                },
            },
            fee,
            memo,
            funds
        );
    };
    updateCodeId = async (
        {
            newCodeId,
            ty,
        }: {
            newCodeId: number;
            ty: CodeIdType;
        },
        fee: number | StdFee | "auto" = "auto",
        memo?: string,
        funds?: Coin[]
    ): Promise<ExecuteResult> => {
        return await this.client.execute(
            this.sender,
            this.contractAddress,
            {
                update_code_id: {
                    new_code_id: newCodeId,
                    ty,
                },
            },
            fee,
            memo,
            funds
        );
    };
    updateWalletFee = async (
        {
            newFee,
        }: {
            newFee: Coin;
        },
        fee: number | StdFee | "auto" = "auto",
        memo?: string,
        funds?: Coin[]
    ): Promise<ExecuteResult> => {
        return await this.client.execute(
            this.sender,
            this.contractAddress,
            {
                update_wallet_fee: {
                    new_fee: newFee,
                },
            },
            fee,
            memo,
            funds
        );
    };
    updateGovecAddr = async (
        {
            addr,
        }: {
            addr: string;
        },
        fee: number | StdFee | "auto" = "auto",
        memo?: string,
        funds?: Coin[]
    ): Promise<ExecuteResult> => {
        return await this.client.execute(
            this.sender,
            this.contractAddress,
            {
                update_govec_addr: {
                    addr,
                },
            },
            fee,
            memo,
            funds
        );
    };
    updateAdmin = async (
        {
            addr,
        }: {
            addr: string;
        },
        fee: number | StdFee | "auto" = "auto",
        memo?: string,
        funds?: Coin[]
    ): Promise<ExecuteResult> => {
        return await this.client.execute(
            this.sender,
            this.contractAddress,
            {
                update_admin: {
                    addr,
                },
            },
            fee,
            memo,
            funds
        );
    };
}
