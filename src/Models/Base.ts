import { classToPlain } from "class-transformer";
import { PrimaryGeneratedColumn, BaseEntity, CreateDateColumn, UpdateDateColumn } from "typeorm";

export default abstract class Entity extends BaseEntity {

	@PrimaryGeneratedColumn()
	id: number;

	@CreateDateColumn()
	createdAt: Date

	@UpdateDateColumn()
	updatedAt: Date

	toJSON(): Record<string, unknown> {
		return classToPlain(this);
	}
}
