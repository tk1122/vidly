import {MigrationInterface, QueryRunner} from "typeorm";

export class CascadeAgain1552908407929 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "movie" DROP CONSTRAINT "FK_3aaeb14b8d10d027190f3b159e5"`);
        await queryRunner.query(`ALTER TABLE "movie" DROP CONSTRAINT "FK_05796ce41c0fd30d327244e9a8a"`);
        await queryRunner.query(`ALTER TABLE "rental" DROP CONSTRAINT "FK_def55ab51eed32ed8267ac956bb"`);
        await queryRunner.query(`ALTER TABLE "rental" DROP CONSTRAINT "FK_2f2be23e8f7d76f14807c7564e8"`);
        await queryRunner.query(`ALTER TABLE "movie" DROP COLUMN "rentalsId"`);
        await queryRunner.query(`ALTER TABLE "movie" ADD CONSTRAINT "FK_3aaeb14b8d10d027190f3b159e5" FOREIGN KEY ("genreId") REFERENCES "genre"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "rental" ADD CONSTRAINT "FK_def55ab51eed32ed8267ac956bb" FOREIGN KEY ("customerId") REFERENCES "customer"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "rental" ADD CONSTRAINT "FK_2f2be23e8f7d76f14807c7564e8" FOREIGN KEY ("movieId") REFERENCES "movie"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "rental" DROP CONSTRAINT "FK_2f2be23e8f7d76f14807c7564e8"`);
        await queryRunner.query(`ALTER TABLE "rental" DROP CONSTRAINT "FK_def55ab51eed32ed8267ac956bb"`);
        await queryRunner.query(`ALTER TABLE "movie" DROP CONSTRAINT "FK_3aaeb14b8d10d027190f3b159e5"`);
        await queryRunner.query(`ALTER TABLE "movie" ADD "rentalsId" integer`);
        await queryRunner.query(`ALTER TABLE "rental" ADD CONSTRAINT "FK_2f2be23e8f7d76f14807c7564e8" FOREIGN KEY ("movieId") REFERENCES "movie"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "rental" ADD CONSTRAINT "FK_def55ab51eed32ed8267ac956bb" FOREIGN KEY ("customerId") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "movie" ADD CONSTRAINT "FK_05796ce41c0fd30d327244e9a8a" FOREIGN KEY ("rentalsId") REFERENCES "rental"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "movie" ADD CONSTRAINT "FK_3aaeb14b8d10d027190f3b159e5" FOREIGN KEY ("genreId") REFERENCES "genre"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
