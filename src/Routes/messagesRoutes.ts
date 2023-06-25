import express from 'express';
import { asyncWrapper } from '../helpers/apiHelper'
import { getMessageController } from '../controllers/messagesController';


export const messagesRoutes = express.Router();

messagesRoutes.get('/', asyncWrapper(getMessageController));
