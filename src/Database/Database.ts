
import fs from 'fs/promises';
import makeDir from 'make-dir';
import { v4 as uuidv4 } from 'uuid';

interface IData extends Object {
    id?: string;
    name: string;
    number: number;
}

export class DataBase {
    constructor(public path: string, public id: number) { }

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
    async getData(path: string): Promise<object[]> {
        const newArr = [];
        const filePath = await this.getPath() + path;
        const data: string = await fs.readFile(filePath, 'utf-8');
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
    async addData(data: IData): Promise<string> {
        if (data) {
            const dataToAdd = uuidv4() + " " + data.name + " " + data.number + ";"
            const filePath = await this.getPath() + '/data.txt';

            try {
                const fileExists = await fs
                    .access(filePath)
                    .then(() => true)
                    .catch(() => false);

                if (fileExists) {
                    await fs.appendFile(filePath, dataToAdd);
                } else {
                    await fs.writeFile(filePath, dataToAdd);
                }

                console.log('Data aded to file :', filePath);
                return 'success';
            } catch (error) {
                console.error('cant write to file:', error);
                return 'error';
            }
        } else {
            return 'no file to add';
        }
    }



    async removeData(id: string, path: string): Promise<IData | undefined> {
        const data: IData[] = await this.getData(path) as IData[];
        let dataToAdd;
        if (data.length > 0) {
            const found = data.find((item: IData) => item.id === id);
            if (typeof found === 'object') {
                const newData: IData[] = data.filter(item => item.id !== id);
                let count = newData.length;
                if (newData.length > 0) {
                    while (count > 0) {
                        for (let i = 0; i < newData.length; i++) {
                            dataToAdd = newData[i].id + " " + newData[i].name + ' ' + newData[i].number + ";"
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