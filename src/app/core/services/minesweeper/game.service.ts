import { Injectable } from '@angular/core';
import { CellMine, Status } from '../../../models/cellmine';
import { IBoardService } from '../../interfaces/minesweeper/IBoardService';
import { Subject } from 'rxjs';
import { isValidPosition,DIRECTIONS } from '../../tools/boardTools';
import { IGameService } from '../../interfaces/minesweeper/IGameService';
@Injectable({
  providedIn: 'root'
})
export class GameService implements IGameService{
  onGameOver$ = new Subject<void>();
  onWin$ = new Subject<void>();

  constructor(private boardService: IBoardService) { }
  
  public insertFlag(cellMine: CellMine) {
    if (cellMine.status === Status.Blocked) {
      cellMine.status = Status.Flag;
      this.checkWin();
    }
    else if (cellMine.status === Status.Flag)
      cellMine.status = Status.Blocked;
  }
  public revealCell(cellMine: CellMine) {
    if (cellMine.status !== Status.Blocked)
      return;

    cellMine.status = Status.Unloqued;

    switch (cellMine.minesAround) {
      case 0://Empty
        this.unlockAround(cellMine);
        break;
      case -1://Bomb
          this.onGameOver$?.next(); 
        break;
    }
    this.checkWin();
  }
  public unlockAround(cellMine: CellMine) {
    const board = this.boardService.getBoard();
    for (const [row, col] of DIRECTIONS) {
      const newRow = cellMine?.row + row
      const newCol = cellMine?.col + col;
      if(isValidPosition(newRow,newCol,board))
      this.revealCell(board[newRow][newCol]);
    }
  }
  private checkWin() {
    if (this.isWin())
      this.onWin$.next();
  }
  private isWin(): Boolean {
    const board = this.boardService.getBoard();
    for (const row of board) {
      for (const cellMine of row) {
        if (cellMine.status === Status.Blocked)
          return false;
        if (cellMine.status === Status.Flag && cellMine.minesAround != -1)
          return false;
      }
    }
    return true;
  }

}
