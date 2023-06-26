
import { Request, Response } from "express";
import { getPc, getPcById, postPc, removePc, updatePc } from "../services/pcServices";
export const postPcController = async (req: Request, res: Response) => {
    const adedPc = await postPc(req.body);
    return res.status(200).json(adedPc);
}
export const getPcsController = async (req: Request, res: Response) => {
    const pcsData = await getPc();
    return res.status(200).json(pcsData);
}
export const updatePcController = async (req: Request, res: Response) => {
    const { id } = req.params;
    const updatedPc = await updatePc(id, req.body);
    return res.status(200).json(updatedPc);
}
export const getPcByIdController = async (req: Request, res: Response) => {
    const { id } = req.params;
    const pc = await getPcById(id);
    return res.status(200).json(pc);
}
export const removePcController = async (req: Request, res: Response) => {
    const { id } = req.params;
    const removedPc = await removePc(id);
    return res.status(200).json(removedPc);
}