"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const express_1 = __importDefault(require("express"));
const body_parser_1 = require("body-parser");
const routing_controllers_1 = require("routing-controllers");
const jsonwebtoken_1 = require("jsonwebtoken");
const app = express_1.default();
app.use(body_parser_1.json());
app.use(body_parser_1.urlencoded({ extended: true }));
typeorm_1.createConnection()
    .then(() => __awaiter(this, void 0, void 0, function* () {
    routing_controllers_1.useExpressServer(app, {
        development: false,
        routePrefix: "/api",
        controllers: [__dirname + "/controllers/**/*.js"],
        authorizationChecker: (action, roles) => __awaiter(this, void 0, void 0, function* () {
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
        }),
        currentUserChecker: (action) => __awaiter(this, void 0, void 0, function* () {
            const token = action.request.headers["x-auth-token"] || "";
            try {
                return jsonwebtoken_1.verify(token, process.env.JWT_PRIVATE_KEY);
            }
            catch (_b) {
                return null;
            }
        })
    });
}))
    .catch(error => console.log(error));
exports.default = app;
//# sourceMappingURL=app.js.map