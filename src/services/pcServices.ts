import { dataBase } from ".."
import { Section } from "../Database/Database"

interface IPc {
    id?: string | undefined,
    name: string,
    number: number
}
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
    const updatedPc = dataBase.findByIdAndUpdate(body.id as string, { number: 1 }, pcs);
    return updatedPc;
}