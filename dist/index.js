"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const app_1 = __importDefault(require("./app"));
const errorLogger_1 = require("./utils/errorLogger");
dotenv_1.default.config();
const PORT = process.env.PORT;
// Error handling at Nodejs level
process.on("uncaughtException", ex => {
    errorLogger_1.errorLogger.error(ex.message, ex);
});
process.on("unhandledRejection", ex => {
    throw ex;
});
app_1.default.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
//# sourceMappingURL=index.js.map