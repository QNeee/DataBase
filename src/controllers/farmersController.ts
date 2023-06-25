import { Request, Response } from "http-proxy-middleware/dist/types";
import { postFarmer } from "../services/farmersService";


export const postFarmerController = async (req: Request, res: Response) => {
    const farmer = await postFarmer(req.body);
    return res.status(200).json(farmer);
}
// export const updateFarmerController = async (req: Request, res: Response) => {
//     const updatedFarmer = await updateFarmer(req.body.id, req.body);
//     return res.status(200).json(updatedFarmer);
// }