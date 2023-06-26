"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removePcController = exports.getPcByIdController = exports.updatePcController = exports.getPcsController = exports.postPcController = void 0;
const pcServices_1 = require("../services/pcServices");
const postPcController = async (req, res) => {
    const adedPc = await (0, pcServices_1.postPc)(req.body);
    return res.status(200).json(adedPc);
};
exports.postPcController = postPcController;
const getPcsController = async (req, res) => {
    const pcsData = await (0, pcServices_1.getPc)();
    return res.status(200).json(pcsData);
};
exports.getPcsController = getPcsController;
const updatePcController = async (req, res) => {
    const { id } = req.params;
    const updatedPc = await (0, pcServices_1.updatePc)(id, req.body);
    return res.status(200).json(updatedPc);
};
exports.updatePcController = updatePcController;
const getPcByIdController = async (req, res) => {
    const { id } = req.params;
    const pc = await (0, pcServices_1.getPcById)(id);
    return res.status(200).json(pc);
};
exports.getPcByIdController = getPcByIdController;
const removePcController = async (req, res) => {
    const { id } = req.params;
    const removedPc = await (0, pcServices_1.removePc)(id);
    return res.status(200).json(removedPc);
};
exports.removePcController = removePcController;
//# sourceMappingURL=pcsContoller.js.map