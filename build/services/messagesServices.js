"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateMessasge = exports.removeMessage = exports.getMessageById = exports.getMessages = exports.postMessage = void 0;
const __1 = require("..");
const errors_1 = require("../helpers/errors");
const postMessage = async (body) => {
    const { from, to, date, content } = body;
    if (!from && !to && !date && !content)
        throw new errors_1.WrongParams('need body');
    const message = await __1.dataBase.addData(body, __1.msg);
    return message;
};
exports.postMessage = postMessage;
const getMessages = async () => {
    const messages = await __1.dataBase.getData(await __1.msg.getPath());
    return messages;
};
exports.getMessages = getMessages;
const getMessageById = async (id) => {
    const message = await __1.dataBase.findById(id, __1.msg);
    if (!message)
        throw new errors_1.NotFound('Data not found');
    return message;
};
exports.getMessageById = getMessageById;
const removeMessage = async (id) => {
    const message = await __1.dataBase.findByIdAndDelete(id, __1.msg);
    if (message === 'Data not found')
        throw new errors_1.NotFound('Data not found');
    return message;
};
exports.removeMessage = removeMessage;
const updateMessasge = async (id, body) => {
    const updatedMessage = await __1.dataBase.findByIdAndUpdate(id, body, __1.msg);
    if (!updatedMessage)
        throw new errors_1.NotFound('Data not found');
    return updatedMessage;
};
exports.updateMessasge = updateMessasge;
//# sourceMappingURL=messagesServices.js.map