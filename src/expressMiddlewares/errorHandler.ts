import { Request, Response } from "express";
import { errorLogger } from "../utils/errorLogger";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: (err?: any) => any
) => {
  errorLogger.error(err.message, err);

  return res.status(500).send({ message: "Something failed in server" });
};
