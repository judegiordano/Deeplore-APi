import { Column, Entity, Index } from "typeorm";

import Base from "../Base";

@Entity("Drink", { database: "deeplore-dev" })
export class Drink extends Base {

	@Index()
	@Column("varchar", { name: "name", nullable: false, length: 255 })
	name: string;

	@Column("boolean", { name: "sugarFreeOption", default: false })
	sugarFreeOption: boolean;

	@Column("boolean", { name: "isActive", default: true })
	isActive: boolean;

	@Column("varchar", { array: true, name: "recipe" })
	recipe: string[];
}