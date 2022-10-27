import { Code } from "@cosmjs/cosmwasm-stargate";

export interface VectisDaoContractsAddrs {
    remoteTunnelAddr: string;
    remoteFactoryAddr: string;
    daoTunnelAddr: string;
    daoAddr: string;
    govecAddr: string;
    factoryAddr: string;
    stakingAddr: string;
    proposalAddr: string;
    voteAddr: string;
}

export interface DaoDaoContracts {
    dao: Code;
    staking: Code;
    vote: Code;
    proposalSingle: Code;
}
