import {MigrationInterface, QueryRunner} from "typeorm";

export class AddMovieTable1552749971889 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "customer" ALTER COLUMN "isGold" SET DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "movie" ALTER COLUMN "numberInStock" SET DEFAULT 10`);
        await queryRunner.query(`ALTER TABLE "movie" ALTER COLUMN "dailyRentalRate" SET DEFAULT 0`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "movie" ALTER COLUMN "dailyRentalRate" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "movie" ALTER COLUMN "numberInStock" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "customer" ALTER COLUMN "isGold" DROP DEFAULT`);
    }

}
