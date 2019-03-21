import {MigrationInterface, QueryRunner} from "typeorm";

export class AddSomeConstraints1552926742181 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "movie" ADD CONSTRAINT "CHK_4f34f8a6633233381e64e17c50" CHECK ("numberInStock" >= 0)`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "movie" DROP CONSTRAINT "CHK_4f34f8a6633233381e64e17c50"`);
    }

}
