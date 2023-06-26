"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removePc = exports.getPcById = exports.updatePc = exports.getPc = exports.postPc = void 0;
const __1 = require("..");
const errors_1 = require("../helpers/errors");
const postPc = async (body) => {
    const { name, number } = body;
    if (!name && !number)
        throw new errors_1.WrongParams('need body');
    const pc = await __1.dataBase.addData(body, __1.pcs);
    return pc;
};
exports.postPc = postPc;
const getPc = async () => {
    const pcsData = await __1.dataBase.getData(await __1.pcs.getPath());
    return pcsData;
};
exports.getPc = getPc;
const updatePc = async (id, body) => {
    const updatedPc = await __1.dataBase.findByIdAndUpdate(id, body, __1.pcs);
    if (!updatedPc)
        throw new errors_1.NotFound('Data not found');
    return updatedPc;
};
exports.updatePc = updatePc;
const getPcById = async (id) => {
    const pc = await __1.dataBase.findById(id, __1.pcs);
    if (!pc)
        throw new errors_1.NotFound('Data not found');
    return pc;
};
exports.getPcById = getPcById;
const removePc = async (id) => {
    const removePc = await __1.dataBase.findByIdAndDelete(id, __1.pcs);
    if (removePc === 'Data not found')
        throw new errors_1.NotFound('Data not found');
    return removePc;
};
exports.removePc = removePc;
//# sourceMappingURL=pcServices.js.map