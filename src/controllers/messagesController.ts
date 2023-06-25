// import { Response, Request } from "http-proxy-middleware/dist/types"
// import { getMessages } from "../services/messagesServices"
// interface IIncomingMessage {
//     from: string,
//     to: string,
//     date: Date,
//     content: string
// }
// interface IOutgoingMessage {
//     from: string,
//     to: string,
//     date: Date,
//     content: string
//     answeredDate: Date,
//     speed: number
// }

// export const getMessageController = async (req: Request, res: Response) => {
//     const messages = await getMessages();
//     return res.status(200).json(messages)
// }
