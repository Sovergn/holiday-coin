import { BaseEntity, Entity, Column} from "typeorm";
import { EthereumTransaction } from "./EthereumTransaction";
import { HolidayCoinClaim } from "./HolidayCoinClaim";

@Entity()
export class EthereumClaim extends HolidayCoinClaim {}
