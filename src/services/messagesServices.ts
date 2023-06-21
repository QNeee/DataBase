import { dataBase } from ".."

export const getMessages = async () => {
    const messages = await dataBase.getData();
    return messages;
}
