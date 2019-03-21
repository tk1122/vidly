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
const Customer_1 = require("./Customer");
const Movie_1 = require("./Movie");
const class_validator_1 = require("class-validator");
let Rental = class Rental {
    constructor(customer, movie, rentalFee) {
        this.customer = customer;
        this.movie = movie;
        this.rentalFee = rentalFee;
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Rental.prototype, "id", void 0);
__decorate([
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], Rental.prototype, "createdDate", void 0);
__decorate([
    typeorm_1.UpdateDateColumn(),
    __metadata("design:type", Date)
], Rental.prototype, "updatedDate", void 0);
__decorate([
    typeorm_1.Column(),
    class_validator_1.IsDefined(),
    class_validator_1.IsCurrency(),
    __metadata("design:type", String)
], Rental.prototype, "rentalFee", void 0);
__decorate([
    typeorm_1.ManyToOne(() => Customer_1.Customer, c => c.rentals, {
        eager: true,
        onDelete: "CASCADE"
    }),
    __metadata("design:type", Customer_1.Customer)
], Rental.prototype, "customer", void 0);
__decorate([
    typeorm_1.ManyToOne(() => Movie_1.Movie, m => m.rentals, { eager: true, onDelete: "CASCADE" }),
    __metadata("design:type", Movie_1.Movie)
], Rental.prototype, "movie", void 0);
Rental = __decorate([
    typeorm_1.Entity(),
    __metadata("design:paramtypes", [Customer_1.Customer, Movie_1.Movie, String])
], Rental);
exports.Rental = Rental;
//# sourceMappingURL=Rental.js.map