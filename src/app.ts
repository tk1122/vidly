import "reflect-metadata";
import { createConnection } from "typeorm";
import express from "express";
import { json, urlencoded } from "body-parser";
import { useExpressServer } from "routing-controllers";
import { GenreController } from "./controllers/GenreController";
import { CustomerController } from "./controllers/CustomerController";
import { MovieController } from "./controllers/MovieController";
import { RentalController } from "./controllers/RentalController";

const app = express();

app.use(json());
app.use(urlencoded({ extended: true }));

createConnection()
  .then(async () => {
    useExpressServer(app, {
      development: false,
      routePrefix: "/api",
      controllers: [
        GenreController,
        MovieController,
        CustomerController,
        RentalController
      ]
    });
  })
  .catch(error => console.log(error));

export default app;
