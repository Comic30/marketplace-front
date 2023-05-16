import React, { useState } from "react";

import {
  NetworkType,
  ColorMode,
  BeaconEvent,
  defaultEventCallbacks,
} from "@airgap/beacon-sdk";

import { createMessagePayload, signIn } from "@siwt/sdk";

import { Tezos, useTezosCollectStore, wallet } from "../../api/store";
const ConnectButton = ({}) => {
  // const [wallet, setWallet] = useState();
  const [userAddress, setUserAddress] = useState(null);
  const [userBalance, setUserBalance] = useState(null);
  const [beaconConnection, setBeaconConnection] = useState(null);

  const { activeAddress, setActiveAddress, initializeContracts } =
    useTezosCollectStore();

  const setup = async (userAddress) => {
    setUserAddress(userAddress);
    setActiveAddress(userAddress);
    // updates balance
    const balance = await Tezos.tz.getBalance(userAddress);
    setUserBalance(balance.toNumber());
    Tezos.setWalletProvider(wallet);
  };

  const makeShort = (userAddress) => {
    return (
      userAddress.substring(0, 4) +
      "....." +
      userAddress.substring(userAddress.length - 4)
    );
  };
  const connectWallet = async () => {
    try {
      const activeAccount = await wallet.client.getActiveAccount();
      if (activeAccount) {
        Tezos.setWalletProvider(wallet);
        setUserAddress(activeAccount.address);
        setActiveAddress(activeAccount.address);
      }
      await wallet.requestPermissions({
        network: {
          type: NetworkType.GHOSTNET,
          rpcUrl: "https://ghostnet.smartpy.io/",
        },
      });
      // gets user's address
      const userAddress = await wallet.getPKH();

      // create the message to be signed
      const messagePayload = createMessagePayload({
        dappUrl: "siwt.stakenow.fi",
        pkh: userAddress,
      });

      // request the signature
      const signedPayload = await wallet.client.requestSignPayload(
        messagePayload
      );

      const publicKey = await activeAccount.publicKey;

      // sign in the user to our app
      const { data } = await signIn("http://localhost:5000/api/auth")({
        pk: publicKey,
        pkh: userAddress,
        message: messagePayload.payload,
        signature: signedPayload.signature,
      });

      console.log(data);
      const { accessToken, idToken } = data;
      state.accessToken = accessToken;

      await setup(userAddress);
      await initializeContracts();
      setBeaconConnection(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="btn login-btn ml-50" onClick={connectWallet}>
      {activeAddress ? makeShort(activeAddress) : "Connect Wallet"}
    </div>
  );
};

export default ConnectButton;
