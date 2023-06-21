
import fs from 'fs/promises';
import makeDir from 'make-dir';
import { v4 as uuidv4 } from 'uuid';
import { app } from '../app';
import * as dotenv from 'dotenv';
dotenv.config();
interface IData {
    id?: string;
    name?: string;
    number?: number;
}
export class DataBase {
    constructor(private path: string, private id: number, private pathToData: string) {

        this.path = path;
        this.id = id;
        this.pathToData = pathToData;
    }
    async checkFileExists(path: string): Promise<boolean> {

        const fileExists = await fs
            .access(await this.getPath() + path)
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
    async createSection(fileName: string): Promise<string> {
        try {
            const fullPath = await this.getPath() + fileName;

            const fileExists = await this.checkFileExists(fileName);

            if (!fileExists) {
                await fs.writeFile(fullPath, '');
                return 'File created';
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

    async getData(): Promise<IData[]> {
        const fileExists = await this.checkFileExists(this.pathToData);
        const newArr: IData[] = [];
        if (!fileExists) return [];
        const filePath = await this.getPath() + this.pathToData;
        const data: string = await fs.readFile(filePath, 'utf-8');
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

    async addData(data: IData): Promise<IData | string> {
        if (data) {
            const dataToAdd = `${uuidv4()} ${data.name} ${data.number};`;
            const filePath = await this.getPath() + this.pathToData;

            try {
                const fileExists = await this.checkFileExists(this.pathToData);

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

    async findById(id: string): Promise<IData | null> {
        const data: IData[] = await this.getData();
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

    async findByIdAndUpdate(id: string, obj: IData): Promise<IData | null> {
        const data: IData[] = await this.getData();
        let newObj: IData | null = null;
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

    async findOne(id: string, obj?: IData): Promise<IData | undefined> {
        const data = await this.getData();
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

    async removeData(id: string, path: string): Promise<IData | undefined> {
        const data: IData[] = await this.getData();
        let dataToAdd = '';
        if (data.length > 0) {
            const found = data.find((item: IData) => item.id === id);
            if (typeof found === 'object') {
                const newData: IData[] = data.filter(item => item.id !== id);
                let count = newData.length;
                if (newData.length > 0) {
                    while (count > 0) {
                        for (let i = 0; i < newData.length; i++) {
                            dataToAdd = `${newData[i].id} ${newData[i].name} ${newData[i].number};`;
                            count--;
                        }
                    }
                    await fs.writeFile(await this.getPath() + path, dataToAdd as string);
                    return found;
                }
                await fs.writeFile(await this.getPath() + path, '');
                return found;
            }
        }
        return undefined;
    }
}