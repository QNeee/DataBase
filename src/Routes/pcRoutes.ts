import express from 'express';
import { asyncWrapper } from '../helpers/apiHelper';
import { getPcByIdController, getPcsController, postPcController, removePcController, updatePcController } from '../controllers/pcsContoller';



export const pcRoutes = express.Router();

pcRoutes.post('/', asyncWrapper(postPcController));
pcRoutes.get('/', asyncWrapper(getPcsController));
pcRoutes.get('/id/:id', asyncWrapper(getPcByIdController));
pcRoutes.patch('/id/:id', asyncWrapper(updatePcController));
pcRoutes.delete('/id/:id', asyncWrapper(removePcController));