import { dataBase } from ".."
import { Section } from "../Database/Database"
import { IData } from "../types";

export const pcs = new Section('/pcs.txt');
export const postPc = async (body: IData) => {
    if (body !== null) {
        await dataBase.createSection(pcs);
        const adedData = await dataBase.addData(body, pcs);
        return adedData;
    } else {
        throw new Error('no body');
    }
}
export const updatePc = async (id: string, body: IData) => {
    const updatedPc = dataBase.findByIdAndUpdate(id, body, pcs);
    return updatedPc;
}
export const getPcById = async (id: string) => {
    const pc = dataBase.findById(id, pcs);
    return pc;
}
// export const removePc = async (id: string) => {
//     const removePc = await dataBase.removeData(id, pcs);
//     return removePc;
// }