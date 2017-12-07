import * as React from "react";
import { renderToString } from 'react-dom/server';
import { PayForms } from "../../app/pay/PayForms";
import { getConnection, Info, BitcoinClaim, EthereumClaim, CreditCardClaim, CreditCardTransaction, ValidationError } from "../../entity";
import { HolidayCoinClaim } from "../../entity/HolidayCoinClaim";
import * as routerUtils from "../utils/routes";

interface IClaimRequest {
  body: {
    email: string;
    firstName?: string;
    lastName?: string;
    country?: string;
    state?: string;

    token?: string;
    amount?: number;
    address?: string;
  };
}

export default function loadRoutes (app: any): any {
  var router = routerUtils.loadRoutes(__dirname, "**/*.ts", app, ["index.ts"]);

  router.get("/robots.txt", (req: any, res: any) => {
    res.send("User-agent: *\nDisallow: /*?splash=*\n");
  });

  router.get("*", (req: any, res: any) => {
    res.render("index", {
      title: "Holiday Coin",
      meta: {
        description: ""
      },
      body: renderToString(<PayForms />)
    });
  });

  async function claim<T extends HolidayCoinClaim>(req: IClaimRequest, res: any, claim: T) {
    await getConnection();

    let { email, firstName, lastName, country, state } = req.body;

    try {
      let info = new Info();
      info.email = email;
      info.firstName = firstName;
      info.lastName = lastName;
      info.country = country;
      info.state = state;
      claim.info = info;

      await claim.save();

      res.json({
        error: false,
        data: {
          token: claim.address
        }
      });
    } catch(err) {
      if (err instanceof ValidationError) {
        res.status(400);
        res.json({
          error: true,
          data: err
        });
      } else if (err.message.indexOf("SQLITE_CONSTRAINT") !== -1) {
        res.status(400);
        res.json({
          error: true,
          message: err.message
        });
      } else {
        res.status(500);
        res.json({
          error: true,
          message: `Server error: "${err.message}"`
        });
      }
    }
  }

  router.post("/ethclaim", async (req: IClaimRequest, res: any): Promise<void> => {
    let { address } = req.body;
    let c = new EthereumClaim();
    c.address = address;
    return claim(req, res, c);
  });

  router.post("/btcclaim", async (req: IClaimRequest, res: any): Promise<void> => {
    let { address } = req.body;
    let c = new BitcoinClaim();
    c.source = address;
    return claim(req, res, c);
  });

  router.post("/ccdonate", async (req: IClaimRequest, res: any): Promise<void> => {
    await getConnection();

    let { token, amount } = req.body;
    let tx = new CreditCardTransaction();
    tx.token = token;
    tx.amount = amount;

    try {
      await tx.save();
    } catch(err) {
      if (err instanceof ValidationError) {
        res.status(400);
        res.json({
          error: true,
          data: err
        });
      } else if (err.message.indexOf("SQLITE_CONSTRAINT") !== -1) {
        res.status(400);
        res.json({
          error: true,
          message: err.message
        });
      } else {
        res.status(500);
        res.json({
          error: true,
          message: `Server error: "${err.message}"`
        });
      }

      return;
    }

    let c = new CreditCardClaim();
    c.source = tx;

    return claim(req, res, c);
  });

  return router;
}
