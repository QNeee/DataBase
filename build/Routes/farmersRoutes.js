"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.farmersRoutes = void 0;
const express_1 = __importDefault(require("express"));
const apiHelper_1 = require("../helpers/apiHelper");
const farmersController_1 = require("../controllers/farmersController");
exports.farmersRoutes = express_1.default.Router();
exports.farmersRoutes.post('/', (0, apiHelper_1.asyncWrapper)(farmersController_1.postFarmerController));
exports.farmersRoutes.get('/', (0, apiHelper_1.asyncWrapper)(farmersController_1.getFarmerController));
exports.farmersRoutes.get('/id/:id', (0, apiHelper_1.asyncWrapper)(farmersController_1.getFarmerByIdController));
exports.farmersRoutes.patch('/id/:id', (0, apiHelper_1.asyncWrapper)(farmersController_1.updateFarmerController));
exports.farmersRoutes.delete('/id/:id', (0, apiHelper_1.asyncWrapper)(farmersController_1.removeFarmerController));
//# sourceMappingURL=farmersRoutes.js.map