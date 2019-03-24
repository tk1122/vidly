"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = __importDefault(require("winston"));
exports.errorLogger = winston_1.default.createLogger({
    exceptionHandlers: [
        new winston_1.default.transports.File({
            filename: "errors.log",
            level: "error"
        }),
        new winston_1.default.transports.Console()
    ]
});
//# sourceMappingURL=errorLogger.js.map