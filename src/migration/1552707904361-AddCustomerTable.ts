import {MigrationInterface, QueryRunner} from "typeorm";

export class AddCustomerTable1552707904361 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "customer" ("id" SERIAL NOT NULL, "name" character varying(50) NOT NULL, "phone" character varying(20) NOT NULL, "isGold" boolean NOT NULL, CONSTRAINT "PK_a7a13f4cacb744524e44dfdad32" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "genre" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "genre" ADD "name" character varying(50) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "genre" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "genre" ADD "name" character varying(225) NOT NULL`);
        await queryRunner.query(`DROP TABLE "customer"`);
    }

}
