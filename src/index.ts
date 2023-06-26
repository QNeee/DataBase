import { DataBase, Section } from "./Database/Database";
export const dataBase = new DataBase('C:/Database', 1);
export const farmers = new Section('/farmers.txt');
export const pcs = new Section('/pcs.txt');
export const msg = new Section('/msg.txt');
(async () => {
    await dataBase.createDatabase();
    await dataBase.init();
})();