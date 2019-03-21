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
class CascadeAgain1552908407929 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "movie" DROP CONSTRAINT "FK_3aaeb14b8d10d027190f3b159e5"`);
            yield queryRunner.query(`ALTER TABLE "movie" DROP CONSTRAINT "FK_05796ce41c0fd30d327244e9a8a"`);
            yield queryRunner.query(`ALTER TABLE "rental" DROP CONSTRAINT "FK_def55ab51eed32ed8267ac956bb"`);
            yield queryRunner.query(`ALTER TABLE "rental" DROP CONSTRAINT "FK_2f2be23e8f7d76f14807c7564e8"`);
            yield queryRunner.query(`ALTER TABLE "movie" DROP COLUMN "rentalsId"`);
            yield queryRunner.query(`ALTER TABLE "movie" ADD CONSTRAINT "FK_3aaeb14b8d10d027190f3b159e5" FOREIGN KEY ("genreId") REFERENCES "genre"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "rental" ADD CONSTRAINT "FK_def55ab51eed32ed8267ac956bb" FOREIGN KEY ("customerId") REFERENCES "customer"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "rental" ADD CONSTRAINT "FK_2f2be23e8f7d76f14807c7564e8" FOREIGN KEY ("movieId") REFERENCES "movie"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "rental" DROP CONSTRAINT "FK_2f2be23e8f7d76f14807c7564e8"`);
            yield queryRunner.query(`ALTER TABLE "rental" DROP CONSTRAINT "FK_def55ab51eed32ed8267ac956bb"`);
            yield queryRunner.query(`ALTER TABLE "movie" DROP CONSTRAINT "FK_3aaeb14b8d10d027190f3b159e5"`);
            yield queryRunner.query(`ALTER TABLE "movie" ADD "rentalsId" integer`);
            yield queryRunner.query(`ALTER TABLE "rental" ADD CONSTRAINT "FK_2f2be23e8f7d76f14807c7564e8" FOREIGN KEY ("movieId") REFERENCES "movie"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "rental" ADD CONSTRAINT "FK_def55ab51eed32ed8267ac956bb" FOREIGN KEY ("customerId") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "movie" ADD CONSTRAINT "FK_05796ce41c0fd30d327244e9a8a" FOREIGN KEY ("rentalsId") REFERENCES "rental"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "movie" ADD CONSTRAINT "FK_3aaeb14b8d10d027190f3b159e5" FOREIGN KEY ("genreId") REFERENCES "genre"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        });
    }
}
exports.CascadeAgain1552908407929 = CascadeAgain1552908407929;
//# sourceMappingURL=1552908407929-CascadeAgain.js.map