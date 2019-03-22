import {
  JsonController,
  Get,
  HttpCode,
  Param,
  HttpError,
  Post,
  Body,
  Put,
  Delete,
  Authorized
} from "routing-controllers";
import { getConnection } from "typeorm";
import { Customer } from "../entity/Customer";
import { validate } from "class-validator";
import { getErrorMessage } from "../utils/getErrorMessage";

@JsonController("/customers")
@Authorized()
export class CustomerController {
  private readonly _customerRepo = getConnection().getRepository(Customer);

  @Get("")
  async getAll() {
    return this._customerRepo.find();
  }

  @Get("/:id")
  async getOne(@Param("id") id: number) {
    const genre = await this._customerRepo.findOne({ id: id });
    if (!genre) throw new HttpError(404, "Customer not found");

    return genre;
  }

  @Post("")
  @HttpCode(201)
  async post(@Body() body: Customer) {
    const newCustomer = new Customer(body.name, body.phone, body.isGold);

    const errors = await validate(newCustomer);
    if (errors.length > 0) throw new HttpError(400, getErrorMessage(errors));

    return this._customerRepo.save(newCustomer);
  }

  @Put("/:id")
  async put(@Param("id") id: number, @Body() body: Customer) {
    const customer = await this._customerRepo.findOne({ id: id });
    if (!customer) throw new HttpError(404, "Customer not found");

    customer.name = body.name;
    customer.phone = body.phone;
    customer.isGold = body.isGold;

    const errors = await validate(customer);
    if (errors.length > 0) throw new HttpError(400, getErrorMessage(errors));

    return this._customerRepo.save(customer);
  }

  @Delete("/:id")
  @Authorized("ADMIN")
  async delete(@Param("id") id: number) {
    const genre = await this._customerRepo.findOne({ id: id });
    if (!genre) throw new HttpError(404, "Customer not found");

    return this._customerRepo.remove(genre);
  }
}
