import { BaseEntity, Entity, Column, OneToOne, JoinColumn } from "typeorm";
import { CreditCardTransaction } from "./CreditCardTransaction";
import { HolidayCoinClaim } from "./HolidayCoinClaim";

@Entity()
export class CreditCardClaim extends HolidayCoinClaim {
  @OneToOne(type => CreditCardTransaction, tx => tx.claim)
  @JoinColumn({
    name: "source_id"
  })
  source: CreditCardTransaction;
}
