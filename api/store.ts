import create from "zustand";
import { ITezosState } from "types/interface";
import { MARKETPLACE_CONTRACT_ADDRESS, NFT_CONTRACT_ADDRESS } from "config";
import { MichelsonMap, TezosToolkit } from "@taquito/taquito";
import { char2Bytes } from "@taquito/utils";

export const Tezos = new TezosToolkit("https://ghostnet.smartpy.io/");

export const useTezosCollectStore = create<ITezosState>((set, get) => ({
  activeAddress: "",
  setActiveAddress: (_activeAddress: string) => {
    set((state: any) => ({
      ...state,
      activeAddress: _activeAddress,
    }));
  },
  // Interacting with Tezs
  contractReady: false,
  nftContract: null,
  marketPlaceContract: null,
  lastTokenId: 0,
  initializeContracts: async () => {
    const [_nftContract, _marketPlaceContract] = await Promise.all([
      Tezos.wallet.at(NFT_CONTRACT_ADDRESS),
      Tezos.wallet.at(MARKETPLACE_CONTRACT_ADDRESS),
    ]);

    const _nftContractStorage: any = await _nftContract.storage();

    set((state: any) => ({
      ...state,
      lastTokenId: _nftContractStorage.last_token_id.toNumber(),
      contractReady: true,
      nftContract: _nftContract,
      marketPlaceContract: _marketPlaceContract,
    }));
  },

  updateLastTokenId: async () => {
    const _nftContractStorage: any = await get().nftContract?.storage();

    set((state: any) => ({
      ...state,
      lastTokenId: _nftContractStorage.last_token_id.toNumber(),
    }));
  },

  // mint function for artist
  nftMint: async (royalties: number, metadata: any) => {
    if (get().activeAddress === "") {
      alert("Need to connect wallet first!");
      return false;
    }
    if (get().contractReady === false) return false;
    const _nftContract = get().nftContract;
    const _activeAddress = get().activeAddress;
    const op = await _nftContract?.methods
      .mint([
        {
          royalty: royalties,
          to_: _activeAddress,
          metadata: MichelsonMap.fromLiteral({ "": char2Bytes(metadata?.url) }),
        },
      ])
      .send();

    await op?.confirmation(2);
  },

  buyForSale: async (tokenId: number, price: number) => {
    if (get().activeAddress === "") {
      alert("Need to connect wallet first!");
      return false;
    }
    if (get().contractReady === false) return false;

    const _marketPlaceContract = get().marketPlaceContract;
    const _txOp: any = await _marketPlaceContract?.methods
      .buy(tokenId)
      .send({ amount: price });
    return true;
  },
  cancelForSale: async (
    tokenId: number
    // durationId: number
  ) => {
    if (get().activeAddress === "") {
      alert("Need to connect wallet first!");
      return false;
    }
    if (get().contractReady === false) return false;

    const _marketPlaceContract = get().marketPlaceContract;
    const _txOp: any = await _marketPlaceContract?.methods
      .cancel_for_sale(tokenId)
      .send();
    await _txOp.confirmation(2);
    return true;
  },

  listForSale: async (
    tokenId: number,
    includingOperator: boolean,
    defaultAmount: number
  ) => {
    if (get().activeAddress === "") {
      alert("Need to connect wallet first!");
      return false;
    }
    if (get().contractReady === false) return false;

    const _marketPlaceContract = get().marketPlaceContract;
    const _nftContract = get().nftContract;
    await Tezos.wallet
      .batch()
      .withContractCall(
        // @ts-ignore
        _nftContract.methods.update_operators([
          {
            add_operator: {
              owner: get().activeAddress,
              operator: MARKETPLACE_CONTRACT_ADDRESS,
              token_id: tokenId,
            },
          },
        ])
      )
      .withContractCall(
        // @ts-ignore
        _marketPlaceContract?.methods.list_for_sale(
          defaultAmount * 10 ** 6,
          tokenId
        )
      )
      .send();

    return true;
  },
}));
