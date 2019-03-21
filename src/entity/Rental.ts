import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  CreateDateColumn,
  UpdateDateColumn
} from "typeorm";
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

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

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
