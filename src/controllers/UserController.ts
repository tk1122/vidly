import {
  JsonController,
  Post,
  Body,
  HttpError,
  HttpCode
} from "routing-controllers";
import { User } from "../entity/User";
import { getConnection } from "typeorm";
import { validate } from "class-validator";
import { getErrorMessage } from "../utils/getErrorMessage";
import { genSalt, hash } from "bcrypt";
import _ from "lodash";

@JsonController("/users")
export class UserController {
  private readonly _userRepo = getConnection().getRepository(User);

  @Post("")
  @HttpCode(201)
  async post(@Body({ validate: true }) body: User) {
    let user = await this._userRepo.findOne({ email: body.email });
    if (user) throw new HttpError(400, "Email already used");

    user = new User(body.email, body.password, body.name);
    const errors = await validate(user);
    if (errors.length > 0) throw new HttpError(400, getErrorMessage(errors));

    const salt = await genSalt(10);
    const hashedPassword = await hash(body.password, salt);
    user.password = hashedPassword;

    await this._userRepo.save(user);
    return _.pick(user, ["name", "email"]);
  }
}
