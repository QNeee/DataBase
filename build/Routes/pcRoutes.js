"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pcRoutes = void 0;
const express_1 = __importDefault(require("express"));
const apiHelper_1 = require("../helpers/apiHelper");
const pcsContoller_1 = require("../controllers/pcsContoller");
exports.pcRoutes = express_1.default.Router();
exports.pcRoutes.post('/', (0, apiHelper_1.asyncWrapper)(pcsContoller_1.postPcController));
exports.pcRoutes.get('/', (0, apiHelper_1.asyncWrapper)(pcsContoller_1.getPcsController));
exports.pcRoutes.get('/id/:id', (0, apiHelper_1.asyncWrapper)(pcsContoller_1.getPcByIdController));
exports.pcRoutes.patch('/id/:id', (0, apiHelper_1.asyncWrapper)(pcsContoller_1.updatePcController));
exports.pcRoutes.delete('/id/:id', (0, apiHelper_1.asyncWrapper)(pcsContoller_1.removePcController));
//# sourceMappingURL=pcRoutes.js.map