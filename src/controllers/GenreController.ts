import {
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  JsonController,
  HttpError,
  HttpCode,
  Authorized
} from "routing-controllers";
import { getConnection } from "typeorm";
import { validate } from "class-validator";
import { Genre } from "../entity/Genre";
import { getErrorMessage } from "../utils/getErrorMessage";

@JsonController("/genres")
@Authorized()
export class GenreController {
  private readonly _genreRepo = getConnection().getRepository(Genre);

  @Get("")
  async getAll() {
    return this._genreRepo.find();
  }

  @Get("/:id")
  async getOne(@Param("id") id: number) {
    const genre = await this._genreRepo.findOne({ id: id });
    if (!genre) throw new HttpError(404, "Genre not found");

    return genre;
  }

  @Post("")
  @HttpCode(201)
  async post(@Body() body: Genre) {
    const newGenre = new Genre(body.name);

    const errors = await validate(newGenre, {});
    if (errors.length > 0) {
      throw new HttpError(400, getErrorMessage(errors));
    }

    return this._genreRepo.save(newGenre);
  }

  @Put("/:id")
  async put(@Param("id") id: number, @Body() body: Genre) {
    const genre = await this._genreRepo.findOne({ id: id });
    if (!genre) throw new HttpError(404, "Genre not found");

    genre.name = body.name;
    const errors = await validate(genre);
    if (errors.length > 0) {
      throw new HttpError(400, getErrorMessage(errors));
    }

    return this._genreRepo.save(genre);
  }

  @Delete("/:id")
  @Authorized("ADMIN")
  async delete(@Param("id") id: number) {
    const genre = await this._genreRepo.findOne({ id: id });
    if (!genre) throw new HttpError(404, "Genre not found");

    return this._genreRepo.remove(genre);
  }
}
