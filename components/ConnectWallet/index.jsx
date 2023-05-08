import React, { useState } from "react";
import { BeaconWallet } from "@taquito/beacon-wallet";

import {
  NetworkType,
  ColorMode,
  BeaconEvent,
  defaultEventCallbacks,
} from "@airgap/beacon-sdk";

import { Tezos, useTezosCollectStore } from "../../api/store";
const ConnectButton = ({}) => {
  // const [wallet, setWallet] = useState();
  const [userAddress, setUserAddress] = useState(null);
  const [userBalance, setUserBalance] = useState(null);
  const [beaconConnection, setBeaconConnection] = useState(null);

  const { activeAddress, setActiveAddress, initializeContracts } =
    useTezosCollectStore();
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

  const wallet = new BeaconWallet(options);

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
