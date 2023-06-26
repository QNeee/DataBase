"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateMessageController = exports.removeMessageController = exports.getMessageByIdController = exports.getMessagesController = exports.postMessageController = void 0;
const messagesServices_1 = require("../services/messagesServices");
const postMessageController = async (req, res) => {
    const message = await (0, messagesServices_1.postMessage)(req.body);
    return res.status(201).json(message);
};
exports.postMessageController = postMessageController;
const getMessagesController = async (req, res) => {
    const messages = await (0, messagesServices_1.getMessages)();
    return res.status(200).json(messages);
};
exports.getMessagesController = getMessagesController;
const getMessageByIdController = async (req, res) => {
    const { id } = req.params;
    const message = await (0, messagesServices_1.getMessageById)(id);
    return res.status(200).json(message);
};
exports.getMessageByIdController = getMessageByIdController;
const removeMessageController = async (req, res) => {
    const { id } = req.params;
    const message = await (0, messagesServices_1.removeMessage)(id);
    return res.status(200).json(message);
};
exports.removeMessageController = removeMessageController;
const updateMessageController = async (req, res) => {
    const { id } = req.params;
    const updatedMessage = await (0, messagesServices_1.updateMessasge)(id, req.body);
    return res.status(200).json(updatedMessage);
};
exports.updateMessageController = updateMessageController;
//# sourceMappingURL=messagesController.js.map