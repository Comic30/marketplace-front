import create from "zustand";
import { MARKETPLACE_CONTRACT_ADDRESS, NFT_CONTRACT_ADDRESS } from "config";
import { MichelsonMap, TezosToolkit } from "@taquito/taquito";
import { char2Bytes } from "@taquito/utils";
import { NFTStorage } from "nft.storage";
import axios from "axios";
export const Tezos = new TezosToolkit("https://ghostnet.smartpy.io/");

export const nftStorage = new NFTStorage({
  token: process.env.TOKEN_STORAGE_API_KEY,
});

export const hex2buf = (hex) => {
  return new Uint8Array(hex.match(/[\da-f]{2}/gi).map((h) => parseInt(h, 16)));
};

export function bytes2Char(hex) {
  return Buffer.from(hex2buf(hex)).toString("utf8");
}

export const useTezosCollectStore = create((set, get) => ({
  activeAddress: "",
  setActiveAddress: (_activeAddress) => {
    set((state) => ({
      ...state,
      activeAddress: _activeAddress,
    }));
  },
  // Interacting with Tezos
  contractReady: false,
  nftContract: null,
  marketPlaceContract: null,
  lastTokenId: 0,
  tokenData: null,
  initializeContracts: async () => {
    const [_nftContract, _marketPlaceContract] = await Promise.all([
      Tezos.wallet.at(NFT_CONTRACT_ADDRESS),
      Tezos.wallet.at(MARKETPLACE_CONTRACT_ADDRESS),
    ]);

    const _marketPlaceContractStorage = await _marketPlaceContract.storage();
    console.log("_marketPlaceContractStorage", _marketPlaceContractStorage);

    set((state) => ({
      ...state,
      contractReady: true,
      lastTokenId: _marketPlaceContractStorage.last_token_id.toNumber(),
      nftContract: _nftContract,
      marketPlaceContract: _marketPlaceContract,
    }));
  },

  updateLastTokenId: async () => {
    const _marketPlaceContractStorage =
      await get()._marketPlaceContract?.storage();

    set((state) => ({
      ...state,
      lastTokenId: _marketPlaceContractStorage.last_token_id.toNumber(),
    }));
  },

  // mint function for artist
  nftMint: async ({ price, metadata }) => {
    if (get().activeAddress === "") {
      alert("Need to connect wallet first!");
      return false;
    }
    if (get().contractReady === false) return false;
    const _nftContract = get().nftContract;
    const _activeAddress = get().activeAddress;
    let bytes = "";
    console.log("metadata", metadata);
    for (var i = 0; i < metadata.length; i++) {
      bytes += metadata.charCodeAt(i).toString(16).slice(-4);
    }
    const op = await _nftContract?.methods.mint(price, bytes).send();

    await op?.confirmation(2);
  },

  fetchNft: async () => {
    const response = await axios.get(
      `https://api.ghostnet.tzkt.io/v1/contracts/${NFT_CONTRACT_ADDRESS}/bigmaps/data/keys`
    );
    const response1 = await axios.get(
      `https://api.ghostnet.tzkt.io/v1/contracts/${MARKETPLACE_CONTRACT_ADDRESS}/bigmaps/token_metadata/keys`
    );
    const d1 = response.data;
    const d2 = response1.data;

    console.log("d1", d1);
    console.log("d2", d2);
    let tokenData = [];
    for (let i = 0; i < d1.length; i++) {
      const s = bytes2Char(d2[i].value.token_info[""]).split("//").at(-1);

      const res = await axios.get("https://ipfs.io/ipfs/" + s);

      const l1 = d1[i].value;
      const l2 = res.data;
      tokenData[i] = {
        ...l1,
        ...l2,
        token_id: d2[i].value.token_id,
      };
    }
    set((state) => ({
      ...state,
      tokenData: tokenData,
    }));
  },

  buyForSale: async (tokenId, price) => {
    if (get().activeAddress === "") {
      alert("Need to connect wallet first!");
      return false;
    }
    if (get().contractReady === false) return false;

    const _marketPlaceContract = get().marketPlaceContract;
    const _txOp = await _marketPlaceContract?.methods
      .buy(tokenId)
      .send({ amount: price });
    return true;
  },
  cancelForSale: async (
    tokenId
    // durationId: number
  ) => {
    if (get().activeAddress === "") {
      alert("Need to connect wallet first!");
      return false;
    }
    if (get().contractReady === false) return false;

    const _marketPlaceContract = get().marketPlaceContract;
    const _txOp = await _marketPlaceContract?.methods
      .cancel_for_sale(tokenId)
      .send();
    await _txOp.confirmation(2);
    return true;
  },

  listForSale: async (tokenId, includingOperator, defaultAmount) => {
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
        _marketPlaceContract?.methods.list_for_sale(
          defaultAmount * 10 ** 6,
          tokenId
        )
      )
      .send();

    return true;
  },
}));
