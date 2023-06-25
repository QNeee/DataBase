import { DataBase, Section } from "./Database/Database";
// import { postData } from "./services/dataServices";


export const dataBase = new DataBase('C:/Database', 1);
(async () => {
    await dataBase.createDatabase();
    await dataBase.init();
    // const messages = new Section('/messages.txt')
    // await dataBase.createSection(messages);
    // await dataBase.addData({ name: "badba", number: 34 }, messages);
    // await dataBase.addData({ name: "badba", number: 34 }, messages);
    // await dataBase.removeData('78a43624-f65c-40b2-b57e-86a880b02ccc', messages);
})();