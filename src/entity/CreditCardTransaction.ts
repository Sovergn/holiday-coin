import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToOne, BeforeUpdate, BeforeInsert } from "typeorm";
import * as moment from "moment";
import { CreditCardDonationStatus } from "../types/enums";
import { CreditCardClaim } from "./CreditCardClaim";
import { getConnection } from "./connection";

@Entity()
export class CreditCardTransaction extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "varchar",
    nullable: false
  })
  token: string;

  @Column({
    name: "amount",
    type: "decimal",
    precision: 27,
    scale: 18,
    nullable: true
  })
  amount: number;

  @Column({
    type: "smallint",
    nullable: false,
    default: 0
  })
  attempt: number;

  @Column({
    type: "smallint",
    nullable: false,
    default: CreditCardDonationStatus.PENDING
  })
  status: CreditCardDonationStatus;

  @Column({
    type: "boolean",
    nullable: false,
    default: false
  })
  converted: boolean;

  @OneToOne(type => CreditCardClaim, claim => claim.source)
  claim: CreditCardClaim;

  @Column({
    name: "created_at",
    type: "int",
    nullable: false
  })
  createdAt: number;

  @Column({
    name: "updated_at",
    type: "int",
    nullable: false
  })
  updatedAt: number;

  @BeforeUpdate()
  updateListener() {
    this.updatedAt = moment().unix();
  }

  @BeforeInsert()
  insertListener() {
    this.updatedAt = moment().unix();
    this.createdAt = this.updatedAt;
  }
}

export namespace CreditCardTransaction {
  export async function getPendingOrRetry(): Promise<CreditCardTransaction[]> {
    let connection = await getConnection();
    return connection.getRepository(CreditCardTransaction)
    .createQueryBuilder("cctx")
    .where("cctx.status = :status", { status: CreditCardDonationStatus.PENDING })
    .orWhere("cctx.status = :retryStatus", { retryStatus: CreditCardDonationStatus.FAILED_RETRY })
    .getMany();
  }
}
