require("dotenv").config();

if (process.env.NODE_ENV === "production") {
  module.exports = {
    type: "postgres",
    url: process.env.DATABASE_URL,
    entities: ["dist/entity/**/*.js"],
    migrations: ["dist/migration/**/*.js"],
    subscribers: ["dist/subscriber/**/*.js"]
  };
} else {
  module.exports = {
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: process.env.DATABASE_PASSWORD,
    database: "vidly",
    synchronize: false,
    logging: false,
    entities: ["dist/entity/**/*.js"],
    migrations: ["dist/migration/**/*.js"],
    subscribers: ["dist/subscriber/**/*.js"],
    cli: {
      entitiesDir: "src/entity",
      migrationsDir: "src/migration",
      subscribersDir: "src/subscriber"
    }
  };
}
