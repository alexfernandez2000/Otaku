import { Component, inject, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardService } from '../core/services/minesweeper/board.service';
import { CellMine, Status } from '../models/cellmine';
import { TimerComponent } from '../timer/timer.component';
@Component({
  selector: 'app-minesweeper',
  imports: [CommonModule,TimerComponent],
  templateUrl: './minesweeper.component.html',
  styleUrl: './minesweeper.component.css'
})
export class MinesweeperComponent {
  minesweeperService: BoardService = inject(BoardService);
  @ViewChild(TimerComponent) timerComponent!: TimerComponent;
  Status = Status;
  showAround(cellMine: CellMine) {
    this.minesweeperService.unlockAround(cellMine);
  }
  onRightClick(event: MouseEvent, cellMine: CellMine): void {
    event.preventDefault();
    this.minesweeperService.insertFlag(cellMine);
  }

 async click(cellMine: CellMine) 
  {
    await this.minesweeperService.unlockCell(cellMine);
  }

  async startGame() {
    await this.minesweeperService.startGame();
    this.minesweeperService.onWin$.subscribe(()=>this.winAction());
    this.minesweeperService.onGameOver$.subscribe(() =>this.gameOverAction());
    await this.timerComponent.resetTimer();
    await this.timerComponent.startTimer();
  }
  async winAction()
  {
    await this.timerComponent.stopTimer();
    alert("you win");
  }
  async gameOverAction()
  {
    await this.timerComponent.stopTimer();
    await alert("you lose");
  }
  
}
