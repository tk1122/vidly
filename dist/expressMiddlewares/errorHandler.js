"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorLogger_1 = require("./errorLogger");
exports.errorHandler = (err, req, res, next) => {
    errorLogger_1.errorLogger.error(err.message, err);
    return res.status(500).send({ message: "Something failed in server" });
};
//# sourceMappingURL=errorHandler.js.map