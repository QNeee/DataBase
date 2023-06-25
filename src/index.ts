import { DataBase } from "./Database/Database";
import { postFarmer } from "./services/farmersService";
import { postMessage, removeMessage, updateMessasge } from "./services/messagesServices";
import { getPcById, pcs, postPc, updatePc } from "./services/pcServices";

export const dataBase = new DataBase('C:/Database', 1);
(async () => {
    await dataBase.createDatabase();
    await dataBase.init();
    const dd = await getPcById('8ca6490a-e4bc-4d97-9f4d-0f1ab95ed942');
    console.log(dd);
    // const dd = await updateMessasge({ id: '846e3fec-f353-4b35-b095-61f734b60d3b', from: 'xyu', to: 'zalypa' });
    // console.log(dd);
    // const dd = await updatePc({ id: '12923b1cca-2d90-4288-a17c-4e72e7b07287', name: 'kosk' });
    // console.log(dd);
    // const dd = await dataBase.getData('/farmers.txt')
    // console.log(dd);
    // const dd = await postFarmer({ name: "dniwe", number: 34 });
    // console.log(dd);
    // const dd = await postPc({ name: 'd', number: 12 });
    // console.log(dd);
    // for (let i = 0; i < 4; i++) {
    //     await postMessage({
    //         from: 'dasdsa', to: 'asda', date: new Date(), content: 'asdsada'
    //     });
    // }
    // const dd = await dataBase.getData('/msg.txt')
    // console.log(dd);
    // const dd = await removeMessage('5c6e7623-1e31-4dfd-ab18-a1093c4531bf');
    // console.log(dd);
    // const dd = updatePc({ name: 'valera' });

})();