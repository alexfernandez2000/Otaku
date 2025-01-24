import { Injectable } from '@angular/core';
import { CellMine, Status } from '../app/models/cellmine';
@Injectable({
  providedIn: 'root'
})
export class MinesweeperService 
{
  mines: number = 10;
  board: CellMine[][]=[];
  boardSize: number=10;
  private directions = [
    [-1, -1], [-1, 0], [-1, 1], // Fila de arriba
    [0, -1],          [0, 1],  // Misma fila, izquierda y derecha
    [1, -1], [1, 0], [1, 1],   // Fila de abajo
  ];

  public async unlockCell(cellMine : CellMine) 
  {
    if(cellMine.Status !== Status.Bloqued)
      return;
    cellMine.Status = Status.Unloqued;
    switch(cellMine.Value)
    {
      case 0://Empty
        await this.unlockAround(cellMine);
      break;
      case -1://Bomb
        break;
    }
  }

  public async unlockAround(cellMine : CellMine)
  {
    const index = await this.findColRow(cellMine);
    if(index == undefined)
      return;
    for(const [row,col] of this.directions)
    {
      const newRow = index?.row + row
      const newCol= index?.col + col;
      if
      (
        newRow >= 0 && newRow < this.board.length 
        && newCol >= 0 && newCol < this.board[0].length
      )
        this.unlockCell(this.board[newRow][newCol]);
    }
  }

  private async findColRow (cellMine : CellMine): Promise<{ row: number; col: number } | null> {
    for (let row = 0; row < this.board.length; row++) {
      const col = this.board[row].findIndex(cell => cell === cellMine);
      if (col !== -1) {
        return { row: row, col: col }; // Retorna las coordenadas
      }
    } 
    return null; // Si no encuentra el objeto
  }

  public async initializeBoard()
  {
    this.board = [];
    await this.StartBoard();
    await this.PlaceBoombs();
    await this.SetNumber();
  }

  private async SetNumber()
  {
    for (let row = 0; row < this.board.length; row++) {
      for (let col = 0; col < this.board[row].length; col++) 
      {
        if(this.board[row][col].Value===-1)
          continue;
        this.board[row][col].Value = await this.CountBoombsArround(row,col);
      }
    }
  }

  private async PlaceBoombs()
  {
    for (let i = 0; i < this.mines; i++) 
    {
      let colRandomValue : number = Math.floor(Math.random() * this.boardSize);
      let rowRandomValue : number = Math.floor(Math.random() * this.boardSize);
      let cell : CellMine = this.board[colRandomValue][rowRandomValue];
      if (cell.Value === -1)
        {
          i--;
          continue;
        }
      this.board[rowRandomValue][colRandomValue].Value=-1;
      console.log(i);
    }
  }

  private async StartBoard()
  {
    console.log("Entra start board");
    for (let row = 0; row < this.boardSize; row++) 
    {
      this.board[row]=[];
      for (let col = 0; col < this.boardSize; col++) 
      {
        const button = new CellMine(Status.Bloqued,0);
        this.board[row][col] = button;
      }  
    };
  }
  private async CountBoombsArround(fila: number,columna: number): Promise<number> 
  {
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

