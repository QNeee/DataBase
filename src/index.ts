import { DataBase } from "./Database/Database";
import { pcs, postPc, removePc } from "./services/pcServices";
// import { postData } from "./services/dataServices";


export const dataBase = new DataBase('C:/Database', 1);
(async () => {
    await dataBase.createDatabase();
    await dataBase.init();
})();