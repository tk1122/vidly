import { Entity, PrimaryGeneratedColumn, Column, Unique } from "typeorm";
import {
  IsString,
  IsNotEmpty,
  Length,
  IsEmail,
  IsAlphanumeric,
  IsDefined,
  IsBoolean,
  IsEmpty
} from "class-validator";

@Entity()
@Unique(["email"])
export class User {
  constructor(email: string, password: string, name?: string) {
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
  name?: string;

  @Column()
  @IsEmail()
  @IsDefined()
  email: string;

  @Column({ length: 100 })
  @IsDefined()
  @IsAlphanumeric()
  @Length(8, 50)
  password: string;

  @Column({ default: false })
  isAdmin: boolean;
}
