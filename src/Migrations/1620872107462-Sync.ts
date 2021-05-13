import {MigrationInterface, QueryRunner} from "typeorm";

export class Sync1620872107462 implements MigrationInterface {
    name = 'Sync1620872107462'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Drink" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying(255) NOT NULL, "sugarFreeOption" boolean NOT NULL DEFAULT false, "isActive" boolean NOT NULL DEFAULT true, "recipe" character varying array NOT NULL, CONSTRAINT "PK_d9c6540b224c1e2528e126bdbe1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_cb5504a0f908b7bde62efc622f" ON "Drink" ("name") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IDX_cb5504a0f908b7bde62efc622f"`);
        await queryRunner.query(`DROP TABLE "Drink"`);
    }

}
