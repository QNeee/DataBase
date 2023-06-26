"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.msg = exports.pcs = exports.farmers = exports.dataBase = void 0;
const Database_1 = require("./Database/Database");
exports.dataBase = new Database_1.DataBase('C:/Database', 1);
exports.farmers = new Database_1.Section('/farmers.txt');
exports.pcs = new Database_1.Section('/pcs.txt');
exports.msg = new Database_1.Section('/msg.txt');
(async () => {
    await exports.dataBase.createDatabase();
    await exports.dataBase.init();
})();
//# sourceMappingURL=index.js.map