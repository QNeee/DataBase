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
exports.DataBase = exports.Section = void 0;
const promises_1 = __importDefault(require("fs/promises"));
const make_dir_1 = __importDefault(require("make-dir"));
const uuid_1 = require("uuid");
const app_1 = require("../app");
const dotenv = __importStar(require("dotenv"));
dotenv.config();
class Section {
    constructor(path) {
        this.path = path;
        this.path = path;
    }
    async getPath() {
        return this.path;
    }
}
exports.Section = Section;
class DataBase {
    constructor(path, id) {
        this.path = path;
        this.id = id;
        this.path = path;
        this.id = id;
        this.lockedFiles = new Set();
    }
    async checkFileExists(path) {
        const fileExists = await promises_1.default
            .access(path)
            .then(() => true)
            .catch(() => false);
        return fileExists;
    }
    async lockFile(filePath) {
        while (this.lockedFiles.has(filePath)) {
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
        this.lockedFiles.add(filePath);
    }
    async unlockFile(filePath) {
        this.lockedFiles.delete(filePath);
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
    async createSection(section) {
        try {
            const fullPath = await this.getPath() + (await section.getPath());
            const fileExists = await this.checkFileExists(fullPath);
            if (!fileExists) {
                await promises_1.default.writeFile(fullPath, '');
                return 'Section created';
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
    async getData(path) {
        const fullPath = await this.getPath() + path;
        const fileExists = await this.checkFileExists(fullPath);
        const newArr = [];
        if (!fileExists)
            return [];
        let newObj = {};
        const data = await promises_1.default.readFile(fullPath, 'utf-8');
        const readedData = data.split(';');
        if (readedData.length > 0) {
            for (let i = 0; i < readedData.length; i++) {
                if (readedData[i] === '') {
                    continue;
                }
                else if (readedData[i].includes('msg')) {
                    const [id, from, to, date, content] = readedData[i].split(' ');
                    newObj = {
                        id,
                        from,
                        to,
                        date,
                        content,
                    };
                }
                else {
                    const [id, name, number] = readedData[i].split(' ');
                    newObj = {
                        id,
                        name,
                        number: parseInt(number),
                    };
                }
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
    async addData(data, section) {
        if (data) {
            let dataToAdd = '';
            let response = {};
            if ('name' in data && 'number' in data) {
                dataToAdd = `${(0, uuid_1.v4)()} ${data.name} ${data.number};`;
                response = {
                    id: dataToAdd.split(' ')[0],
                    name: data.name,
                    number: data.number,
                };
            }
            else if ('from' in data && 'to' in data && 'date' in data && 'content' in data) {
                dataToAdd = `${(0, uuid_1.v4)()} ${data.from} ${data.to} ${data.date} ${data.content} msg;`;
                response = {
                    id: dataToAdd.split(' ')[0],
                    from: data.from,
                    to: data.to,
                    date: data.date,
                    content: data.content,
                };
            }
            const filePath = await this.getPath() + (await section.getPath());
            try {
                const fileExists = await this.checkFileExists(await this.getPath() + (await section.getPath()));
                if (fileExists) {
                    await this.lockFile(filePath);
                    await promises_1.default.appendFile(filePath, dataToAdd);
                    await this.unlockFile(filePath);
                }
                else {
                    await promises_1.default.writeFile(filePath, dataToAdd);
                }
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
    async findById(id, section) {
        const data = await this.getData(await section.getPath());
        let result = null;
        const index = data.findIndex(item => item.id === id);
        if (index === -1)
            return result;
        for (let i = 0; i < data.length; i++) {
            if (data[i].id === id) {
                if ('name' in data[i] || 'number' in data[i]) {
                    result = {
                        id: data[i].id,
                        name: data[i].name,
                        number: data[i].number,
                    };
                    break;
                }
                else if ('from' in data[i] || 'to' in data[i] || 'date' in data[i] || 'content' in data[i]) {
                    result = {
                        id: data[i].id,
                        from: data[i].from,
                        to: data[i].to,
                        date: data[i].date,
                        content: data[i].content,
                    };
                    break;
                }
            }
        }
        return result;
    }
    async findByIdAndUpdate(id, obj, section) {
        const data = await this.getData(await section.getPath());
        let newObj = null;
        if (obj !== null) {
            const index = data.findIndex(item => item.id === id);
            if (index === -1)
                return newObj;
            for (let i = 0; i < data.length; i++) {
                if (data[i].id === id) {
                    if ('name' in data[i] || 'number' in data[i]) {
                        newObj = {
                            id: data[i].id,
                            name: obj.name ? obj.name : data[i].name,
                            number: obj.number ? obj.number : data[i].number,
                        };
                    }
                    else if ('from' in data[i] || 'to' in data[i] || 'date' in data[i] || 'content' in data[i]) {
                        newObj = {
                            id: data[i].id,
                            from: obj.from ? obj.from : data[i].from,
                            to: obj.to ? obj.to : data[i].to,
                            date: obj.date ? obj.date : data[i].date,
                            content: obj.content ? obj.content : data[i].content,
                        };
                    }
                }
            }
            data.splice(index, 1, newObj);
            let dataToAdd = '';
            for (let i = 0; i < data.length; i++) {
                if ('name' in data[i] && 'number' in data[i]) {
                    dataToAdd += `${data[i].id} ${data[i].name} ${data[i].number};`;
                }
                else if ('from' in data[i] && 'to' in data[i] && 'date' in data[i] && 'content' in data[i]) {
                    dataToAdd += `${data[i].id} ${data[i].from} ${data[i].to} ${data[i].date} ${data[i].content} msg;`;
                }
            }
            const filePath = await this.getPath() + (await section.getPath());
            try {
                const fileExists = await this.checkFileExists(await this.getPath() + (await section.getPath()));
                if (fileExists) {
                    await this.lockFile(filePath);
                    await promises_1.default.writeFile(filePath, dataToAdd);
                    await this.unlockFile(filePath);
                }
                else {
                    await promises_1.default.writeFile(filePath, dataToAdd);
                }
                return newObj;
            }
            catch (error) {
                console.error('Unable to write to file:', error);
                return null;
            }
        }
        else {
            return null;
        }
    }
    async findByIdAndDelete(id, section) {
        const data = await this.getData(await section.getPath());
        const index = data.findIndex(item => item.id === id);
        const found = data[index];
        if (index === -1)
            return 'Data not found';
        data.splice(index, 1);
        let dataToAdd = '';
        for (let i = 0; i < data.length; i++) {
            if ('name' in data[i] && 'number' in data[i]) {
                dataToAdd += `${data[i].id} ${data[i].name} ${data[i].number}`;
            }
            else if ('from' in data[i] && 'to' in data[i] && 'date' in data[i] && 'content' in data[i]) {
                dataToAdd += `${data[i].id} ${data[i].from} ${data[i].to} ${data[i].date} ${data[i].content} msg`;
            }
            if (i !== data.length - 1) {
                dataToAdd += ';';
            }
        }
        const filePath = await this.getPath() + (await section.getPath());
        try {
            const fileExists = await this.checkFileExists(await this.getPath() + (await section.getPath()));
            if (fileExists) {
                await this.lockFile(filePath);
                await promises_1.default.writeFile(filePath, dataToAdd);
                await this.unlockFile(filePath);
            }
            else {
                await promises_1.default.writeFile(filePath, dataToAdd);
            }
            return found;
        }
        catch (error) {
            console.error('Unable to write to file:', error);
            return 'error';
        }
    }
}
exports.DataBase = DataBase;
//# sourceMappingURL=Database.js.map