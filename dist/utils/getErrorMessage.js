"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getErrorMessage = (errors) => {
    return errors.map(e => Object.values(e.constraints)).join(",");
};
//# sourceMappingURL=getErrorMessage.js.map