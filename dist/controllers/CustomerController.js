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
Object.defineProperty(exports, "__esModule", { value: true });
const routing_controllers_1 = require("routing-controllers");
const typeorm_1 = require("typeorm");
const Customer_1 = require("../entity/Customer");
const class_validator_1 = require("class-validator");
const getErrorMessage_1 = require("../utils/getErrorMessage");
let CustomerController = class CustomerController {
    constructor() {
        this._customerRepo = typeorm_1.getConnection().getRepository(Customer_1.Customer);
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return this._customerRepo.find();
        });
    }
    getOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const genre = yield this._customerRepo.findOne({ id: id });
            if (!genre)
                throw new routing_controllers_1.HttpError(404, "Customer not found");
            return genre;
        });
    }
    post(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const newCustomer = new Customer_1.Customer(body.name, body.phone, body.isGold);
            const errors = yield class_validator_1.validate(newCustomer);
            if (errors.length > 0)
                throw new routing_controllers_1.HttpError(400, getErrorMessage_1.getErrorMessage(errors));
            return this._customerRepo.save(newCustomer);
        });
    }
    put(id, body) {
        return __awaiter(this, void 0, void 0, function* () {
            const customer = yield this._customerRepo.findOne({ id: id });
            if (!customer)
                throw new routing_controllers_1.HttpError(404, "Customer not found");
            customer.name = body.name;
            customer.phone = body.phone;
            customer.isGold = body.isGold;
            const errors = yield class_validator_1.validate(customer);
            if (errors.length > 0)
                throw new routing_controllers_1.HttpError(400, getErrorMessage_1.getErrorMessage(errors));
            return this._customerRepo.save(customer);
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const genre = yield this._customerRepo.findOne({ id: id });
            if (!genre)
                throw new routing_controllers_1.HttpError(404, "Customer not found");
            return this._customerRepo.remove(genre);
        });
    }
};
__decorate([
    routing_controllers_1.Get(""),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CustomerController.prototype, "getAll", null);
__decorate([
    routing_controllers_1.Get("/:id"),
    __param(0, routing_controllers_1.Param("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CustomerController.prototype, "getOne", null);
__decorate([
    routing_controllers_1.Post(""),
    routing_controllers_1.HttpCode(201),
    __param(0, routing_controllers_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Customer_1.Customer]),
    __metadata("design:returntype", Promise)
], CustomerController.prototype, "post", null);
__decorate([
    routing_controllers_1.Put("/:id"),
    __param(0, routing_controllers_1.Param("id")), __param(1, routing_controllers_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Customer_1.Customer]),
    __metadata("design:returntype", Promise)
], CustomerController.prototype, "put", null);
__decorate([
    routing_controllers_1.Delete("/:id"),
    routing_controllers_1.Authorized("ADMIN"),
    __param(0, routing_controllers_1.Param("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CustomerController.prototype, "delete", null);
CustomerController = __decorate([
    routing_controllers_1.JsonController("/customers"),
    routing_controllers_1.Authorized()
], CustomerController);
exports.CustomerController = CustomerController;
//# sourceMappingURL=CustomerController.js.map