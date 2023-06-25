
import fs from 'fs/promises';
import makeDir from 'make-dir';
import { v4 as uuidv4 } from 'uuid';
import { app } from '../app';
import * as dotenv from 'dotenv';
import { IData, IFarmer, IPc } from '../types';
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
    constructor(private path: string, private id: number) {

        this.path = path;
        this.id = id
    }
    async checkFileExists(path: string): Promise<boolean> {
        console.log(path);
        const fileExists = await fs
            .access(path)
            .then(() => true)
            .catch(() => false);
        return fileExists;
    }
    async init() {
        const port = process.env.PORT;
        try {
            console.log('connect')
            app.listen(port || 10000, () => {
                console.log(`server started on ${port} port`)
            })
        } catch (error) {
            process.exit(1);
        }
    }
    async createSection(section: Section): Promise<string> {
        try {
            const fullPath = await this.getPath() + await section.getPath();

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

    async getData(path: string): Promise<IData[]> {
        const fullPath = await this.getPath() + path
        const fileExists = await this.checkFileExists(fullPath);
        const newArr: IData[] = [];
        if (!fileExists) return [];
        const data: string = await fs.readFile(fullPath, 'utf-8');
        const readedData = data.split(';');
        if (readedData.length > 0) {
            for (let i = 0; i < readedData.length; i++) {
                if (readedData[i] === '') {
                    continue;
                }
                const [id, name, number] = readedData[i].split(' ');
                const newObj: IData = {
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

    async addData(data: IData | IFarmer | IPc, section: Section): Promise<IData | string> {
        if (data) {
            const dataToAdd = `${uuidv4()} ${data.name} ${data.number};`;
            const filePath = await this.getPath() + await section.getPath();
            try {
                const fileExists = await this.checkFileExists(await this.getPath() + await section.getPath());
                if (fileExists) {
                    await fs.appendFile(filePath, dataToAdd);
                } else {
                    await fs.writeFile(filePath, dataToAdd);
                }
                const response = {
                    id: dataToAdd.split(' ')[0],
                    name: data.name,
                    number: data.number
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

    async findById(id: string, section: Section): Promise<IData | null> {
        const data: IData[] = await this.getData(await section.getPath());
        let result: IData | null = null;
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

    async findByIdAndUpdate(id: string, obj: IData, section: Section): Promise<IData | null> {
        const data: IData[] = await this.getData(await section.getPath());
        let newObj: IData | null = null;
        if (obj !== null) {
            for (let i = 0; i < data.length; i++) {
                if (data[i].id === id) {
                    newObj = {
                        id: data[i].id,
                        name: obj.name ? obj.name : data[i].name,
                        number: obj.number ? obj.number : data[i].number
                    };
                    const found = data.findIndex(item => item.id === id);
                    data.splice(found, 1);
                    break;
                }
            }
            let dataToAdd = '';
            for (let i = 0; i < data.length; i++) {
                dataToAdd += `${data[i].id} ${data[i].name} ${data[i].number};`
            }
            await fs.writeFile(await this.getPath() + await section.getPath(), dataToAdd)
        }
        return newObj;
    }

    async findOne(section: Section, id: string, obj?: IData): Promise<IData | undefined> {
        const data = await this.getData(await section.getPath());
        const found: IData | undefined = data.find(item => item.id === id);
        if (obj !== null) {
            let newObj: IData | undefined;
            for (let i = 0; i < data.length; i++) {
                if (data[i].id === id) {
                    newObj = {
                        id: data[i].id,
                        name: obj?.name ? obj.name : data[i].name,
                        number: obj?.number ? obj.number : data[i].number
                    }
                    break;
                }
            }
            return newObj;
        }
        return found;
    }

    async removeData(id: string, section: Section): Promise<IData | undefined> {
        const filepath = await this.getPath() + await section.getPath();
        const data: IData[] = await this.getData(filepath);
        const found = data.findIndex(item => item.id === id);
        if (found === -1) return undefined;
        let dataToAdd = '';
        if (data.length > 0) {
            const foundData = data.find(item => item.id === id);
            data.splice(found, 1);
            for (let i = 0; i < data.length; i++) {
                dataToAdd += `${data[i].id} ${data[i].name} ${data[i].number};`
            }
            fs.writeFile(filepath, dataToAdd)
            return foundData;
        }

        return undefined;
    }
}