import { logger } from "express-winston";
import { transports } from "winston";

export const loggingMiddleware = () => {
  return logger({
    transports: [new transports.File({ filename: "combined.log" })]
  });
};
