"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.asyncWrapper = void 0;
const errors_1 = require("./errors");
const asyncWrapper = (controller) => {
    return (req, res, next) => {
        controller(req, res).catch(next);
    };
};
exports.asyncWrapper = asyncWrapper;
const errorHandler = (error, req, res, next) => {
    if (error instanceof errors_1.DataBaseProject) {
        return res.status(error.status).json({ message: error.message });
    }
    return res.status(500).json({ message: error.message });
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=apiHelper.js.map