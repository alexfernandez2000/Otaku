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
  async Click() {
  }
  async initializeBoard()
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
  private async ShowAdjacentCells() 
  {
    
  }
  private async ShowCell()
  {

  }

  async ClickTest(edad: number): Promise<boolean> 
  {
    return await edad >= 18;
  }
  private async CountBoombsArround(fila: number,columna: number): Promise<number> 
  {
      // Definimos las posibles direcciones (arriba, abajo, izquierda, derecha, diagonales)
  const direcciones = [
    [-1, -1], [-1, 0], [-1, 1], // Fila de arriba
    [0, -1],          [0, 1],  // Misma fila, izquierda y derecha
    [1, -1], [1, 0], [1, 1],   // Fila de abajo
  ];

  let contador = 0;

  // Iteramos sobre todas las direcciones
  for (const [row, col] of direcciones) {
    const nuevaFila = fila + row;
    const nuevaColumna = columna + col;

    // Comprobamos si la posición vecina está dentro de los límites de la matriz
    if (
      nuevaFila >= 0 &&
      nuevaFila < this.board.length &&
      nuevaColumna >= 0 &&
      nuevaColumna < this.board[0].length
    ) {
      // Si el valor en la posición vecina es -1, aumentamos el contador
      if (this.board[nuevaFila][nuevaColumna].Value === -1) {
        contador++;
      }
    }
  }
  return contador;
  }  
}

