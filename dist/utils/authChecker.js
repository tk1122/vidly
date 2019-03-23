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
const jsonwebtoken_1 = require("jsonwebtoken");
exports.authorizationChecker = (action, roles) => __awaiter(this, void 0, void 0, function* () {
    const token = action.request.headers["x-auth-token"] || "";
    if (!token)
        return false;
    try {
        const user = (yield jsonwebtoken_1.verify(token, process.env.JWT_PRIVATE_KEY));
        if (roles.includes("ADMIN")) {
            return user.isAdmin;
        }
        return true;
    }
    catch (_a) {
        return false;
    }
});
exports.currentUserChecker = (action) => __awaiter(this, void 0, void 0, function* () {
    const token = action.request.headers["x-auth-token"] || "";
    try {
        return jsonwebtoken_1.verify(token, process.env.JWT_PRIVATE_KEY);
    }
    catch (_b) {
        return null;
    }
});
//# sourceMappingURL=authChecker.js.map