import * as _ from "lodash";
import * as request from "request-promise-native";
import config from "../config";
import { CreditCardTransaction, CreditCardClaim, getConnection } from "../entity";
import { send } from "../email";
import { CreditCardDonationStatus } from "../types/enums";
const stripe = require("stripe")(config.get("stripe:secret"));

export default async function CreditCardProcessor(): Promise<void> {
  let connection = await getConnection();
  let txs: CreditCardTransaction[] = await CreditCardTransaction.getPendingOrRetry();

  for (let tx of txs) {
    tx.status = CreditCardDonationStatus.PROCESSING;
    await tx.save();

    try {
      let charge = await stripe.charges.create({
        amount: tx.amount * 10,
        description: "Donation",
        currency: "usd",
        source: tx.token,
        metadata: {
          tx_id: tx.id
        }
      });
      console.log("Created carge", charge.id);
    } catch(err) {
      console.error(err);

      tx.status = CreditCardDonationStatus.FAILED_RETRY;
      await tx.save();

      throw err;
    }

    tx.status = CreditCardDonationStatus.FINISHED;
    await tx.save();

    let claim = await CreditCardClaim.findOne({
      where: {
        source: tx.id
      }
    });

    send("cc_processed", tx, [{ address: claim.info.email }]);
  }
}
