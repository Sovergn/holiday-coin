import { BaseEntity, Entity, Column, BeforeUpdate, BeforeInsert } from "typeorm";
import * as moment from "moment";

export class Info extends BaseEntity {
  @Column({
    type: "varchar",
    nullable: false
  })
  email: string;

  @Column({
    type: "varchar",
    nullable: false
  })
  vote: string;
}

