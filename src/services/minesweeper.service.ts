import { Injectable } from '@angular/core';
import { CellMine, Status } from '../app/models/cellmine';
@Injectable({
  providedIn: 'root'
})
export class MinesweeperService {
  //Win when unlock all de cells in the board.
  mines: number = 10;
  board: CellMine[][] = [];
  boardSize: number = 10;
  onGameOver: (() => void) | null = null;  // Action when lose
  onWin: (() => void) | null = null;  // Action when win

  private directions = [
    [-1, -1], [-1, 0], [-1, 1], // Fila de arriba
    [0, -1], [0, 1],  // Misma fila, izquierda y derecha
    [1, -1], [1, 0], [1, 1],   // Fila de abajo
  ];
//#region Board initialization
public async startGame() {
  await this.startBoard();
  await this.placeBoombs();
  await this.setNumber();
}
private async setNumber() {
  for (let row = 0; row < this.board.length; row++) {
    for (let col = 0; col < this.board[row].length; col++) {
      if (this.board[row][col].Value === -1)
        continue;
      this.board[row][col].Value = await this.countBoombsArround(row, col);
    }
  }
}

private async placeBoombs() {
  for (let i = 0; i < this.mines; i++) {
    let colRandomValue: number = Math.floor(Math.random() * this.boardSize);
    let rowRandomValue: number = Math.floor(Math.random() * this.boardSize);
    let cell: CellMine = this.board[colRandomValue][rowRandomValue];
    if (cell.Value === -1) {
      i--;
      continue;
    }
    this.board[rowRandomValue][colRandomValue].Value = -1;
  }
}

private async startBoard() {
  this.board = [];
  for (let row = 0; row < this.boardSize; row++) {
    this.board[row] = [];
    for (let col = 0; col < this.boardSize; col++) {
      const button = new CellMine(Status.Bloqued, 0);
      this.board[row][col] = button;
    }
  };
}

//#endregion
  public async insertFlag(cellMine: CellMine) {
    if (cellMine.Status === Status.Bloqued) {
      cellMine.Status = Status.Flag;
      this.checkWin();
    }
    else if (cellMine.Status === Status.Flag)
      cellMine.Status = Status.Bloqued;
  }
  public async unlockCell(cellMine: CellMine) {
    if (cellMine.Status !== Status.Bloqued)
      return;

    cellMine.Status = Status.Unloqued;

    switch (cellMine.Value) {
      case 0://Empty
        await this.unlockAround(cellMine);
        break;
      case -1://Bomb
        if (this.onGameOver) {
          await this.onGameOver(); 
        } 
        break;
    }
    this.checkWin();
  }
  public async unlockAround(cellMine: CellMine) {
    const index = await this.findColRow(cellMine);
    if (index == undefined)
      return;
    for (const [row, col] of this.directions) {
      const newRow = index?.row + row
      const newCol = index?.col + col;
      if
        (
        newRow >= 0 && newRow < this.board.length
        && newCol >= 0 && newCol < this.board[0].length
      )
        this.unlockCell(this.board[newRow][newCol]);
    }
  }
  private async checkWin() {
    if (await this.isWin())
    {
      if(this.onWin)
        await this.onWin();
    }
  }

  private async findColRow(cellMine: CellMine): Promise<{ row: number; col: number } | null> {
    for (let row = 0; row < this.board.length; row++) {
      const col = this.board[row].findIndex(cell => cell === cellMine);
      if (col !== -1) {
        return { row: row, col: col }; // Retorna las coordenadas
      }
    }
    return null; // Si no encuentra el objeto
  }

  private async isWin(): Promise<Boolean> {
    for (let row = 0; row < this.boardSize; row++) {
      for (let col = 0; col < this.boardSize; col++) {
        const cellMine = this.board[row][col];

        if (cellMine.Status === Status.Bloqued)
          return false;
        if (cellMine.Status === Status.Flag && cellMine.Value != -1)
          return false;
      }
    }
    return true;
  }
  private async countBoombsArround(fila: number, columna: number): Promise<number> {
    // Definimos las posibles direcciones (arriba, abajo, izquierda, derecha, diagonales)

    let contador = 0;

    // Iteramos sobre todas las direcciones
    for (const [row, col] of this.directions) {
      const newRow = fila + row;
      const newCol = columna + col;

      // Comprobamos si la posición vecina está dentro de los límites de la matriz
      if (
        newRow >= 0 &&
        newRow < this.board.length &&
        newCol >= 0 &&
        newCol < this.board[0].length
      ) {
        // Si el valor en la posición vecina es -1, aumentamos el contador
        if (this.board[newRow][newCol].Value === -1) {
          contador++;
        }
      }
    }
    return contador;
  }
}

