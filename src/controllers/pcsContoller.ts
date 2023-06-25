
import { Request, Response } from "express";
import { postPc, updatePc } from "../services/pcServices";
export const postPcController = async (req: Request, res: Response) => {
    const adedPc = await postPc(req.body);
    return res.status(200).json(adedPc);
}
export const updatePcController = async (req: Request, res: Response) => {
    const updatedPc = await updatePc(req.body);
    return res.status(200).json(updatedPc);
}