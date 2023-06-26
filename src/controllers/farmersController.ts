import { Request, Response } from "http-proxy-middleware/dist/types";
import { getFarmerById, getFarmers, postFarmer, removeFarmer, updateFarmer } from "../services/farmersService";


export const postFarmerController = async (req: Request, res: Response) => {
    const farmer = await postFarmer(req.body);
    return res.status(201).json(farmer);
}
export const getFarmerController = async (req: Request, res: Response) => {
    const farmersData = await getFarmers();
    return res.status(200).json(farmersData);
}
export const updateFarmerController = async (req: Request, res: Response) => {
    const { id } = req.params;
    const updatedFarmer = await updateFarmer(id, req.body);
    return res.status(200).json(updatedFarmer);
}
export const getFarmerByIdController = async (req: Request, res: Response) => {
    const { id } = req.params;
    const farmer = await getFarmerById(id);
    return res.status(200).json(farmer);
}
export const removeFarmerController = async (req: Request, res: Response) => {
    const { id } = req.params;
    const removedFarmer = await removeFarmer(id);
    return res.status(200).json(removedFarmer);
}