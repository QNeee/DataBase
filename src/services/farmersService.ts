import { dataBase } from "..";
import { Section } from "../Database/Database";
import { IFarmer } from "../types";

export const farmers = new Section('/farmers.txt');
export const postFarmer = async (body: IFarmer) => {
    const farmer = await dataBase.addData(body, farmers);
    return farmer;
}
export const updateFarmer = async (id: string, body: IFarmer) => {
    const updatedFarmer = await dataBase.findByIdAndUpdate(id, body, farmers)
    return updatedFarmer;
}