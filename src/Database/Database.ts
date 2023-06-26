import fs from 'fs/promises';
import makeDir from 'make-dir';
import { v4 as uuidv4 } from 'uuid';
import { app } from '../app';
import * as dotenv from 'dotenv';
import { IData, IMessage } from '../types';
dotenv.config();

export class Section {
    constructor(private path: string) {
        this.path = path;
    }
    async getPath(): Promise<string> {
        return this.path;
    }
}

export class DataBase {
    private lockedFiles: Set<string>;

    constructor(private path: string, private id: number) {
        this.path = path;
        this.id = id;
        this.lockedFiles = new Set();
    }

    async checkFileExists(path: string): Promise<boolean> {
        const fileExists = await fs
            .access(path)
            .then(() => true)
            .catch(() => false);
        return fileExists;
    }

    async lockFile(filePath: string): Promise<void> {
        while (this.lockedFiles.has(filePath)) {

            await new Promise(resolve => setTimeout(resolve, 1000));
        }
        this.lockedFiles.add(filePath);
    }

    async unlockFile(filePath: string): Promise<void> {
        this.lockedFiles.delete(filePath);
    }

    async init() {
        const port = process.env.PORT;
        try {
            console.log('connect');
            app.listen(port || 10000, () => {
                console.log(`server started on ${port} port`);
            });
        } catch (error) {
            process.exit(1);
        }
    }

    async createSection(section: Section): Promise<string> {
        try {
            const fullPath = await this.getPath() + (await section.getPath());
            const fileExists = await this.checkFileExists(fullPath);
            if (!fileExists) {
                await fs.writeFile(fullPath, '');
                return 'Section created';
            } else {
                return 'Section already exists';
            }
        } catch (error) {
            console.error('Failed to create section:', error);
            throw error;
        }
    }

    async createDatabase(): Promise<string | Error> {
        try {
            const fullPath = this.path + this.id;
            await makeDir(fullPath);
            return 'success';
        } catch (error) {
            console.error('Failed to create Database:', error);
            throw error;
        }
    }

    async getData(path: string): Promise<IData[] | IMessage[]> {
        const fullPath = await this.getPath() + path;
        const fileExists = await this.checkFileExists(fullPath);
        const newArr: IData[] = [];
        if (!fileExists) return [];
        let newObj = {};
        const data: string = await fs.readFile(fullPath, 'utf-8');
        const readedData = data.split(';');
        if (readedData.length > 0) {
            for (let i = 0; i < readedData.length; i++) {
                if (readedData[i] === '') {
                    continue;
                } else if (readedData[i].includes('msg')) {
                    const [id, from, to, date, content] = readedData[i].split(' ');
                    newObj = {
                        id,
                        from,
                        to,
                        date,
                        content,
                    };
                } else {
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

    async getPath(): Promise<string> {
        return this.path + this.id;
    }

    async removeDataBase(): Promise<string> {
        const fullPath = await this.getPath();
        if (fullPath) {
            await fs.rmdir(fullPath, { recursive: true });
            return 'DataBase deleted Success';
        }
        return 'DataBase Not found';
    }

    async addData(data: IData | IMessage, section: Section): Promise<IData | string> {
        if (data) {
            let dataToAdd = '';
            let response = {};
            if ('name' in data && 'number' in data) {
                dataToAdd = `${uuidv4()} ${data.name} ${data.number};`;
                response = {
                    id: dataToAdd.split(' ')[0],
                    name: data.name,
                    number: data.number,
                };
            } else if ('from' in data && 'to' in data && 'date' in data && 'content' in data) {
                dataToAdd = `${uuidv4()} ${data.from} ${data.to} ${data.date} ${data.content} msg;`;
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
                    await fs.appendFile(filePath, dataToAdd);
                    await this.unlockFile(filePath);
                } else {
                    await fs.writeFile(filePath, dataToAdd);
                }
                console.log('Data added to file:', filePath);
                return response;
            } catch (error) {
                console.error('Unable to write to file:', error);
                return 'error';
            }
        } else {
            return 'no file to add';
        }
    }

    async findById(id: string, section: Section): Promise<IData | IMessage | null> {
        const data = await this.getData(await section.getPath());
        let result: IData | IMessage | null = null;
        const index = data.findIndex(item => item.id === id);
        if (index === -1) return result;
        for (let i = 0; i < data.length; i++) {
            if (data[i].id === id) {
                if ('name' in data[i] || 'number' in data[i]) {
                    result = {
                        id: data[i].id,
                        name: (data[i] as IData).name,
                        number: (data[i] as IData).number,
                    };
                    break;
                } else if ('from' in data[i] || 'to' in data[i] || 'date' in data[i] || 'content' in data[i]) {
                    result = {
                        id: data[i].id,
                        from: (data[i] as IMessage).from,
                        to: (data[i] as IMessage).to,
                        date: (data[i] as IMessage).date,
                        content: (data[i] as IMessage).content,
                    };
                    break;
                }
            }
        }
        return result;
    }

    async findByIdAndUpdate(id: string, obj: IData | IMessage, section: Section): Promise<IData | IMessage | null> {
        const data = await this.getData(await section.getPath());
        let newObj: IData | IMessage | null = null;
        if (obj !== null) {
            const index = data.findIndex(item => item.id === id);
            if (index === -1) return newObj;
            for (let i = 0; i < data.length; i++) {
                if (data[i].id === id) {
                    if ('name' in data[i] || 'number' in data[i]) {
                        newObj = {
                            id: data[i].id,
                            name: (obj as IData).name ? (obj as IData).name : (data[i] as IData).name,
                            number: (obj as IData).number ? (obj as IData).number : (data[i] as IData).number,
                        };
                    } else if ('from' in data[i] || 'to' in data[i] || 'date' in data[i] || 'content' in data[i]) {
                        newObj = {
                            id: data[i].id,
                            from: (obj as IMessage).from ? (obj as IMessage).from : (data[i] as IMessage).from,
                            to: (obj as IMessage).to ? (obj as IMessage).to : (data[i] as IMessage).to,
                            date: (obj as IMessage).date ? (obj as IMessage).date : (data[i] as IMessage).date,
                            content: (obj as IMessage).content ? (obj as IMessage).content : (data[i] as IMessage).content,
                        };
                    }
                }
            }
            data.splice(index, 1, newObj as IData | IMessage);
            let dataToAdd = '';
            for (let i = 0; i < data.length; i++) {
                if ('name' in data[i] && 'number' in data[i]) {
                    dataToAdd += `${data[i].id} ${(data[i] as IData).name} ${(data[i] as IData).number};`;
                } else if ('from' in data[i] && 'to' in data[i] && 'date' in data[i] && 'content' in data[i]) {
                    dataToAdd += `${data[i].id} ${(data[i] as IMessage).from} ${(data[i] as IMessage).to} ${(data[i] as IMessage).date} ${(data[i] as IMessage).content} msg;`;
                }
            }
            const filePath = await this.getPath() + (await section.getPath());
            try {
                const fileExists = await this.checkFileExists(await this.getPath() + (await section.getPath()));
                if (fileExists) {
                    await this.lockFile(filePath);
                    await fs.writeFile(filePath, dataToAdd);
                    await this.unlockFile(filePath);
                } else {
                    await fs.writeFile(filePath, dataToAdd);
                }
                return newObj;
            } catch (error) {
                console.error('Unable to write to file:', error);
                return null;
            }
        } else {
            return null;
        }
    }

    async findByIdAndDelete(id: string, section: Section): Promise<IData | IMessage | string> {
        const data = await this.getData(await section.getPath());
        const index = data.findIndex(item => item.id === id);
        const found = data[index];
        if (index === -1) return 'Data not found';
        data.splice(index, 1);
        let dataToAdd = '';
        for (let i = 0; i < data.length; i++) {
            if ('name' in data[i] && 'number' in data[i]) {
                dataToAdd += `${data[i].id} ${(data[i] as IData).name} ${(data[i] as IData).number}`;
            } else if ('from' in data[i] && 'to' in data[i] && 'date' in data[i] && 'content' in data[i]) {
                dataToAdd += `${data[i].id} ${(data[i] as IMessage).from} ${(data[i] as IMessage).to} ${(data[i] as IMessage).date} ${(data[i] as IMessage).content} msg`;
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
                await fs.writeFile(filePath, dataToAdd);
                await this.unlockFile(filePath);
            } else {
                await fs.writeFile(filePath, dataToAdd);
            }
            return found;
        } catch (error) {
            console.error('Unable to write to file:', error);
            return 'error';
        }
    }
}