import { DataBase } from "./Database/Database";
export const dataBase = new DataBase('C:/Database', 1);
(async () => {
    await dataBase.createDatabase();
    await dataBase.init();

})();