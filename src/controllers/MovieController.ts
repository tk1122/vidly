import {
  JsonController,
  Post,
  Body,
  HttpError,
  Get,
  Param,
  Put,
  Delete,
  HttpCode
} from "routing-controllers";
import { Movie } from "../entity/Movie";
import { getConnection } from "typeorm";
import { Genre } from "../entity/Genre";
import { validate } from "class-validator";
import { getErrorMessage } from "../utils/getErrorMessage";

interface IMovieBody extends Movie {
  genreId: number;
}

@JsonController("/movies")
export class MovieController {
  private readonly _genreRepo = getConnection().getRepository(Genre);
  private readonly _movieRepo = getConnection().getRepository(Movie);

  @Get("")
  async getAll() {
    return this._movieRepo.find();
  }

  @Get("/:id")
  async getOne(@Param("id") id: number) {
    const movie = await this._movieRepo.findOne({ id: id });
    if (!movie) throw new HttpError(404, "Movie not found");

    return movie;
  }

  @Post("")
  @HttpCode(201)
  async post(@Body() body: IMovieBody) {
    const genre = await this._genreRepo.findOne({ id: body.genreId });
    if (!genre) throw new HttpError(400, "Genre Id not valid");

    const movie = new Movie(
      body.name,
      genre,
      body.numberInStock,
      body.dailyRentalRate
    );
    const errors = await validate(movie);
    if (errors.length > 0) throw new HttpError(400, getErrorMessage(errors));

    return this._movieRepo.save(movie);
  }

  @Put("/:id")
  async put(@Param("id") id: number, @Body() body: IMovieBody) {
    const movie = await this._movieRepo.findOne({ id: id });
    if (!movie) throw new HttpError(404, "Movie not found");

    const genre = await this._genreRepo.findOne({ id: body.genreId });
    if (!genre) throw new HttpError(400, "Genre Id not valid");

    movie.genre = genre;
    movie.name = body.name;
    movie.numberInStock = body.numberInStock;
    movie.dailyRentalRate = body.dailyRentalRate;

    const errors = await validate(movie);
    if (errors.length > 0) throw new HttpError(400, getErrorMessage(errors));

    return this._movieRepo.save(movie);
  }

  @Delete("/:id")
  async delete(@Param("id") id: number) {
    const movie = await this._movieRepo.findOne({ id: id });
    if (!movie) throw new HttpError(404, "Movie not found");

    return this._movieRepo.remove(movie);
  }
}
