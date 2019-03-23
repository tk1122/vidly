"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_winston_1 = require("express-winston");
const winston_1 = require("winston");
exports.loggingMiddleware = () => {
    return express_winston_1.logger({
        transports: [new winston_1.transports.File({ filename: "combined.log" })]
    });
};
//# sourceMappingURL=loggingMiddleware.js.map