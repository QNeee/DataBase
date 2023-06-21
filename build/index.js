"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Database_1 = require("./Database/Database");
(async () => {
    const myDataBase = new Database_1.DataBase('C:/DataBase', 1);
    await myDataBase.createDatabase();
    const dada = await myDataBase.removeData('039ee9b5-5bcc-4ca8-8d07-cd329e4159ed', "/data.txt");
    console.log(dada);
})();
//# sourceMappingURL=index.js.map