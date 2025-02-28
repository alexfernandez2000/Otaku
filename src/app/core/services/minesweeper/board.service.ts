import { Injectable } from '@angular/core';
import { CellMine, Status } from './models/cellmine';
import {DIRECTIONS, isValidPosition} from '../../tools/board.tool'
import { IBoardService } from './interfaces/board.service.interface';
@Injectable({
  providedIn: 'root'
})
export class BoardService implements IBoardService {
  private board: CellMine[][] = [];
  private boardSize: number = 10;
  public getBoard(): CellMine[][]
  {
    return this.board;
  }
  public async initializeBoard(size: number, mines: number) {

    this.startBoard();
    this.placeBombs(mines);
    this.setNumber();
  }
  private startBoard() {
    this.board = [];
    for (let row = 0; row < this.boardSize; row++) {
      this.board[row] = [];
      for (let col = 0; col < this.boardSize; col++) {
        const button = new CellMine(Status.Blocked, 0, row, col);
        this.board[row][col] = button;
      }
    };
  }
  private setNumber() {
    for (const row of this.board) {
      for (const cell of row) {
        if (cell.isBomb)
          continue;
        cell.minesAround = this.countBombsArround(cell);
      }
    }
  }
  private countBombsArround(cellMine: CellMine): number {
    let bombCount = 0;

    // Iterate all posible directions from a single cell
    for (const [rowDirection, colDirection] of DIRECTIONS) {
      const newRow = cellMine.row + rowDirection;
      const newCol = cellMine.col + colDirection;

      // Check if the neighbors cells is valid
      if (isValidPosition(newRow, newCol,this.board))
        if (this.board[newRow][newCol].isBomb)
          bombCount++;
    }
    return bombCount;
  }
  private placeBombs(mines : number) {
    for (let i = 0; i < mines; i++) {
      let colRandomValue: number = Math.floor(Math.random() * this.boardSize);
      let rowRandomValue: number = Math.floor(Math.random() * this.boardSize);
      let cell: CellMine = this.board[colRandomValue][rowRandomValue];
      if (cell.isBomb) {
        i--;
        continue;
      }
      this.board[rowRandomValue][colRandomValue].isBomb = true;
    }
  }
}

