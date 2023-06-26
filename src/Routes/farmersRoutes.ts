import express from 'express';
import { asyncWrapper } from '../helpers/apiHelper';
import { getFarmerByIdController, getFarmerController, postFarmerController, removeFarmerController, updateFarmerController } from '../controllers/farmersController';


export const farmersRoutes = express.Router();



farmersRoutes.post('/', asyncWrapper(postFarmerController));
farmersRoutes.get('/', asyncWrapper(getFarmerController));
farmersRoutes.get('/id/:id', asyncWrapper(getFarmerByIdController));
farmersRoutes.patch('/id/:id', asyncWrapper(updateFarmerController));
farmersRoutes.delete('/id/:id', asyncWrapper(removeFarmerController));