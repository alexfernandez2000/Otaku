export class CellMine {
    status: Status;
    minesAround: number;
    isBomb: boolean = false;
    isDisabled: boolean = false;
    row: number;
    col: number;
      constructor(status : Status, minesAround: number,row: number, col: number) {     
        this.status=status;
        this.minesAround=minesAround;
        this.row=row;
        this.col=col;
    }
}
export enum Status{
    Blocked,
    Unloqued,
    Flag
}