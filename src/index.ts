import { DataBase } from "./Database/Database";
import { getMessages } from "./services/messagesServices";


export const dataBase = new DataBase('C:/Database', 1, '/data.txt');
(async () => {
    await dataBase.createDatabase();
    await dataBase.init();
    // await dataBase.addData({ name: "dodk", number: 12 });
    const ded = await dataBase.getData();
    console.log(ded);
})();