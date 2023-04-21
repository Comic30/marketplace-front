import { ContractAbstraction, ContractProvider } from "@taquito/taquito";

export interface IUser {
  username: string;
  description?: string;
  feedOrder?: 0 | 1;
  avatarLink?: string;
  twitter?: string;
  wallet?: string;
  artist?: boolean;
  friends?: string[];
}

export interface INft {
  tokenId?: number;
  name: string;
  description: string;
  imageLink: string;
  artist: string;
  artistObj?: IUser;
  owner: string;
  ownerObj?: IUser;
  price?: number;
  royalty?: number;
  lastSoldAmount?: number;
  lastSoldAt?: Date;
  mintedAt?: Date;
  curated?: boolean;
}

export interface ITezosState {
  activeAddress: string;
  setActiveAddress: { (_activeAddress: string): void };
  initializeContracts: { (): void };
  // interating with Tezos
  contractReady: boolean;
  nftContract: ContractAbstraction<ContractProvider> | null;
  marketPlaceContract: ContractAbstraction<ContractProvider> | null;
  lastTokenId: number;
  updateLastTokenId: { (): void };
  // nft mint function for artis
  nftMint: {
    (royalties: number, metadata: any): void;
  };
  buyForSale: {
    (tokenId: number, price: number): Promise<boolean>;
  };
  cancelForSale: {
    (tokenId: number): Promise<boolean>;
  };
  listForSale: {
    (
      tokenId: number,
      includingOperator: boolean,
      defaultAmount: number
    ): Promise<boolean>;
  };
}
