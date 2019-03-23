import dotenv from "dotenv";
import app from "./app";
import { errorLogger } from "./utils/errorLogger";

dotenv.config();

const PORT = process.env.SERVER_PORT;

// Error handling at Nodejs level
process.on("uncaughtException", ex => {
  errorLogger.error(ex.message, ex);
});
process.on("unhandledRejection", ex => {
  throw ex;
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
