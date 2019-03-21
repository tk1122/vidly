import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from "typeorm";
import { Customer } from "./Customer";
import { Movie } from "./Movie";
import { IsCurrency, IsDefined } from "class-validator";

@Entity()
export class Rental {
  constructor(customer: Customer, movie: Movie, rentalFee: string) {
    this.customer = customer;
    this.movie = movie;
    this.rentalFee = rentalFee;
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column("timestamptz", { default: () => "CURRENT_TIMESTAMP" })
  dateOut: Date;

  @Column()
  @IsDefined()
  @IsCurrency()
  rentalFee: string;

  @ManyToOne(() => Customer, c => c.rentals, {
    eager: true,
    onDelete: "CASCADE"
  })
  customer: Customer;

  @ManyToOne(() => Movie, m => m.rentals, { eager: true, onDelete: "CASCADE" })
  movie: Movie;
}
