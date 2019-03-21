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
const Movie_1 = require("./Movie");
let Genre = class Genre {
    constructor(name) {
        this.name = name;
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Genre.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ length: 50 }),
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.Length(4, 50),
    __metadata("design:type", String)
], Genre.prototype, "name", void 0);
__decorate([
    typeorm_1.OneToOne(() => Movie_1.Movie, m => m.genre, { cascade: true }),
    __metadata("design:type", Movie_1.Movie)
], Genre.prototype, "movie", void 0);
Genre = __decorate([
    typeorm_1.Entity(),
    __metadata("design:paramtypes", [String])
], Genre);
exports.Genre = Genre;
//# sourceMappingURL=Genre.js.map