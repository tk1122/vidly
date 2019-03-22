"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
const routing_controllers_1 = require("routing-controllers");
const typeorm_1 = require("typeorm");
const User_1 = require("../entity/User");
const class_validator_1 = require("class-validator");
const getErrorMessage_1 = require("../utils/getErrorMessage");
const bcrypt_1 = require("bcrypt");
const jsonwebtoken_1 = require("jsonwebtoken");
const lodash_1 = __importDefault(require("lodash"));
let AuthController = class AuthController {
    constructor() {
        this._userRepo = typeorm_1.getConnection().getRepository(User_1.User);
    }
    currentUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return user;
        });
    }
    login(body, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const errors = yield class_validator_1.validate(new User_1.User(body.email, body.password), {
                skipMissingProperties: true
            });
            if (errors.length > 0)
                throw new routing_controllers_1.HttpError(400, getErrorMessage_1.getErrorMessage(errors));
            const user = yield this._userRepo.findOne({ email: body.email });
            if (!user)
                throw new routing_controllers_1.HttpError(400, "Invalid email or password");
            const isPasswordValid = yield bcrypt_1.compare(body.password, user.password);
            if (!isPasswordValid)
                throw new routing_controllers_1.HttpError(400, "Invalid email or password");
            const returnedUser = lodash_1.default.pick(user, ["name", "email", "id", "isAdmin"]);
            response.setHeader("x-auth-token", jsonwebtoken_1.sign(returnedUser, process.env.JWT_PRIVATE_KEY));
            return returnedUser;
        });
    }
};
__decorate([
    routing_controllers_1.Get("/me"),
    __param(0, routing_controllers_1.CurrentUser({ required: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [User_1.User]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "currentUser", null);
__decorate([
    routing_controllers_1.Post(""),
    __param(0, routing_controllers_1.Body()), __param(1, routing_controllers_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [User_1.User, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
AuthController = __decorate([
    routing_controllers_1.JsonController("/auth")
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=AuthController.js.map