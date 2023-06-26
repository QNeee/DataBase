import { dataBase, msg } from "..";
import { NotFound, WrongParams } from "../helpers/errors";
import { IMessage } from "../types";

export const postMessage = async (body: IMessage) => {
    const { from, to, date, content } = body;
    if (!from && !to && !date && !content) throw new WrongParams('need body');
    const message = await dataBase.addData(body, msg);
    return message;
}
export const getMessages = async () => {
    const messages = await dataBase.getData(await msg.getPath());
    return messages;
}
export const getMessageById = async (id: string) => {
    const message = await dataBase.findById(id, msg);
    if (!message) throw new NotFound('Data not found');
    return message;
}
export const removeMessage = async (id: string) => {
    const message = await dataBase.findByIdAndDelete(id, msg);
    if (message === 'Data not found') throw new NotFound('Data not found');
    return message;
}
export const updateMessasge = async (id: string, body: IMessage) => {
    const updatedMessage = await dataBase.findByIdAndUpdate(id, body, msg);
    if (!updatedMessage) throw new NotFound('Data not found');
    return updatedMessage;
}