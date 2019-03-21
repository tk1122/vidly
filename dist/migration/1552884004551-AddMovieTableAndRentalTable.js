"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class AddMovieTableAndRentalTable1552884004551 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`CREATE TABLE "rental" ("id" SERIAL NOT NULL, "customerId" integer, "movieId" integer, CONSTRAINT "PK_a20fc571eb61d5a30d8c16d51e8" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`ALTER TABLE "movie" ADD "rentalsId" integer`);
            yield queryRunner.query(`ALTER TABLE "movie" ADD CONSTRAINT "FK_05796ce41c0fd30d327244e9a8a" FOREIGN KEY ("rentalsId") REFERENCES "rental"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "rental" ADD CONSTRAINT "FK_def55ab51eed32ed8267ac956bb" FOREIGN KEY ("customerId") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "rental" ADD CONSTRAINT "FK_2f2be23e8f7d76f14807c7564e8" FOREIGN KEY ("movieId") REFERENCES "movie"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "rental" DROP CONSTRAINT "FK_2f2be23e8f7d76f14807c7564e8"`);
            yield queryRunner.query(`ALTER TABLE "rental" DROP CONSTRAINT "FK_def55ab51eed32ed8267ac956bb"`);
            yield queryRunner.query(`ALTER TABLE "movie" DROP CONSTRAINT "FK_05796ce41c0fd30d327244e9a8a"`);
            yield queryRunner.query(`ALTER TABLE "movie" DROP COLUMN "rentalsId"`);
            yield queryRunner.query(`DROP TABLE "rental"`);
        });
    }
}
exports.AddMovieTableAndRentalTable1552884004551 = AddMovieTableAndRentalTable1552884004551;
//# sourceMappingURL=1552884004551-AddMovieTableAndRentalTable.js.map