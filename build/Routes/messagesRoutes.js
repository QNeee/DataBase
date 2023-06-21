"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.messagesRoutes = void 0;
const express_1 = __importDefault(require("express"));
const apiHelper_1 = require("../helpers/apiHelper");
const messagesController_1 = require("../controllers/messagesController");
exports.messagesRoutes = express_1.default.Router();
exports.messagesRoutes.get('/', (0, apiHelper_1.asyncWrapper)(messagesController_1.getMessageController));
//# sourceMappingURL=messagesRoutes.js.map