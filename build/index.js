"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Database_1 = require("./Database/Database");
(async () => {
    const myDataBase = new Database_1.DataBase('C:/DataBase', 1);
    await myDataBase.createDatabase();
    const obj = { name: 'dalabas', number: 11 };
    const dd = await myDataBase.findOne('d3e5a590-f5f8-4a9b-8a5b-9f15b58fbff2', obj);
    console.log(dd);
})();
//# sourceMappingURL=index.js.map