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
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
const Genre_1 = require("./Genre");
const Rental_1 = require("./Rental");
let Movie = class Movie {
    constructor(name, genre, numberInStock, dailyRentalRate) {
        this.name = name;
        this.genre = genre;
        this.numberInStock = numberInStock;
        this.dailyRentalRate = dailyRentalRate;
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Movie.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ length: 100 }),
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], Movie.prototype, "name", void 0);
__decorate([
    typeorm_1.Column("smallint", { default: 10 }),
    typeorm_1.Check(`"numberInStock" >= 0`),
    class_validator_1.IsOptional(),
    class_validator_1.IsInt(),
    class_validator_1.Min(5),
    class_validator_1.Max(50),
    __metadata("design:type", Number)
], Movie.prototype, "numberInStock", void 0);
__decorate([
    typeorm_1.Column("double precision", { default: 0 }),
    class_validator_1.IsOptional(),
    class_validator_1.IsNumber(),
    class_validator_1.Min(0),
    class_validator_1.Max(10),
    __metadata("design:type", Number)
], Movie.prototype, "dailyRentalRate", void 0);
__decorate([
    typeorm_1.OneToOne(() => Genre_1.Genre, g => g.movie, { eager: true, onDelete: "CASCADE" }),
    typeorm_1.JoinColumn(),
    __metadata("design:type", Genre_1.Genre)
], Movie.prototype, "genre", void 0);
__decorate([
    typeorm_1.OneToMany(() => Rental_1.Rental, r => r.movie, { cascade: true }),
    __metadata("design:type", Array)
], Movie.prototype, "rentals", void 0);
Movie = __decorate([
    typeorm_1.Entity(),
    __metadata("design:paramtypes", [String, Genre_1.Genre, Number, Number])
], Movie);
exports.Movie = Movie;
//# sourceMappingURL=Movie.js.map