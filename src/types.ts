
export interface IData {
    id?: string | undefined,
    name?: string | undefined,
    number?: number | undefined
}
export interface IMessage {
    id?: string,
    from?: string,
    to?: string,
    date?: Date,
    answeredDate?: Date,
    content?: string,
}