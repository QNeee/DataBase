import { dataBase, pcs } from ".."
import { NotFound, WrongParams } from "../helpers/errors";
import { IData } from "../types";

export const postPc = async (body: IData) => {
    const { name, number } = body;
    if (!name && !number) throw new WrongParams('need body');
    const pc = await dataBase.addData(body, pcs);
    return pc;
}
export const getPc = async () => {
    const pcsData = await dataBase.getData(await pcs.getPath());
    return pcsData;
}
export const updatePc = async (id: string, body: IData) => {
    const updatedPc = await dataBase.findByIdAndUpdate(id, body, pcs);
    if (!updatedPc) throw new NotFound('Data not found');
    return updatedPc;
}
export const getPcById = async (id: string) => {
    const pc = await dataBase.findById(id, pcs);
    if (!pc) throw new NotFound('Data not found');
    return pc;
}
export const removePc = async (id: string) => {
    const removePc = await dataBase.findByIdAndDelete(id, pcs);
    if (removePc === 'Data not found') throw new NotFound('Data not found');
    return removePc;
}