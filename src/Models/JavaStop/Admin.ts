import { BeforeInsert, Column, Entity, Index } from "typeorm";
import { Exclude } from "class-transformer";
import { Length } from "class-validator";

import Base from "../Base";
import { Utility } from "../../Helpers/Utility";

@Entity("Admin", { database: "deeplore-dev" })
export class Admin extends Base {

	@Index()
	@Length(3, 15, { message: "Must at least 3 characters long" })
	@Column("varchar", { name: "username", nullable: false, length: 255, unique: true })
	username: string;

	@Index()
	@Column("varchar", { name: "uid", nullable: false, length: 255, unique: true })
	uid: string;

	@Exclude()
	@Length(3, 15, { message: "Must at least 3 characters long" })
	@Column("varchar", { name: "password", length: 255 })
	password: string;

	@Column("int", { name: "tokenVersion", default: 0 })
	tokenVersion: number;

	@BeforeInsert()
	makeUid(): void {
		this.uid = Utility.RandomUid(15);
	}
}