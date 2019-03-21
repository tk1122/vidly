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
class CreateMovieTable1552734566453 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`CREATE TABLE "movie" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, "numberInStock" smallint NOT NULL, "dailyRentalRate" double precision NOT NULL, "genreId" integer, CONSTRAINT "REL_3aaeb14b8d10d027190f3b159e" UNIQUE ("genreId"), CONSTRAINT "PK_cb3bb4d61cf764dc035cbedd422" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`ALTER TABLE "movie" ADD CONSTRAINT "FK_3aaeb14b8d10d027190f3b159e5" FOREIGN KEY ("genreId") REFERENCES "genre"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "movie" DROP CONSTRAINT "FK_3aaeb14b8d10d027190f3b159e5"`);
            yield queryRunner.query(`DROP TABLE "movie"`);
        });
    }
}
exports.CreateMovieTable1552734566453 = CreateMovieTable1552734566453;
//# sourceMappingURL=1552734566453-CreateMovieTable.js.map