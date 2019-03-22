import {
  JsonController,
  Post,
  Body,
  HttpError,
  Res,
  Get,
  CurrentUser
} from "routing-controllers";
import { getConnection } from "typeorm";
import { User } from "../entity/User";
import { validate } from "class-validator";
import { getErrorMessage } from "../utils/getErrorMessage";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { Response } from "express-serve-static-core";
import _ from "lodash";

@JsonController("/auth")
export class AuthController {
  private readonly _userRepo = getConnection().getRepository(User);

  @Get("/me")
  async currentUser(@CurrentUser({ required: true }) user: User) {
    return user;
  }

  @Post("")
  async login(@Body() body: User, @Res() response: Response) {
    const errors = await validate(new User(body.email, body.password), {
      skipMissingProperties: true
    });
    if (errors.length > 0) throw new HttpError(400, getErrorMessage(errors));

    const user = await this._userRepo.findOne({ email: body.email });
    if (!user) throw new HttpError(400, "Invalid email or password");

    const isPasswordValid = await compare(body.password, user.password);
    if (!isPasswordValid) throw new HttpError(400, "Invalid email or password");

    const returnedUser = _.pick(user, ["name", "email", "id", "isAdmin"]);
    response.setHeader(
      "x-auth-token",
      sign(returnedUser, process.env.JWT_PRIVATE_KEY!)
    );
    return returnedUser;
  }
}
