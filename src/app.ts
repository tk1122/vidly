import "reflect-metadata";
import { createConnection } from "typeorm";
import express from "express";
import { json, urlencoded } from "body-parser";
import { useExpressServer } from "routing-controllers";
import { authorizationChecker, currentUserChecker } from "./utils/authChecker";
import { errorHandler } from "./expressMiddlewares/errorHandler";
import { loggingMiddleware } from "./expressMiddlewares/loggingMiddleware";

const app = express();

app.use(json());
app.use(urlencoded({ extended: true }));

app.use(loggingMiddleware());

createConnection().then(async () => {
  useExpressServer(app, {
    development: false,
    routePrefix: "/api",
    controllers: [__dirname + "/controllers/**/*.js"],
    authorizationChecker,
    currentUserChecker
  });
});

app.use(errorHandler);

export default app;
