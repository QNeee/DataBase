"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeFarmerController = exports.getFarmerByIdController = exports.updateFarmerController = exports.getFarmerController = exports.postFarmerController = void 0;
const farmersService_1 = require("../services/farmersService");
const postFarmerController = async (req, res) => {
    const farmer = await (0, farmersService_1.postFarmer)(req.body);
    return res.status(201).json(farmer);
};
exports.postFarmerController = postFarmerController;
const getFarmerController = async (req, res) => {
    const farmersData = await (0, farmersService_1.getFarmers)();
    return res.status(200).json(farmersData);
};
exports.getFarmerController = getFarmerController;
const updateFarmerController = async (req, res) => {
    const { id } = req.params;
    const updatedFarmer = await (0, farmersService_1.updateFarmer)(id, req.body);
    return res.status(200).json(updatedFarmer);
};
exports.updateFarmerController = updateFarmerController;
const getFarmerByIdController = async (req, res) => {
    const { id } = req.params;
    const farmer = await (0, farmersService_1.getFarmerById)(id);
    return res.status(200).json(farmer);
};
exports.getFarmerByIdController = getFarmerByIdController;
const removeFarmerController = async (req, res) => {
    const { id } = req.params;
    const removedFarmer = await (0, farmersService_1.removeFarmer)(id);
    return res.status(200).json(removedFarmer);
};
exports.removeFarmerController = removeFarmerController;
//# sourceMappingURL=farmersController.js.map