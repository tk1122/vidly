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
const Movie_1 = require("../entity/Movie");
const typeorm_1 = require("typeorm");
const Genre_1 = require("../entity/Genre");
const class_validator_1 = require("class-validator");
const getErrorMessage_1 = require("../utils/getErrorMessage");
let MovieController = class MovieController {
    constructor() {
        this._genreRepo = typeorm_1.getConnection().getRepository(Genre_1.Genre);
        this._movieRepo = typeorm_1.getConnection().getRepository(Movie_1.Movie);
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return this._movieRepo.find();
        });
    }
    getOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const movie = yield this._movieRepo.findOne({ id: id });
            if (!movie)
                throw new routing_controllers_1.HttpError(404, "Movie not found");
            return movie;
        });
    }
    post(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const genre = yield this._genreRepo.findOne({ id: body.genreId });
            if (!genre)
                throw new routing_controllers_1.HttpError(400, "Genre Id not valid");
            const movie = new Movie_1.Movie(body.name, genre, body.numberInStock, body.dailyRentalRate);
            const errors = yield class_validator_1.validate(movie);
            if (errors.length > 0)
                throw new routing_controllers_1.HttpError(400, getErrorMessage_1.getErrorMessage(errors));
            return this._movieRepo.save(movie);
        });
    }
    put(id, body) {
        return __awaiter(this, void 0, void 0, function* () {
            const movie = yield this._movieRepo.findOne({ id: id });
            if (!movie)
                throw new routing_controllers_1.HttpError(404, "Movie not found");
            const genre = yield this._genreRepo.findOne({ id: body.genreId });
            if (!genre)
                throw new routing_controllers_1.HttpError(400, "Genre Id not valid");
            movie.genre = genre;
            movie.name = body.name;
            movie.numberInStock = body.numberInStock;
            movie.dailyRentalRate = body.dailyRentalRate;
            const errors = yield class_validator_1.validate(movie);
            if (errors.length > 0)
                throw new routing_controllers_1.HttpError(400, getErrorMessage_1.getErrorMessage(errors));
            return this._movieRepo.save(movie);
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const movie = yield this._movieRepo.findOne({ id: id });
            if (!movie)
                throw new routing_controllers_1.HttpError(404, "Movie not found");
            return this._movieRepo.remove(movie);
        });
    }
};
__decorate([
    routing_controllers_1.Get(""),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MovieController.prototype, "getAll", null);
__decorate([
    routing_controllers_1.Get("/:id"),
    __param(0, routing_controllers_1.Param("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], MovieController.prototype, "getOne", null);
__decorate([
    routing_controllers_1.Post(""),
    routing_controllers_1.HttpCode(201),
    __param(0, routing_controllers_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MovieController.prototype, "post", null);
__decorate([
    routing_controllers_1.Put("/:id"),
    __param(0, routing_controllers_1.Param("id")), __param(1, routing_controllers_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], MovieController.prototype, "put", null);
__decorate([
    routing_controllers_1.Delete("/:id"),
    routing_controllers_1.Authorized("ADMIN"),
    __param(0, routing_controllers_1.Param("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], MovieController.prototype, "delete", null);
MovieController = __decorate([
    routing_controllers_1.JsonController("/movies"),
    routing_controllers_1.Authorized()
], MovieController);
exports.MovieController = MovieController;
//# sourceMappingURL=MovieController.js.map