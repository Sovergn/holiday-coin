import * as _ from "lodash";
import { web3, Contracts } from "../eth";
import { BitcoinTransaction, BitcoinClaim, getConnection } from "../entity";
import config from "../config";

export default async function BitcoinToHolidayCoinConverter(): Promise<void> {
  let connection = await getConnection();
  let convertibles = await connection.getRepository(BitcoinTransaction).find({
    where: {
      converted: false
    }
  });
  let addressToAmountMap: { [address: string]: number; } = {};

  for (let convertible of convertibles) {
    if (!addressToAmountMap[convertible.address]) {
      addressToAmountMap[convertible.address] = convertible.amount;
    } else {
      addressToAmountMap[convertible.address] += convertible.amount;
    }
  }

  for (let address in addressToAmountMap) {
    let amount = addressToAmountMap[address] * 10**18;
    let txid = await Contracts.HolidayCoinCrowdSale.methods.assignTokens(address, amount).send({ from: config.get("web3:defaultAccount") });
    console.log("Converting BTC to SHC", txid);
  }

  for (let convertible of convertibles) {
    convertible.converted = true;
    await convertible.save();
  }
}
