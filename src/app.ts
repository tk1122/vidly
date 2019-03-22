import "reflect-metadata";
import { createConnection, getConnection } from "typeorm";
import express from "express";
import { json, urlencoded } from "body-parser";
import { useExpressServer, Action } from "routing-controllers";
import { verify } from "jsonwebtoken";
import { User } from "./entity/User";

const app = express();

app.use(json());
app.use(urlencoded({ extended: true }));

createConnection()
  .then(async () => {
    useExpressServer(app, {
      development: false,
      routePrefix: "/api",
      controllers: [__dirname + "/controllers/**/*.js"],
      authorizationChecker: async (action: Action, roles: string[]) => {
        const token: string = action.request.headers["x-auth-token"] || "";
        if (!token) return false;

        try {
          const user = (await verify(
            token,
            process.env.JWT_PRIVATE_KEY!
          )) as User;

          if (roles.includes("ADMIN")) {
            return user.isAdmin!;
          }

          return true;
        } catch {
          return false;
        }
      },
      currentUserChecker: async (action: Action) => {
        const token: string = action.request.headers["x-auth-token"] || "";

        try {
          return verify(token, process.env.JWT_PRIVATE_KEY!);
        } catch {
          return null;
        }
      }
    });
  })
  .catch(error => console.log(error));

export default app;
