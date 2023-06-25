import { dataBase } from "..";
import { Section } from "../Database/Database";
import { IData } from "../types";

export const farmers = new Section('/farmers.txt');
export const postFarmer = async (body: IData) => {
    const farmer = await dataBase.addData(body, farmers);
    return farmer;
}
// export const updateFarmer = async (id: string, body: IData) => {
//     const updatedFarmer = await dataBase.findByIdAndUpdate(id, body, farmers)
//     return updatedFarmer;
// }