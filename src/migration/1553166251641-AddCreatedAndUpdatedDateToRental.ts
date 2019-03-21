import {MigrationInterface, QueryRunner} from "typeorm";

export class AddCreatedAndUpdatedDateToRental1553166251641 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "name" character varying(50) NOT NULL, "email" character varying NOT NULL, "password" character varying(50) NOT NULL, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "rental" DROP COLUMN "dateOut"`);
        await queryRunner.query(`ALTER TABLE "rental" ADD "createdDate" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "rental" ADD "updatedDate" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "rental" DROP COLUMN "updatedDate"`);
        await queryRunner.query(`ALTER TABLE "rental" DROP COLUMN "createdDate"`);
        await queryRunner.query(`ALTER TABLE "rental" ADD "dateOut" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
