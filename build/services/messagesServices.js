"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMessages = void 0;
const __1 = require("..");
const getMessages = async () => {
    const messages = await __1.dataBase.getData();
    return messages;
};
exports.getMessages = getMessages;
//# sourceMappingURL=messagesServices.js.map