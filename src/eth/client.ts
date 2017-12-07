
import config from "../config";

const Web3 = require("web3");

const PROD = process.env.NODE_ENV === "production";

export default function get () {
  let web3: any;
  if (config.get("web3:url")) {
    web3 = new Web3(new Web3.providers.HttpProvider(config.get("web3:url")));
  } else {
    if (PROD) {
      web3 =  new Web3();
    } else {
      web3 =  new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    }
  }

  for (let account of config.get("web3:accounts")) {
    web3.eth.accounts.wallet.add(account);
  }

  return web3;
};
