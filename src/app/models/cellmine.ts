export class CellMine {
    Status : Status;
    Value : number;

    constructor(status : Status, value: number) {     
        this.Status=status;
        this.Value=value;
    }
}
export enum Status{
    Bloqued,
    Unloqued,
    Flag
}