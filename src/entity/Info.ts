import { BaseEntity, Entity, Column, BeforeUpdate, BeforeInsert } from "typeorm";
import * as moment from "moment";

export class Info extends BaseEntity {
  @Column({
    type: "varchar",
    nullable: false
  })
  email: string;

  @Column({
    name: "first_name",
    type: "varchar",
    nullable: true
  })
  firstName: string;

  @Column({
    name: "last_name",
    type: "varchar",
    nullable: true
  })
  lastName: string;

  @Column({
    type: "varchar",
    nullable: true
  })
  country: string;

  @Column({
    type: "varchar",
    nullable: true
  })
  state: string;

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

