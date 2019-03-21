import { Entity, PrimaryGeneratedColumn, Column, Unique } from "typeorm";
import {
  IsString,
  IsNotEmpty,
  Length,
  IsEmail,
  IsAlphanumeric
} from "class-validator";

@Entity()
@Unique(["email"])
export class User {
  constructor(name: string, email: string, password: string) {
    this.name = name;
    this.email = email;
    this.password = password;
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  @IsString()
  @IsNotEmpty()
  @Length(5, 50)
  name: string;

  @Column()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Column({ length: 50 })
  @IsString()
  @IsAlphanumeric()
  @Length(8, 50)
  password: string;
}
