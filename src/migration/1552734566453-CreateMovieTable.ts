import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateMovieTable1552734566453 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "movie" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, "numberInStock" smallint NOT NULL, "dailyRentalRate" double precision NOT NULL, "genreId" integer, CONSTRAINT "REL_3aaeb14b8d10d027190f3b159e" UNIQUE ("genreId"), CONSTRAINT "PK_cb3bb4d61cf764dc035cbedd422" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "movie" ADD CONSTRAINT "FK_3aaeb14b8d10d027190f3b159e5" FOREIGN KEY ("genreId") REFERENCES "genre"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "movie" DROP CONSTRAINT "FK_3aaeb14b8d10d027190f3b159e5"`);
        await queryRunner.query(`DROP TABLE "movie"`);
    }

}
