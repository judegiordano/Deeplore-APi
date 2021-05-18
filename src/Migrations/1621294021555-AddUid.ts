import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUid1621294021555 implements MigrationInterface {
	name = 'AddUid1621294021555'

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "Admin" ADD "uid" character varying(255) NOT NULL`);
		await queryRunner.query(`ALTER TABLE "Admin" ADD CONSTRAINT "UQ_001acba60548850421b90899070" UNIQUE ("uid")`);
		await queryRunner.query(`CREATE INDEX "IDX_001acba60548850421b9089907" ON "Admin" ("uid") `);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`DROP INDEX "IDX_001acba60548850421b9089907"`);
		await queryRunner.query(`ALTER TABLE "Admin" DROP CONSTRAINT "UQ_001acba60548850421b90899070"`);
		await queryRunner.query(`ALTER TABLE "Admin" DROP COLUMN "uid"`);
	}

}
