import { MigrationInterface, QueryRunner } from "typeorm";

export class AddAdmin1621282959957 implements MigrationInterface {
	name = 'AddAdmin1621282959957'

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`CREATE TABLE "Admin" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "username" character varying(255) NOT NULL, "password" character varying(255) NOT NULL, "tokenVersion" integer NOT NULL DEFAULT '0', CONSTRAINT "UQ_e6f9369e99cf2ac55215b667ffa" UNIQUE ("username"), CONSTRAINT "PK_3a489f4a44372ff150d7924dc3d" PRIMARY KEY ("id"))`);
		await queryRunner.query(`CREATE INDEX "IDX_e6f9369e99cf2ac55215b667ff" ON "Admin" ("username") `);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`DROP INDEX "IDX_e6f9369e99cf2ac55215b667ff"`);
		await queryRunner.query(`DROP TABLE "Admin"`);
	}

}
