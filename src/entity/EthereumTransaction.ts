import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, BeforeUpdate, BeforeInsert } from "typeorm";
import * as moment from "moment";
import { EthereumDonationStatus } from "../types/enums";

@Entity()
export class EthereumTransaction extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "varchar",
    nullable: false
  })
  txid: string;

  @Column({
    type: "varchar",
    nullable: false
  })
  address: string;

  @Column({
    type: "bigint",
    nullable: false
  })
  amount: number;

  @Column({
    type: "smallint",
    nullable: false,
    default: EthereumDonationStatus.FINISHED
  })
  status: EthereumDonationStatus;
  
  @Column({
    type: "boolean",
    nullable: false,
    default: true
  })
  converted: boolean;

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
