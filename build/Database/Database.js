"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataBase = void 0;
const promises_1 = __importDefault(require("fs/promises"));
const make_dir_1 = __importDefault(require("make-dir"));
const uuid_1 = require("uuid");
const pathToData = '/data.txt';
class DataBase {
    constructor(path, id) {
        this.path = path;
        this.id = id;
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
    async getData(path) {
        const newArr = [];
        const filePath = await this.getPath() + path;
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
            const filePath = await this.getPath() + pathToData;
            try {
                const fileExists = await promises_1.default
                    .access(filePath)
                    .then(() => true)
                    .catch(() => false);
                if (fileExists) {
                    await promises_1.default.appendFile(filePath, dataToAdd);
                }
                else {
                    await promises_1.default.writeFile(filePath, dataToAdd);
                }
                console.log('Data added to file:', filePath);
                return 'success';
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
        const data = await this.getData(pathToData);
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
        const data = await this.getData(pathToData);
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
        const data = await this.getData(pathToData);
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
        const data = await this.getData(path);
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