"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataBase = void 0;
const Database_1 = require("./Database/Database");
exports.dataBase = new Database_1.DataBase('C:/Database', 1, '/data.txt');
(async () => {
    await exports.dataBase.createDatabase();
    await exports.dataBase.init();
    const ded = await exports.dataBase.getData();
    console.log(ded);
})();
//# sourceMappingURL=index.js.map