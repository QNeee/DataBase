"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMessageController = void 0;
const messagesServices_1 = require("../services/messagesServices");
const getMessageController = async (req, res) => {
    const messages = await (0, messagesServices_1.getMessages)();
    return res.status(200).json(messages);
};
exports.getMessageController = getMessageController;
//# sourceMappingURL=messagesController.js.map