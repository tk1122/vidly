import {MigrationInterface, QueryRunner} from "typeorm";

export class AddDateOutAndFeeColumnToRentalTable1552912846103 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "rental" ADD "dateOut" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "rental" ADD "rentalFee" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "rental" DROP COLUMN "rentalFee"`);
        await queryRunner.query(`ALTER TABLE "rental" DROP COLUMN "dateOut"`);
    }

}
