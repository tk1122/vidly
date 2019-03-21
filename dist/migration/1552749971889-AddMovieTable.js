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
class AddMovieTable1552749971889 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "customer" ALTER COLUMN "isGold" SET DEFAULT false`);
            yield queryRunner.query(`ALTER TABLE "movie" ALTER COLUMN "numberInStock" SET DEFAULT 10`);
            yield queryRunner.query(`ALTER TABLE "movie" ALTER COLUMN "dailyRentalRate" SET DEFAULT 0`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "movie" ALTER COLUMN "dailyRentalRate" DROP DEFAULT`);
            yield queryRunner.query(`ALTER TABLE "movie" ALTER COLUMN "numberInStock" DROP DEFAULT`);
            yield queryRunner.query(`ALTER TABLE "customer" ALTER COLUMN "isGold" DROP DEFAULT`);
        });
    }
}
exports.AddMovieTable1552749971889 = AddMovieTable1552749971889;
//# sourceMappingURL=1552749971889-AddMovieTable.js.map