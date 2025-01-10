import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MinesweeperService {
mines: number = 10;
board: HTMLButtonElement[][]=[];
boardSize: number=10;
  async Click() {
  }
  initializeBoard()
  {
    this.board = [];
    this.StartBoard();

  }
  private async StartBoombs()
  {
    console.log("Ejntra start bombs");

  }
  private async StartBoard()
  {
    console.log("Ejntra start board");
    for (let col = 0; col < this.boardSize; col++) {
      this.board[col]=[];
      for (let row = 0; row < this.boardSize; row++) {
        const button = document.createElement("button") as HTMLButtonElement;
        button.setAttribute('status',Status.Bloqued);
        this.board[col][row] = button;
      }  
    };
  }
  private async ShowAdjacentCells() {
    
  }
  private async ShowCell(){

  }

  async ClickTest(edad: number): Promise<boolean> {
    return await edad >= 18;
  }
  }
  enum Status {
    Unlocked='Unlocked',
    Bloqued='Bloqued',
    Flag='Flag',
  }
