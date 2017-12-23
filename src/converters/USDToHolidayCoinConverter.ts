import * as _ from "lodash";
import { web3, Contracts } from "../eth";
import { CreditCardTransaction, CreditCardClaim, getConnection } from "../entity";
import config from "../config";

export default async function USDToHolidayCoinConverter(): Promise<void> {
  await getConnection();

  let convertibles = await CreditCardTransaction.find({
    where: {
      converted: false
    },
    relations: ["claim"]
  });
  for (let convertible of convertibles) {
    try {
      let txid = await Contracts.HolidayCoinCrowdSale.methods.assignTokens(convertible.claim.address, convertible.amount*10**18).send({
        from: config.get("web3:defaultAccount")
      });
      console.log("Converting USD to SHC", txid);
    } catch(err) {
      console.error(err);
      throw err;
    }
  }

  for (let convertible of convertibles) {
    convertible.converted = true;
    await convertible.save();
  }
}
