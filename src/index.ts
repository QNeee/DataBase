import { DataBase } from "./Database/Database";
import { postPc, updatePc } from "./services/pcServices";
// import { postData } from "./services/dataServices";


export const dataBase = new DataBase('C:/Database', 1);
(async () => {
    await dataBase.createDatabase();
    await dataBase.init();
    // const dd = await postPc({ name: 'sadsadasda', number: 0 });
    // const messages = new Section('/messages.txt')
    // await dataBase.createSection(messages);
    // await dataBase.addData({ name: "badba", number: 34 }, messages);
    // await dataBase.addData({ name: "badba", number: 34 }, messages);
    // await dataBase.removeData('78a43624-f65c-40b2-b57e-86a880b02ccc', messages);
})();