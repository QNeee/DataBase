
import { Request, Response } from "express";
import { postPc, removePc, updatePc } from "../services/pcServices";
export const postPcController = async (req: Request, res: Response) => {
    const adedPc = await postPc(req.body);
    return res.status(200).json(adedPc);
}
export const updatePcController = async (req: Request, res: Response) => {
    const updatedPc = await updatePc(req.body);
    return res.status(200).json(updatedPc);
}
export const removePcController = async (req: Request, res: Response) => {
    const removedPc = await removePc(req.body.id);
    return res.status(200).json(removedPc);
}