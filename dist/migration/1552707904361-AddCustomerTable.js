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
class AddCustomerTable1552707904361 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`CREATE TABLE "customer" ("id" SERIAL NOT NULL, "name" character varying(50) NOT NULL, "phone" character varying(20) NOT NULL, "isGold" boolean NOT NULL, CONSTRAINT "PK_a7a13f4cacb744524e44dfdad32" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`ALTER TABLE "genre" DROP COLUMN "name"`);
            yield queryRunner.query(`ALTER TABLE "genre" ADD "name" character varying(50) NOT NULL`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "genre" DROP COLUMN "name"`);
            yield queryRunner.query(`ALTER TABLE "genre" ADD "name" character varying(225) NOT NULL`);
            yield queryRunner.query(`DROP TABLE "customer"`);
        });
    }
}
exports.AddCustomerTable1552707904361 = AddCustomerTable1552707904361;
//# sourceMappingURL=1552707904361-AddCustomerTable.js.map