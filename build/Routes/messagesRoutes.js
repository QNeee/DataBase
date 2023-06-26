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
exports.messagesRoutes.post('/', (0, apiHelper_1.asyncWrapper)(messagesController_1.postMessageController));
exports.messagesRoutes.get('/', (0, apiHelper_1.asyncWrapper)(messagesController_1.getMessagesController));
exports.messagesRoutes.get('/id/:id', (0, apiHelper_1.asyncWrapper)(messagesController_1.getMessageByIdController));
exports.messagesRoutes.patch('/id/:id', (0, apiHelper_1.asyncWrapper)(messagesController_1.updateMessageController));
exports.messagesRoutes.delete('/id/:id', (0, apiHelper_1.asyncWrapper)(messagesController_1.removeMessageController));
//# sourceMappingURL=messagesRoutes.js.map