import winston from "winston";

export const errorLogger = winston.createLogger({
  exceptionHandlers: [
    new winston.transports.File({
      filename: "errors.log",
      level: "error"
    }),
    new winston.transports.Console()
  ]
});
