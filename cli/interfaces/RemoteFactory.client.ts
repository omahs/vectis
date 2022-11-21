/**
 * This file was automatically generated by @cosmwasm/ts-codegen@0.22.0.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run the @cosmwasm/ts-codegen generate command to regenerate this file.
 */

import { CosmWasmClient, SigningCosmWasmClient, ExecuteResult } from "@cosmjs/cosmwasm-stargate";
import { StdFee } from "@cosmjs/amino";
import {
    Uint128,
    InstantiateMsg,
    Coin,
    ExecuteMsg,
    ProxyMigrationTxMsg,
    Binary,
    WalletAddr,
    CanonicalAddr,
    Addr,
    CodeIdType,
    UpdateFeeReq,
    CreateWalletMsg,
    Guardians,
    MultiSig,
    RelayTransaction,
    QueryMsg,
    Expiration,
    Timestamp,
    Uint64,
    FeesResponse,
    ArrayOfAddr,
    UnclaimedWalletList,
} from "./RemoteFactory.types";
export interface RemoteFactoryReadOnlyInterface {
    contractAddress: string;
    unclaimedGovecWallets: ({
        limit,
        startAfter,
    }: {
        limit?: number;
        startAfter?: string;
    }) => Promise<UnclaimedWalletList>;
    pendingGovecClaimWallets: ({ limit, startAfter }: { limit?: number; startAfter?: string }) => Promise<ArrayOfAddr>;
    claimExpiration: ({ wallet }: { wallet: string }) => Promise<Expiration>;
    totalCreated: () => Promise<Uint64>;
    codeId: ({ ty }: { ty: CodeIdType }) => Promise<Uint64>;
    fees: () => Promise<FeesResponse>;
    govecAddr: () => Promise<Addr>;
    daoAddr: () => Promise<Addr>;
}
export class RemoteFactoryQueryClient implements RemoteFactoryReadOnlyInterface {
    client: CosmWasmClient;
    contractAddress: string;

    constructor(client: CosmWasmClient, contractAddress: string) {
        this.client = client;
        this.contractAddress = contractAddress;
        this.unclaimedGovecWallets = this.unclaimedGovecWallets.bind(this);
        this.pendingGovecClaimWallets = this.pendingGovecClaimWallets.bind(this);
        this.claimExpiration = this.claimExpiration.bind(this);
        this.totalCreated = this.totalCreated.bind(this);
        this.codeId = this.codeId.bind(this);
        this.fees = this.fees.bind(this);
        this.govecAddr = this.govecAddr.bind(this);
        this.daoAddr = this.daoAddr.bind(this);
    }

    unclaimedGovecWallets = async ({
        limit,
        startAfter,
    }: {
        limit?: number;
        startAfter?: string;
    }): Promise<UnclaimedWalletList> => {
        return this.client.queryContractSmart(this.contractAddress, {
            unclaimed_govec_wallets: {
                limit,
                start_after: startAfter,
            },
        });
    };
    pendingGovecClaimWallets = async ({
        limit,
        startAfter,
    }: {
        limit?: number;
        startAfter?: string;
    }): Promise<ArrayOfAddr> => {
        return this.client.queryContractSmart(this.contractAddress, {
            pending_govec_claim_wallets: {
                limit,
                start_after: startAfter,
            },
        });
    };
    claimExpiration = async ({ wallet }: { wallet: string }): Promise<Expiration> => {
        return this.client.queryContractSmart(this.contractAddress, {
            claim_expiration: {
                wallet,
            },
        });
    };
    totalCreated = async (): Promise<Uint64> => {
        return this.client.queryContractSmart(this.contractAddress, {
            total_created: {},
        });
    };
    codeId = async ({ ty }: { ty: CodeIdType }): Promise<Uint64> => {
        return this.client.queryContractSmart(this.contractAddress, {
            code_id: {
                ty,
            },
        });
    };
    fees = async (): Promise<FeesResponse> => {
        return this.client.queryContractSmart(this.contractAddress, {
            fees: {},
        });
    };
    govecAddr = async (): Promise<Addr> => {
        return this.client.queryContractSmart(this.contractAddress, {
            govec_addr: {},
        });
    };
    daoAddr = async (): Promise<Addr> => {
        return this.client.queryContractSmart(this.contractAddress, {
            dao_addr: {},
        });
    };
}
export interface RemoteFactoryInterface extends RemoteFactoryReadOnlyInterface {
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
    updateConfigFee: (
        {
            newFee,
        }: {
            newFee: UpdateFeeReq;
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
    updateDao: (
        {
            addr,
        }: {
            addr: string;
        },
        fee?: number | StdFee | "auto",
        memo?: string,
        funds?: Coin[]
    ) => Promise<ExecuteResult>;
    claimGovec: (fee?: number | StdFee | "auto", memo?: string, funds?: Coin[]) => Promise<ExecuteResult>;
    govecMinted: (
        {
            success,
            walletAddr,
        }: {
            success: boolean;
            walletAddr: string;
        },
        fee?: number | StdFee | "auto",
        memo?: string,
        funds?: Coin[]
    ) => Promise<ExecuteResult>;
    purgeExpiredClaims: (
        {
            limit,
            startAfter,
        }: {
            limit?: number;
            startAfter?: string;
        },
        fee?: number | StdFee | "auto",
        memo?: string,
        funds?: Coin[]
    ) => Promise<ExecuteResult>;
}
export class RemoteFactoryClient extends RemoteFactoryQueryClient implements RemoteFactoryInterface {
    override client: SigningCosmWasmClient;
    sender: string;
    override contractAddress: string;

    constructor(client: SigningCosmWasmClient, sender: string, contractAddress: string) {
        super(client, contractAddress);
        this.client = client;
        this.sender = sender;
        this.contractAddress = contractAddress;
        this.createWallet = this.createWallet.bind(this);
        this.migrateWallet = this.migrateWallet.bind(this);
        this.updateCodeId = this.updateCodeId.bind(this);
        this.updateConfigFee = this.updateConfigFee.bind(this);
        this.updateGovecAddr = this.updateGovecAddr.bind(this);
        this.updateDao = this.updateDao.bind(this);
        this.claimGovec = this.claimGovec.bind(this);
        this.govecMinted = this.govecMinted.bind(this);
        this.purgeExpiredClaims = this.purgeExpiredClaims.bind(this);
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
    updateConfigFee = async (
        {
            newFee,
        }: {
            newFee: UpdateFeeReq;
        },
        fee: number | StdFee | "auto" = "auto",
        memo?: string,
        funds?: Coin[]
    ): Promise<ExecuteResult> => {
        return await this.client.execute(
            this.sender,
            this.contractAddress,
            {
                update_config_fee: {
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
    updateDao = async (
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
                update_dao: {
                    addr,
                },
            },
            fee,
            memo,
            funds
        );
    };
    claimGovec = async (
        fee: number | StdFee | "auto" = "auto",
        memo?: string,
        funds?: Coin[]
    ): Promise<ExecuteResult> => {
        return await this.client.execute(
            this.sender,
            this.contractAddress,
            {
                claim_govec: {},
            },
            fee,
            memo,
            funds
        );
    };
    govecMinted = async (
        {
            success,
            walletAddr,
        }: {
            success: boolean;
            walletAddr: string;
        },
        fee: number | StdFee | "auto" = "auto",
        memo?: string,
        funds?: Coin[]
    ): Promise<ExecuteResult> => {
        return await this.client.execute(
            this.sender,
            this.contractAddress,
            {
                govec_minted: {
                    success,
                    wallet_addr: walletAddr,
                },
            },
            fee,
            memo,
            funds
        );
    };
    purgeExpiredClaims = async (
        {
            limit,
            startAfter,
        }: {
            limit?: number;
            startAfter?: string;
        },
        fee: number | StdFee | "auto" = "auto",
        memo?: string,
        funds?: Coin[]
    ): Promise<ExecuteResult> => {
        return await this.client.execute(
            this.sender,
            this.contractAddress,
            {
                purge_expired_claims: {
                    limit,
                    start_after: startAfter,
                },
            },
            fee,
            memo,
            funds
        );
    };
}