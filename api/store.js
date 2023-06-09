import create from "zustand";
import { MARKETPLACE_CONTRACT_ADDRESS, NFT_CONTRACT_ADDRESS } from "config";
import { MichelsonMap, TezosToolkit } from "@taquito/taquito";
import { char2Bytes } from "@taquito/utils";
import { NFTStorage } from "nft.storage";
import axios from "axios";
import {
  NetworkType,
  ColorMode,
  BeaconEvent,
  defaultEventCallbacks,
} from "@airgap/beacon-sdk";
import { BeaconWallet } from "@taquito/beacon-wallet";
import { Configuration, OpenAIApi } from "openai";

export const nftStorage = new NFTStorage({
  token: process.env.TOKEN_STORAGE_API_KEY,
});

export const openAIConfiguration = new Configuration({
  apiKey: process.env.OPEN_AI_KEY,
});

export const openai = new OpenAIApi(openAIConfiguration);
export const Tezos = new TezosToolkit("https://ghostnet.smartpy.io/");

export const hex2buf = (hex) => {
  return new Uint8Array(hex.match(/[\da-f]{2}/gi).map((h) => parseInt(h, 16)));
};

export function bytes2Char(hex) {
  return Buffer.from(hex2buf(hex)).toString("utf8");
}

const options = {
  name: "Template",
  preferredNetwork: NetworkType.GHOSTNET,
  colorMode: ColorMode.LIGHT,
  disableDefaultEvents: false, // Disable all events / UI. This also disables the pairing alert.
  eventHandlers: {
    // To keep the pairing alert, we have to add the following default event handlers back
    [BeaconEvent.PAIR_INIT]: {
      handler: defaultEventCallbacks.PAIR_INIT,
    },
    [BeaconEvent.PAIR_SUCCESS]: {
      handler: (data) => {
        return data.publicKey;
      },
    },
  },
};

export const wallet = new BeaconWallet(options);
const serverUrl = process.env.SERVER_URL;

export const useTezosCollectStore = create((set, get) => ({
  currentUser: null,
  activeAddress: "",
  setActiveAddress: (_activeAddress) => {
    set((state) => ({
      ...state,
      activeAddress: _activeAddress,
    }));
  },
  accessToken: "",
  setAccessToken: (_accessToken) => {
    set((state) => ({
      ...state,
      accessToken: _accessToken,
    }));
  },
  // Interacting with Tezos
  contractReady: false,
  marketPlaceContract: null,
  nftContract: null,
  lastTokenId: 0,
  tokenData: null,
  auctionData: null,
  recentActivityData: null,
  initializeContracts: async () => {
    const [_marketPlaceContract, _nftContract] = await Promise.all([
      Tezos.wallet.at(MARKETPLACE_CONTRACT_ADDRESS),
      Tezos.wallet.at(NFT_CONTRACT_ADDRESS),
    ]);

    const _nftContractStorage = await _nftContract.storage();
    set((state) => ({
      ...state,
      contractReady: true,
      lastTokenId: _nftContractStorage.last_token_id.toNumber(),
      marketPlaceContract: _marketPlaceContract,
      nftContract: _nftContract,
    }));
  },

  updateLastTokenId: async () => {
    const _nftContractStorage = await get()._nftContract?.storage();

    set((state) => ({
      ...state,
      lastTokenId: _nftContractStorage.last_token_id.toNumber(),
    }));
  },

  // mint function for artist
  nftMint: async ({ amount, metadata }) => {
    if (get().activeAddress === "") {
      alert("Need to connect wallet first!");
      return false;
    }
    if (get().contractReady === false) {
      alert("Contract is not ready");
      return false;
    }

    const _marketPlaceContract = get().marketPlaceContract;

    let bytes = "";
    for (var i = 0; i < metadata.length; i++) {
      bytes += metadata.charCodeAt(i).toString(16).slice(-4);
    }

    const op = await _marketPlaceContract?.methods.mint(amount, bytes).send();

    await op?.confirmation(2);
    return true;
  },

  listWithFixedPrice: async ({ price, token_id }) => {
    if (get().activeAddress === "") {
      alert("Need to connect wallet first!");
      return false;
    }
    if (get().contractReady === false) {
      alert("Contract is not ready");
      return false;
    }

    const _marketPlaceContract = get().marketPlaceContract;
    const _nftContract = get().nftContract;

    await Tezos.wallet
      .batch()
      .withContractCall(
        _nftContract?.methods.update_operators([
          {
            add_operator: {
              owner: get().activeAddress,
              operator: MARKETPLACE_CONTRACT_ADDRESS,
              token_id: token_id,
            },
          },
        ])
      )
      .withContractCall(
        _marketPlaceContract?.methods.list_with_fixed_price(price, token_id)
      )
      .send();
    return true;
  },

  listWithAuction: async ({ start_price, end_time, token_id }) => {
    if (get().activeAddress === "") {
      alert("Need to connect wallet first!");
      return false;
    }
    if (get().contractReady === false) {
      alert("Contract is not ready");
      return false;
    }

    const _marketPlaceContract = get().marketPlaceContract;
    const _nftContract = get().nftContract;

    await Tezos.wallet
      .batch()
      .withContractCall(
        _nftContract?.methods.update_operators([
          {
            add_operator: {
              owner: get().activeAddress,
              operator: MARKETPLACE_CONTRACT_ADDRESS,
              token_id: token_id,
            },
          },
        ])
      )
      .withContractCall(
        _marketPlaceContract?.methods.list_with_auction(
          end_time,
          start_price,
          token_id
        )
      )
      .send();
    return true;
  },

  fetchNft: async () => {
    const response = await axios.get(
      `https://api.ghostnet.tzkt.io/v1/contracts/${MARKETPLACE_CONTRACT_ADDRESS}/bigmaps/nft_data/keys`
    );
    const response1 = await axios.get(
      `https://api.ghostnet.tzkt.io/v1/contracts/${NFT_CONTRACT_ADDRESS}/bigmaps/token_metadata/keys`
    );
    const response2 = await axios.get(
      `https://api.ghostnet.tzkt.io/v1/contracts/${MARKETPLACE_CONTRACT_ADDRESS}/bigmaps/auction_data/keys`
    );

    const d1 = response.data;
    const d2 = response1.data;
    const d3 = response2.data;

    let tokenData = [];
    for (let i = 0; i < d1.length; i++) {
      const s = bytes2Char(d2[i].value.token_info[""]).split("//").at(-1);

      const res = await axios.get("https://ipfs.io/ipfs/" + s);

      const l1 = d1[i].value;
      const l2 = res.data;

      let auctionStarted = false;
      for (let j = 0; j < d3.length; j++) {
        if (d3[j].value.token.token_id == d2[i].value.token_id) {
          auctionStarted = true;
          break;
        }
      }

      tokenData[i] = {
        ...l1,
        ...l2,
        auctionStarted,
        token_id: d2[i].value.token_id,
      };
    }
    set((state) => ({
      ...state,
      tokenData: tokenData,
    }));
  },

  fetchAuctionData: async () => {
    const response = await axios.get(
      `https://api.ghostnet.tzkt.io/v1/contracts/${MARKETPLACE_CONTRACT_ADDRESS}/bigmaps/auction_data/keys`
    );
    const response1 = await axios.get(
      `https://api.ghostnet.tzkt.io/v1/contracts/${NFT_CONTRACT_ADDRESS}/bigmaps/token_metadata/keys`
    );
    const response2 = await axios.get(
      `https://api.ghostnet.tzkt.io/v1/contracts/${MARKETPLACE_CONTRACT_ADDRESS}/bigmaps/bidder_data/keys`
    );

    const d1 = response.data;
    const d2 = response1.data;
    const d3 = response2.data;

    let auctionData = [];
    for (let i = 0; i < d1.length; i++) {
      for (let j = 0; j < d2.length; j++) {
        if (d2[j].value.token_id == d1[i].value.token.token_id) {
          const s = bytes2Char(d2[j].value.token_info[""]).split("//").at(-1);

          const res = await axios.get("https://ipfs.io/ipfs/" + s);

          const l1 = d1[i].value;
          const l2 = res.data;
          const l3 = d3[i].value;
          auctionData[i] = {
            ...l1,
            ...l2,
            bid_data: l3,
            token_id: d2[j].value.token_id,
          };
          break;
        }
      }
    }
    set((state) => ({
      ...state,
      auctionData: auctionData,
    }));
  },

  collectNft: async (token_id, price) => {
    if (get().activeAddress === "") {
      alert("Need to connect wallet first!");
      return false;
    }
    if (get().contractReady === false) {
      alert("Contract is not ready");
      return false;
    }
    const _marketPlaceContract = get().marketPlaceContract;

    const op = await _marketPlaceContract?.methods
      .collect(token_id)
      .send({ mutez: true, amount: price });
    await op.confirmation();
    return true;
  },

  placeBid: async (token_id, price) => {
    if (get().activeAddress === "") {
      alert("Need to connect wallet first!");
      return false;
    }
    if (get().contractReady === false) {
      alert("Contract is not ready");
      return false;
    }

    const _marketPlaceContract = get().marketPlaceContract;

    const op = await _marketPlaceContract?.methods
      .place_bid(token_id)
      .send({ mutez: true, amount: price });
    await op.confirmation();
    return true;
  },

  claimPrize: async (token_id) => {
    if (get().activeAddress === "") {
      alert("Need to connect wallet first!");
      return false;
    }
    if (get().contractReady === false) {
      alert("Contract is not ready");
      return false;
    }

    const _marketPlaceContract = get().marketPlaceContract;

    const op = await _marketPlaceContract?.methods.claim_prize(token_id).send();
    await op.confirmation();
    return true;
  },

  fetchRecentTransactions: async () => {
    const response = await axios.get(
      `https://api.ghostnet.tzkt.io/v1/accounts/${MARKETPLACE_CONTRACT_ADDRESS}/operations`
    );

    const d1 = response.data;
    const d2 = d1.filter((element) => element.parameter != undefined);

    set((state) => ({
      ...state,
      recentActivityData: d2.slice(0, 10),
    }));
  },

  registerUser: async (user) => {
    const response = await axios.post(`${serverUrl}/api/users/register`, user);
    if (response.status == 200) {
      return true;
    }
    return false;
  },

  login: async (user) => {
    const response = await axios.post(`${serverUrl}/api/users/login`, user);
    if (response.status == 200) {
      const token = response.data.token;
      localStorage.setItem("token", token);
      return true;
    }
    return false;
  },

  loadUser: async (token) => {
    const response = await axios.get(`${serverUrl}/api/auth`, {
      headers: {
        "x-auth-token": token,
      },
    });
    if (response.status == 200) {
      set((state) => ({
        ...state,
        currentUser: response.data,
      }));
      return true;
    }
    return false;
  },

  fetchBase64Image: async (story, token) => {
    const response = await axios.post(`${serverUrl}/api/image/create`, story, {
      headers: {
        "x-auth-token": token,
      },
    });
    if (response.status == 200) {
      console.log(response.data);

      return response.data;
    }
    return undefined;
  },

  logout: async () => {
    localStorage.removeItem("token");
    set((state) => ({
      ...state,
      currentUser: null,
    }));
    return true;
  },

  makeShort: (userAddress) => {
    return (
      userAddress.substring(0, 4) +
      "....." +
      userAddress.substring(userAddress.length - 4)
    );
  },
}));
