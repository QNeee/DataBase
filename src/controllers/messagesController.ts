import { Request, Response } from "http-proxy-middleware/dist/types";
import { postMessage, removeMessage, updateMessasge } from "../services/messagesServices";

export const postMessageController = async (req: Request, res: Response) => {
    const message = await postMessage(req.body);
    return res.status(200).json(message);
}
export const removeMessageController = async (req: Request, res: Response) => {
    const message = await removeMessage(req.body.id);
    return res.status(200).json(message);
}
export const updateMessageController = async (req: Request, res: Response) => {
    const updatedMessage = await updateMessasge(req.body);
    return res.status(200).json(updatedMessage);
}