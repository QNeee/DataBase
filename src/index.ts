import { DataBase, Section } from "./Database/Database";
import { farmers, postFarmer, updateFarmer } from "./services/farmersService";
import { pcs } from "./services/pcServices";


export const dataBase = new DataBase('C:/Database', 1);
const msg = new Section('/msg.txt');
(async () => {
    await dataBase.createDatabase();
    await dataBase.init();
    const dd = await dataBase.addData({ name: 'piska', number: 13 }, msg);
    console.log(dd);
})();