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
class IncreaseLengthOfPasswordColumn1553219448609 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "user" DROP COLUMN "password"`);
            yield queryRunner.query(`ALTER TABLE "user" ADD "password" character varying(100) NOT NULL`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "user" DROP COLUMN "password"`);
            yield queryRunner.query(`ALTER TABLE "user" ADD "password" character varying(50) NOT NULL`);
        });
    }
}
exports.IncreaseLengthOfPasswordColumn1553219448609 = IncreaseLengthOfPasswordColumn1553219448609;
//# sourceMappingURL=1553219448609-IncreaseLengthOfPasswordColumn.js.map