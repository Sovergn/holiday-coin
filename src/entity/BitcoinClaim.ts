import { BaseEntity, Entity, Column} from "typeorm";
import { BitcoinTransaction } from "./BitcoinTransaction";
import { HolidayCoinClaim } from "./HolidayCoinClaim";

@Entity()
export class BitcoinClaim extends HolidayCoinClaim {
  @Column({
    type: "varchar",
    nullable: false
  })
  source: string;
}
