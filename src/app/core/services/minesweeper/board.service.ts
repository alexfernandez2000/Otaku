import { Injectable } from '@angular/core';
import { CellMine, Status } from '../../../models/cellmine';
import { Subject } from 'rxjs';
import {isValidPosition} from '../../tools/boardTools'
@Injectable({
  providedIn: 'root'
})
export class BoardService {
  mines: number = 10;
  board: CellMine[][] = [];
  boardSize: number = 10;
  //Possible cell directions around a single cell.
  private directions = [
    [-1, -1], [-1, 0], [-1, 1], // Upper row
    [0, -1], [0, 1],  // Same row, left and right
    [1, -1], [1, 0], [1, 1],   // Lower row
  ];
  //#region Board initialization
  public async startGame() {
    this.startBoard();
    this.placeBombs();
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
    for (const [rowDirection, colDirection] of this.directions) {
      const newRow = cellMine.row + rowDirection;
      const newCol = cellMine.col + colDirection;

      // Check if the neighbors cells is valid
      if (isValidPosition(newRow, newCol,this.board))
        if (this.board[newRow][newCol].minesAround === -1)
          bombCount++;
    }
    return bombCount;
  }
  private placeBombs() {
    for (let i = 0; i < this.mines; i++) {
      let colRandomValue: number = Math.floor(Math.random() * this.boardSize);
      let rowRandomValue: number = Math.floor(Math.random() * this.boardSize);
      let cell: CellMine = this.board[colRandomValue][rowRandomValue];
      if (cell.minesAround === -1) {
        i--;
        continue;
      }
      this.board[rowRandomValue][colRandomValue].minesAround = -1;
    }
  }


  //#endregion
}

