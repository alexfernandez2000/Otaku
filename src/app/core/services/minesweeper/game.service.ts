import { Inject, Injectable } from '@angular/core';
import { CellMine, Status } from './models/cellmine';
import { Subject } from 'rxjs';
import { isValidPosition,DIRECTIONS } from '../../tools/board.tool';
import { MINESWEEPER_BOARD_SERVICE_TOKEN} from '../../../app.tokens';
import { IGameService } from './interfaces/game.service.interface';
import { IBoardService } from './interfaces/board.service.interface';
@Injectable({
  providedIn: 'root'
})
export class GameService implements IGameService{
  onGameOver$ = new Subject<void>();
  onWin$ = new Subject<void>();

  constructor(@Inject(MINESWEEPER_BOARD_SERVICE_TOKEN) private boardService: IBoardService) { }
  
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
    if(cellMine.isBomb)
      {
        this.onGameOver$?.next(); 
        this.removeSuscription
        return;
      }
    else if(cellMine.minesAround===0)
      this.unlockAround(cellMine);      
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
    {
      this.onWin$?.next();
      this.removeSuscription();
    }
  }
  private removeSuscription()
  {
    console.log("unsus");
    this.onWin$?.unsubscribe();
    this.onGameOver$?.unsubscribe();

  }
  private isWin(): Boolean {
    const board = this.boardService.getBoard();
    for (const row of board) {
      for (const cellMine of row) {
        if (cellMine.status === Status.Blocked)
          return false;
        if (cellMine.status === Status.Flag && !cellMine.isBomb)
          return false;
      }
    }
    return true;
  }

}
