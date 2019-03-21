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
class AddCreatedAndUpdatedDateToRental1553166251641 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "name" character varying(50) NOT NULL, "email" character varying NOT NULL, "password" character varying(50) NOT NULL, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`ALTER TABLE "rental" DROP COLUMN "dateOut"`);
            yield queryRunner.query(`ALTER TABLE "rental" ADD "createdDate" TIMESTAMP NOT NULL DEFAULT now()`);
            yield queryRunner.query(`ALTER TABLE "rental" ADD "updatedDate" TIMESTAMP NOT NULL DEFAULT now()`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "rental" DROP COLUMN "updatedDate"`);
            yield queryRunner.query(`ALTER TABLE "rental" DROP COLUMN "createdDate"`);
            yield queryRunner.query(`ALTER TABLE "rental" ADD "dateOut" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP`);
            yield queryRunner.query(`DROP TABLE "user"`);
        });
    }
}
exports.AddCreatedAndUpdatedDateToRental1553166251641 = AddCreatedAndUpdatedDateToRental1553166251641;
//# sourceMappingURL=1553166251641-AddCreatedAndUpdatedDateToRental.js.map