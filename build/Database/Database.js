"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataBase = void 0;
const promises_1 = __importDefault(require("fs/promises"));
const make_dir_1 = __importDefault(require("make-dir"));
const uuid_1 = require("uuid");
const app_1 = require("../app");
const dotenv = __importStar(require("dotenv"));
dotenv.config();
class DataBase {
    constructor(path, id, pathToData) {
        this.path = path;
        this.id = id;
        this.pathToData = pathToData;
        this.path = path;
        this.id = id;
        this.pathToData = pathToData;
    }
    async checkFileExists(path) {
        const fileExists = await promises_1.default
            .access(await this.getPath() + path)
            .then(() => true)
            .catch(() => false);
        return fileExists;
    }
    async init() {
        const port = process.env.PORT;
        try {
            console.log('connect');
            app_1.app.listen(port || 10000, () => {
                console.log(`server started on ${port} port`);
            });
        }
        catch (error) {
            process.exit(1);
        }
    }
    async createSection(fileName) {
        try {
            const fullPath = await this.getPath() + fileName;
            const fileExists = await this.checkFileExists(fileName);
            if (!fileExists) {
                await promises_1.default.writeFile(fullPath, '');
                return 'File created';
            }
            else {
                return 'Section already exists';
            }
        }
        catch (error) {
            console.error('Failed to create section:', error);
            throw error;
        }
    }
    async createDatabase() {
        try {
            const fullPath = this.path + this.id;
            await (0, make_dir_1.default)(fullPath);
            return 'success';
        }
        catch (error) {
            console.error('Failed to create Database:', error);
            throw error;
        }
    }
    async getData() {
        const fileExists = await this.checkFileExists(this.pathToData);
        const newArr = [];
        if (!fileExists)
            return [];
        const filePath = await this.getPath() + this.pathToData;
        const data = await promises_1.default.readFile(filePath, 'utf-8');
        const readedData = data.split(';');
        if (readedData.length > 0) {
            for (let i = 0; i < readedData.length; i++) {
                if (readedData[i] === '') {
                    continue;
                }
                const [id, name, number] = readedData[i].split(' ');
                const newObj = {
                    id,
                    name,
                    number: parseInt(number)
                };
                newArr.push(newObj);
            }
            return newArr;
        }
        return [];
    }
    async getPath() {
        return this.path + this.id;
    }
    async removeDataBase() {
        const fullPath = await this.getPath();
        if (fullPath) {
            await promises_1.default.rmdir(fullPath, { recursive: true });
            return 'DataBase deleted Success';
        }
        return 'DataBase Not found';
    }
    async addData(data) {
        if (data) {
            const dataToAdd = `${(0, uuid_1.v4)()} ${data.name} ${data.number};`;
            const filePath = await this.getPath() + this.pathToData;
            try {
                const fileExists = await this.checkFileExists(this.pathToData);
                if (fileExists) {
                    await promises_1.default.appendFile(filePath, dataToAdd);
                }
                else {
                    await promises_1.default.writeFile(filePath, dataToAdd);
                }
                const response = {
                    id: dataToAdd.split(' ')[0],
                    name: data.name,
                    number: data.number
                };
                console.log('Data added to file:', filePath);
                return response;
            }
            catch (error) {
                console.error('Unable to write to file:', error);
                return 'error';
            }
        }
        else {
            return 'no file to add';
        }
    }
    async findById(id) {
        const data = await this.getData();
        let result = null;
        if (data.length > 0) {
            for (let i = 0; i < data.length; i++) {
                if (data[i].id === id) {
                    result = {
                        id: data[i].id,
                        name: data[i].name,
                        number: data[i].number
                    };
                    break;
                }
            }
        }
        return result;
    }
    async findByIdAndUpdate(id, obj) {
        const data = await this.getData();
        let newObj = null;
        if (obj !== null) {
            for (let i = 0; i < data.length; i++) {
                if (data[i].id === id) {
                    newObj = {
                        id: data[i].id,
                        name: obj.name ? obj.name : data[i].name,
                        number: obj.number ? obj.number : data[i].number
                    };
                    break;
                }
            }
        }
        return newObj;
    }
    async findOne(id, obj) {
        const data = await this.getData();
        const found = data.find(item => item.id === id);
        if (obj !== null) {
            let newObj;
            for (let i = 0; i < data.length; i++) {
                if (data[i].id === id) {
                    newObj = {
                        id: data[i].id,
                        name: (obj === null || obj === void 0 ? void 0 : obj.name) ? obj.name : data[i].name,
                        number: (obj === null || obj === void 0 ? void 0 : obj.number) ? obj.number : data[i].number
                    };
                    break;
                }
            }
            return newObj;
        }
        return found;
    }
    async removeData(id, path) {
        const data = await this.getData();
        let dataToAdd = '';
        if (data.length > 0) {
            const found = data.find((item) => item.id === id);
            if (typeof found === 'object') {
                const newData = data.filter(item => item.id !== id);
                let count = newData.length;
                if (newData.length > 0) {
                    while (count > 0) {
                        for (let i = 0; i < newData.length; i++) {
                            dataToAdd = `${newData[i].id} ${newData[i].name} ${newData[i].number};`;
                            count--;
                        }
                    }
                    await promises_1.default.writeFile(await this.getPath() + path, dataToAdd);
                    return found;
                }
                await promises_1.default.writeFile(await this.getPath() + path, '');
                return found;
            }
        }
        return undefined;
    }
}
exports.DataBase = DataBase;
//# sourceMappingURL=Database.js.map