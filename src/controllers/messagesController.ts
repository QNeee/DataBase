import { Request, Response } from "http-proxy-middleware/dist/types";
import { getMessageById, getMessages, postMessage, removeMessage, updateMessasge } from "../services/messagesServices";

export const postMessageController = async (req: Request, res: Response) => {
    const message = await postMessage(req.body);
    return res.status(201).json(message);
}
export const getMessagesController = async (req: Request, res: Response) => {
    const messages = await getMessages();
    return res.status(200).json(messages);
}
export const getMessageByIdController = async (req: Request, res: Response) => {
    const { id } = req.params;
    const message = await getMessageById(id);
    return res.status(200).json(message);
}
export const removeMessageController = async (req: Request, res: Response) => {
    const { id } = req.params;
    const message = await removeMessage(id);
    return res.status(200).json(message);
}
export const updateMessageController = async (req: Request, res: Response) => {
    const { id } = req.params;
    const updatedMessage = await updateMessasge(id, req.body);
    return res.status(200).json(updatedMessage);
}