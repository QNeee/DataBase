"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateMessasge = exports.removeMessage = exports.postMessage = void 0;
const __1 = require("..");
const postMessage = async (body) => {
    const message = await __1.dataBase.addData(body, __1.msg);
    return message;
};
exports.postMessage = postMessage;
const removeMessage = async (id) => {
    const message = await __1.dataBase.findByIdAndDelete(id, __1.msg);
    return message;
};
exports.removeMessage = removeMessage;
const updateMessasge = async (body) => {
    const updatedMessage = await __1.dataBase.findByIdAndUpdate(body.id, body, __1.msg);
    return updatedMessage;
};
exports.updateMessasge = updateMessasge;
//# sourceMappingURL=messagesServices.js.map