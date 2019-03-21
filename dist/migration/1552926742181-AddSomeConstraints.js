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
class AddSomeConstraints1552926742181 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "movie" ADD CONSTRAINT "CHK_4f34f8a6633233381e64e17c50" CHECK ("numberInStock" >= 0)`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "movie" DROP CONSTRAINT "CHK_4f34f8a6633233381e64e17c50"`);
        });
    }
}
exports.AddSomeConstraints1552926742181 = AddSomeConstraints1552926742181;
//# sourceMappingURL=1552926742181-AddSomeConstraints.js.map