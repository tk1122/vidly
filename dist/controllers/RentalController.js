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
const Rental_1 = require("../entity/Rental");
const Customer_1 = require("../entity/Customer");
const Movie_1 = require("../entity/Movie");
let RentalController = class RentalController {
    constructor() {
        this._rentalRepo = typeorm_1.getConnection().getRepository(Rental_1.Rental);
        this._customerRepo = typeorm_1.getConnection().getRepository(Customer_1.Customer);
        this._movieRepo = typeorm_1.getConnection().getRepository(Movie_1.Movie);
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return this._rentalRepo.find();
        });
    }
    getOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const rental = yield this._rentalRepo.findOne({ id: id });
            if (!rental)
                throw new routing_controllers_1.HttpError(404, "Rental not found");
            return rental;
        });
    }
    post(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const customer = yield this._customerRepo.findOne({ id: body.customerId });
            if (!customer)
                throw new routing_controllers_1.HttpError(400, "Customer Id not valid");
            const movie = yield this._movieRepo.findOne({ id: body.movieId });
            if (!movie)
                throw new routing_controllers_1.HttpError(400, "Movie Id not valid");
            const rental = new Rental_1.Rental(customer, movie, body.rentalFee);
            yield typeorm_1.getConnection().transaction((transactionManager) => __awaiter(this, void 0, void 0, function* () {
                const movieTransRepo = transactionManager.getRepository(Movie_1.Movie);
                const rentalTransRepo = transactionManager.getRepository(Rental_1.Rental);
                if (movie.numberInStock == 0)
                    throw new routing_controllers_1.HttpError(500, "Movie out of stock");
                movie.numberInStock--;
                yield movieTransRepo.save(movie);
                yield rentalTransRepo.save(rental);
            }));
            return rental;
        });
    }
    put(id, body) {
        return __awaiter(this, void 0, void 0, function* () {
            const rental = yield this._rentalRepo.findOne({ id: id });
            if (!rental)
                throw new routing_controllers_1.HttpError(404, "Rental not found");
            const customer = yield this._customerRepo.findOne({ id: body.customerId });
            if (!customer)
                throw new routing_controllers_1.HttpError(400, "Customer Id not valid");
            const movie = yield this._movieRepo.findOne({ id: body.movieId });
            if (!movie)
                throw new routing_controllers_1.HttpError(400, "Movie Id not valid");
            yield typeorm_1.getConnection().transaction((transactionManager) => __awaiter(this, void 0, void 0, function* () {
                const movieTransRepo = transactionManager.getRepository(Movie_1.Movie);
                const rentalTransRepo = transactionManager.getRepository(Rental_1.Rental);
                if (movie.numberInStock == 0)
                    throw new routing_controllers_1.HttpError(500, "Movie out of stock");
                movie.numberInStock--;
                rental.movie.numberInStock++;
                rental.customer = customer;
                rental.movie = movie;
                rental.rentalFee = body.rentalFee;
                yield movieTransRepo.save(movie);
                yield rentalTransRepo.save(rental);
            }));
            return rental;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const rental = yield this._rentalRepo.findOne({ id: id });
            if (!rental)
                throw new routing_controllers_1.HttpError(404, "Rental not found");
            const movie = yield this._movieRepo.findOne({ id: rental.movie.id });
            // return this._rentalRepo.remove(rental);
            yield typeorm_1.getConnection().transaction((transactionManager) => __awaiter(this, void 0, void 0, function* () {
                const movieTransRepo = transactionManager.getRepository(Movie_1.Movie);
                const rentalTransRepo = transactionManager.getRepository(Rental_1.Rental);
                movie.numberInStock++;
                yield movieTransRepo.save(movie);
                yield rentalTransRepo.save(rental);
            }));
            return rental;
        });
    }
};
__decorate([
    routing_controllers_1.Get(""),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RentalController.prototype, "getAll", null);
__decorate([
    routing_controllers_1.Get("/:id"),
    __param(0, routing_controllers_1.Param("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], RentalController.prototype, "getOne", null);
__decorate([
    routing_controllers_1.Post(""),
    routing_controllers_1.HttpCode(201),
    __param(0, routing_controllers_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RentalController.prototype, "post", null);
__decorate([
    routing_controllers_1.Put("/:id"),
    __param(0, routing_controllers_1.Param("id")), __param(1, routing_controllers_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], RentalController.prototype, "put", null);
__decorate([
    routing_controllers_1.Delete("/:id"),
    __param(0, routing_controllers_1.Param("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], RentalController.prototype, "delete", null);
RentalController = __decorate([
    routing_controllers_1.JsonController("/rentals")
], RentalController);
exports.RentalController = RentalController;
//# sourceMappingURL=RentalController.js.map