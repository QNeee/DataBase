import { Request, Response, NextFunction } from "express";
import { DataBaseProject } from "./errors";

export const asyncWrapper = (controller: (req: Request, res: Response) => Promise<object>) => {
    return (req: Request, res: Response, next: NextFunction) => {
        controller(req, res).catch(next);
    }
}

export const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
    if (error instanceof DataBaseProject) {
        return res.status(error.status).json({ message: error.message });
    }
    return res.status(500).json({ message: error.message });
}