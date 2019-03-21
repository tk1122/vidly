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
import { getConnection } from "typeorm";
import { Rental } from "../entity/Rental";
import { Customer } from "../entity/Customer";
import { Movie } from "../entity/Movie";

interface IRentalBody extends Rental {
  customerId: number;
  movieId: number;
}

@JsonController("/rentals")
export class RentalController {
  private readonly _rentalRepo = getConnection().getRepository(Rental);
  private readonly _customerRepo = getConnection().getRepository(Customer);
  private readonly _movieRepo = getConnection().getRepository(Movie);

  @Get("")
  async getAll() {
    return this._rentalRepo.find();
  }

  @Get("/:id")
  async getOne(@Param("id") id: number) {
    const rental = await this._rentalRepo.findOne({ id: id });
    if (!rental) throw new HttpError(404, "Rental not found");

    return rental;
  }

  @Post("")
  @HttpCode(201)
  async post(@Body() body: IRentalBody) {
    const customer = await this._customerRepo.findOne({ id: body.customerId });
    if (!customer) throw new HttpError(400, "Customer Id not valid");

    const movie = await this._movieRepo.findOne({ id: body.movieId });
    if (!movie) throw new HttpError(400, "Movie Id not valid");

    const rental = new Rental(customer, movie, body.rentalFee);

    await getConnection().transaction(async transactionManager => {
      const movieTransRepo = transactionManager.getRepository(Movie);
      const rentalTransRepo = transactionManager.getRepository(Rental);

      if (movie.numberInStock == 0)
        throw new HttpError(500, "Movie out of stock");

      movie.numberInStock!--;
      await movieTransRepo.save(movie);
      await rentalTransRepo.save(rental);
    });

    return rental;
  }

  @Put("/:id")
  async put(@Param("id") id: number, @Body() body: IRentalBody) {
    const rental = await this._rentalRepo.findOne({ id: id });
    if (!rental) throw new HttpError(404, "Rental not found");

    const customer = await this._customerRepo.findOne({ id: body.customerId });
    if (!customer) throw new HttpError(400, "Customer Id not valid");

    const movie = await this._movieRepo.findOne({ id: body.movieId });
    if (!movie) throw new HttpError(400, "Movie Id not valid");

    await getConnection().transaction(async transactionManager => {
      const movieTransRepo = transactionManager.getRepository(Movie);
      const rentalTransRepo = transactionManager.getRepository(Rental);

      if (movie.numberInStock == 0)
        throw new HttpError(500, "Movie out of stock");
      movie.numberInStock!--;

      rental!.movie!.numberInStock!++;
      rental.customer = customer;
      rental.movie = movie;
      rental.rentalFee = body.rentalFee;

      await movieTransRepo.save(movie);
      await rentalTransRepo.save(rental);
    });

    return rental;
  }

  @Delete("/:id")
  async delete(@Param("id") id: number) {
    const rental = await this._rentalRepo.findOne({ id: id });
    if (!rental) throw new HttpError(404, "Rental not found");
    const movie = await this._movieRepo.findOne({ id: rental.movie.id });

    // return this._rentalRepo.remove(rental);
    await getConnection().transaction(async transactionManager => {
      const movieTransRepo = transactionManager.getRepository(Movie);
      const rentalTransRepo = transactionManager.getRepository(Rental);

      movie!.numberInStock!++;
      await movieTransRepo.save(movie!);
      await rentalTransRepo.save(rental);
    });

    return rental;
  }
}
