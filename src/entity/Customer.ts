import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import {
  IsString,
  IsNotEmpty,
  Length,
  IsBoolean,
  IsOptional
} from "class-validator";
import { Rental } from "./Rental";

@Entity()
export class Customer {
  constructor(name: string, phone: string, isGold?: boolean) {
    this.name = name;
    this.phone = phone;
    this.isGold = isGold;
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  @IsString()
  @IsNotEmpty()
  @Length(4, 50)
  name: string;

  @Column({ length: 20 })
  @IsString()
  @IsNotEmpty()
  @Length(7, 20)
  phone: string;

  @Column({ default: false })
  @IsBoolean()
  @IsOptional()
  isGold?: boolean;

  @OneToMany(() => Rental, r => r.customer, {
    cascade: true
  })
  rentals: Rental[];
}
