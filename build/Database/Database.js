"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataBase = void 0;
const promises_1 = __importDefault(require("fs/promises"));
const make_dir_1 = __importDefault(require("make-dir"));
const uuid_1 = require("uuid");
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
                const newObj = {
                    id: readedData[i].split(' ')[0],
                    name: readedData[i].split(' ')[1],
                    number: readedData[i].split(' ')[2]
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
            const dataToAdd = (0, uuid_1.v4)() + " " + data.name + " " + data.number + ";";
            const filePath = await this.getPath() + '/data.txt';
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
                console.log('Data aded to file :', filePath);
                return 'success';
            }
            catch (error) {
                console.error('cant write to file:', error);
                return 'error';
            }
        }
        else {
            return 'no file to add';
        }
    }
    async removeData(id, path) {
        const data = await this.getData(path);
        let dataToAdd;
        if (data.length > 0) {
            const found = data.find((item) => item.id === id);
            if (typeof found === 'object') {
                const newData = data.filter(item => item.id !== id);
                let count = newData.length;
                if (newData.length > 0) {
                    while (count > 0) {
                        for (let i = 0; i < newData.length; i++) {
                            dataToAdd = newData[i].id + " " + newData[i].name + ' ' + newData[i].number + ";";
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