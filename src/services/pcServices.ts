import { dataBase } from ".."
import { Section } from "../Database/Database"
import { IPc } from "../types";

export const pcs = new Section('/pcs.txt');
export const postPc = async (body: IPc) => {
    if (body !== null) {
        await dataBase.createSection(pcs);
        const adedData = await dataBase.addData(body, pcs);
        return adedData;
    } else {
        throw new Error('no body');
    }
}
export const updatePc = async (body: IPc) => {
    const updatedPc = dataBase.findByIdAndUpdate(body.id as string, body, pcs);
    return updatedPc;
}
export const removePc = async (id: string) => {
    const removePc = await dataBase.removeData(id, pcs);
    return removePc;
}