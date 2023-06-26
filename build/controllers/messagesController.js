"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateMessageController = exports.removeMessageController = exports.postMessageController = void 0;
const messagesServices_1 = require("../services/messagesServices");
const postMessageController = async (req, res) => {
    const message = await (0, messagesServices_1.postMessage)(req.body);
    return res.status(200).json(message);
};
exports.postMessageController = postMessageController;
const removeMessageController = async (req, res) => {
    const message = await (0, messagesServices_1.removeMessage)(req.body.id);
    return res.status(200).json(message);
};
exports.removeMessageController = removeMessageController;
const updateMessageController = async (req, res) => {
    const updatedMessage = await (0, messagesServices_1.updateMessasge)(req.body);
    return res.status(200).json(updatedMessage);
};
exports.updateMessageController = updateMessageController;
//# sourceMappingURL=messagesController.js.map