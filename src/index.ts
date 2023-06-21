import { DataBase } from "./Database/Database";
import { getMessages } from "./services/messagesServices";


export const dataBase = new DataBase('C:/Database', 1, '/data.txt');
// (async () => {
//     await dataBase.createDatabase();
//     await dataBase.init();
//     await dataBase.createSection('/messages.txt')
//     const dada = await dataBase.addData({ name: 'lox', number: 15 })
//     console.log(dada);
//     const dede = await dataBase.getData();
//     console.log(dede);
// })();