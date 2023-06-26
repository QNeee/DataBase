import express from 'express';
import { asyncWrapper } from '../helpers/apiHelper';
import { getMessageByIdController, getMessagesController, postMessageController, removeMessageController, updateMessageController } from '../controllers/messagesController';


export const messagesRoutes = express.Router();


messagesRoutes.post('/', asyncWrapper(postMessageController));
messagesRoutes.get('/', asyncWrapper(getMessagesController));
messagesRoutes.get('/id/:id', asyncWrapper(getMessageByIdController));
messagesRoutes.patch('/id/:id', asyncWrapper(updateMessageController));
messagesRoutes.delete('/id/:id', asyncWrapper(removeMessageController));
