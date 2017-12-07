import { BaseEntity, PrimaryGeneratedColumn, Column, BeforeUpdate, BeforeInsert } from "typeorm";
import { ExtendedColumnOptions } from "typeorm-encrypted";
import * as moment from "moment";
import config from "../config";
import { web3 } from "../eth";
import { BitcoinDonationStatus } from "../types/enums";
import { Info } from "./Info";

export abstract class HolidayCoinClaim extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column(type => Info)
  info: Info;

  @Column({
    type: "varchar",
    nullable: false
  })
  address: string;

  @Column(<ExtendedColumnOptions>{
    type: "varchar",
    nullable: true,
    encrypt: {
      key: config.get("secret"),
      algorithm: "aes-256-cbc",
      ivLength: 16
    }
  })
  secret: string;

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
    if (!this.address) {
      let { privateKey, address } = web3.eth.accounts.create();
      this.address = address;
      this.secret = privateKey;
    }
    this.updatedAt = moment().unix();
    this.createdAt = this.updatedAt;
  }
}
