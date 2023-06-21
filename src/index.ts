import { DataBase } from "./Database/Database";

(async () => {
    const myDataBase = new DataBase('C:/DataBase', 1);
    await myDataBase.createDatabase();
    // const dada = await myDataBase.getData("/data.txt");
    // console.log(dada);
    // await myDataBase.addData({ name: 'bebdrddfdd', age: 15 });
    const dada = await myDataBase.removeData('039ee9b5-5bcc-4ca8-8d07-cd329e4159ed', "/data.txt");
    console.log(dada);
    // const filePath = await myDataBase.getPath();
    // if (filePath) {
    //     await myDataBase.addData({ name: 'bebra', age: 15 });
    // } else {
    //     console.error('Не вдалося отримати шлях до файлу');
    // }
})();