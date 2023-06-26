import { dataBase, farmers } from "..";
import { NotFound, WrongParams } from "../helpers/errors";
import { IData } from "../types";
export const postFarmer = async (body: IData) => {
    const { name, number } = body;
    if (!name && !number) throw new WrongParams('need body');
    const farmer = await dataBase.addData(body, farmers);
    return farmer;
}
export const getFarmers = async () => {
    const farmersData = await dataBase.getData(await farmers.getPath());
    return farmersData;
}
export const getFarmerById = async (id: string) => {
    const farmer = await dataBase.findById(id, farmers);
    if (!farmer) throw new NotFound('Data not found');
    return farmer;
}
export const updateFarmer = async (id: string, body: IData) => {
    const updatedFarmer = await dataBase.findByIdAndUpdate(id, body, farmers);
    if (!updatedFarmer) throw new NotFound('Data not found');
    return updatedFarmer;
}
export const removeFarmer = async (id: string) => {
    const removedFarmer = await dataBase.findByIdAndDelete(id, farmers);
    if (removedFarmer === 'Data not found') throw new NotFound('Data not found');
    return removedFarmer;
}