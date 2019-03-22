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
const User_1 = require("../entity/User");
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
const getErrorMessage_1 = require("../utils/getErrorMessage");
const bcrypt_1 = require("bcrypt");
const lodash_1 = __importDefault(require("lodash"));
let UserController = class UserController {
    constructor() {
        this._userRepo = typeorm_1.getConnection().getRepository(User_1.User);
    }
    post(body) {
        return __awaiter(this, void 0, void 0, function* () {
            let user = yield this._userRepo.findOne({ email: body.email });
            if (user)
                throw new routing_controllers_1.HttpError(400, "Email already used");
            user = new User_1.User(body.email, body.password, body.name);
            const errors = yield class_validator_1.validate(user);
            if (errors.length > 0)
                throw new routing_controllers_1.HttpError(400, getErrorMessage_1.getErrorMessage(errors));
            const salt = yield bcrypt_1.genSalt(10);
            const hashedPassword = yield bcrypt_1.hash(body.password, salt);
            user.password = hashedPassword;
            yield this._userRepo.save(user);
            return lodash_1.default.pick(user, ["name", "email"]);
        });
    }
};
__decorate([
    routing_controllers_1.Post(""),
    routing_controllers_1.HttpCode(201),
    __param(0, routing_controllers_1.Body({ validate: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [User_1.User]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "post", null);
UserController = __decorate([
    routing_controllers_1.JsonController("/users")
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=UserController.js.map