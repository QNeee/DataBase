"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPcById = exports.updatePc = exports.postPc = void 0;
const __1 = require("..");
const postPc = async (body) => {
    if (body !== null) {
        await __1.dataBase.createSection(__1.pcs);
        const adedData = await __1.dataBase.addData(body, __1.pcs);
        return adedData;
    }
    else {
        throw new Error('no body');
    }
};
exports.postPc = postPc;
const updatePc = async (id, body) => {
    const updatedPc = __1.dataBase.findByIdAndUpdate(id, body, __1.pcs);
    return updatedPc;
};
exports.updatePc = updatePc;
const getPcById = async (id) => {
    const pc = __1.dataBase.findById(id, __1.pcs);
    return pc;
};
exports.getPcById = getPcById;
//# sourceMappingURL=pcServices.js.map