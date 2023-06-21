import { DataBase } from "./Database/Database";

(async () => {
    const myDataBase = new DataBase('C:/DataBase', 1);
    await myDataBase.createDatabase();
    // await myDataBase.createSection('/farmers');
    // const dada = await myDataBase.getData("/data.txt");
    // console.log(dada);
    // await myDataBase.addData({ name: 'bebdrddfdd', number: 15 });
    // const bebe = await myDataBase.findById('d3e5a5d90-f5f8-4a9b-8a5b-9f15b58fbff2');
    // console.log(bebe);
    const obj = { name: 'dalabas', number: 11 };
    // const bb = await myDataBase.findByIdAndUpdate('d3e5a590-f5f8-4a9b-8a5b-9f15b58fbff2', obj);
    // console.log(bb);
    const dd = await myDataBase.findOne('d3e5a590-f5f8-4a9b-8a5b-9f15b58fbff2', obj);
    console.log(dd);
})();