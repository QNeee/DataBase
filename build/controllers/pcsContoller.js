"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPcByIdController = exports.updatePcController = exports.postPcController = void 0;
const pcServices_1 = require("../services/pcServices");
const postPcController = async (req, res) => {
    const adedPc = await (0, pcServices_1.postPc)(req.body);
    return res.status(200).json(adedPc);
};
exports.postPcController = postPcController;
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
//# sourceMappingURL=pcsContoller.js.map