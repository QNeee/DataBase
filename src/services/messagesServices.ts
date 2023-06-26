import { dataBase, msg } from "..";
import { IMessage } from "../types";

export const postMessage = async (body: IMessage) => {
    const message = await dataBase.addData(body, msg);
    return message;
}
export const removeMessage = async (id: string) => {
    const message = await dataBase.findByIdAndDelete(id, msg);
    return message;
}
export const updateMessasge = async (body: IMessage) => {
    const updatedMessage = await dataBase.findByIdAndUpdate(body.id as string, body, msg);
    return updatedMessage;
}