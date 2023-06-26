"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeFarmer = exports.updateFarmer = exports.getFarmerById = exports.getFarmers = exports.postFarmer = void 0;
const __1 = require("..");
const errors_1 = require("../helpers/errors");
const postFarmer = async (body) => {
    const { name, number } = body;
    if (!name && !number)
        throw new errors_1.WrongParams('need body');
    const farmer = await __1.dataBase.addData(body, __1.farmers);
    return farmer;
};
exports.postFarmer = postFarmer;
const getFarmers = async () => {
    const farmersData = await __1.dataBase.getData(await __1.farmers.getPath());
    return farmersData;
};
exports.getFarmers = getFarmers;
const getFarmerById = async (id) => {
    const farmer = await __1.dataBase.findById(id, __1.farmers);
    if (!farmer)
        throw new errors_1.NotFound('Data not found');
    return farmer;
};
exports.getFarmerById = getFarmerById;
const updateFarmer = async (id, body) => {
    const updatedFarmer = await __1.dataBase.findByIdAndUpdate(id, body, __1.farmers);
    if (!updatedFarmer)
        throw new errors_1.NotFound('Data not found');
    return updatedFarmer;
};
exports.updateFarmer = updateFarmer;
const removeFarmer = async (id) => {
    const removedFarmer = await __1.dataBase.findByIdAndDelete(id, __1.farmers);
    if (removedFarmer === 'Data not found')
        throw new errors_1.NotFound('Data not found');
    return removedFarmer;
};
exports.removeFarmer = removeFarmer;
//# sourceMappingURL=farmersService.js.map