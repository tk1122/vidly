import {MigrationInterface, QueryRunner} from "typeorm";

export class Cascade1552907031628 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "movie" DROP CONSTRAINT "FK_05796ce41c0fd30d327244e9a8a"`);
        await queryRunner.query(`ALTER TABLE "movie" ADD CONSTRAINT "FK_05796ce41c0fd30d327244e9a8a" FOREIGN KEY ("rentalsId") REFERENCES "rental"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "movie" DROP CONSTRAINT "FK_05796ce41c0fd30d327244e9a8a"`);
        await queryRunner.query(`ALTER TABLE "movie" ADD CONSTRAINT "FK_05796ce41c0fd30d327244e9a8a" FOREIGN KEY ("rentalsId") REFERENCES "rental"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
