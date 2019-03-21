import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  OneToMany,
  Check,
  AfterInsert
} from "typeorm";
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsInt,
  Min,
  Max,
  IsOptional,
  IsPositive
} from "class-validator";
import { Genre } from "./Genre";
import { Rental } from "./Rental";

@Entity()
export class Movie {
  constructor(
    name: string,
    genre: Genre,
    numberInStock?: number,
    dailyRentalRate?: number
  ) {
    this.name = name;
    this.genre = genre;
    this.numberInStock = numberInStock;
    this.dailyRentalRate = dailyRentalRate;
  }

  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 100 })
  @IsString()
  @IsNotEmpty()
  name: string;

  @Column("smallint", { default: 10 })
  @Check(`"numberInStock" >= 0`)
  @IsOptional()
  @IsInt()
  @Min(5)
  @Max(50)
  numberInStock?: number;

  @Column("double precision", { default: 0 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(10)
  dailyRentalRate?: number;

  @OneToOne(() => Genre, g => g.movie, { eager: true, onDelete: "CASCADE" })
  @JoinColumn()
  genre: Genre;

  @OneToMany(() => Rental, r => r.movie, { cascade: true })
  rentals: Rental[];
}
