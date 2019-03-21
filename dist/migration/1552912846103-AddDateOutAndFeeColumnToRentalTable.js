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
class AddDateOutAndFeeColumnToRentalTable1552912846103 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "rental" ADD "dateOut" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP`);
            yield queryRunner.query(`ALTER TABLE "rental" ADD "rentalFee" character varying NOT NULL`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "rental" DROP COLUMN "rentalFee"`);
            yield queryRunner.query(`ALTER TABLE "rental" DROP COLUMN "dateOut"`);
        });
    }
}
exports.AddDateOutAndFeeColumnToRentalTable1552912846103 = AddDateOutAndFeeColumnToRentalTable1552912846103;
//# sourceMappingURL=1552912846103-AddDateOutAndFeeColumnToRentalTable.js.map