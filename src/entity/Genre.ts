import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from "typeorm";
import { IsString, IsNotEmpty, Length } from "class-validator";
import { Movie } from "./Movie";

@Entity()
export class Genre {
  constructor(name: string) {
    this.name = name;
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  @IsString()
  @IsNotEmpty()
  @Length(4, 50)
  name: string;

  @OneToOne(() => Movie, m => m.genre, { cascade: true })
  movie: Movie;
}
