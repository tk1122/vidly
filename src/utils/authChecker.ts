import { AuthorizationChecker } from "routing-controllers/AuthorizationChecker";
import { Action } from "routing-controllers";
import { User } from "../entity/User";
import { CurrentUserChecker } from "routing-controllers/CurrentUserChecker";
import { verify } from "jsonwebtoken";

export const authorizationChecker: AuthorizationChecker = async (
  action: Action,
  roles: string[]
) => {
  const token: string = action.request.headers["x-auth-token"] || "";
  if (!token) return false;

  try {
    const user = (await verify(token, process.env.JWT_PRIVATE_KEY!)) as User;

    if (roles.includes("ADMIN")) {
      return user.isAdmin!;
    }

    return true;
  } catch {
    return false;
  }
};

export const currentUserChecker: CurrentUserChecker = async (
  action: Action
) => {
  const token: string = action.request.headers["x-auth-token"] || "";

  try {
    return verify(token, process.env.JWT_PRIVATE_KEY!);
  } catch {
    return null;
  }
};
