import { Component, Inject, inject, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CellMine, Status } from '../models/cellmine';
import { TimerComponent } from '../timer/timer.component';
import { MINESWEEPER_BOARD_SERVICE_TOKEN } from '../app.tokens';
import { IBoardService } from '../core/services/minesweeper/interfaces/board.service.interface';
@Component({
  selector: 'app-minesweeper',
  imports: [CommonModule,TimerComponent],
  templateUrl: './minesweeper.component.html',
  styleUrl: './minesweeper.component.css'
})
export class MinesweeperComponent {
  @ViewChild(TimerComponent) timerComponent!: TimerComponent;
  Status = Status;
  constructor(@Inject(MINESWEEPER_BOARD_SERVICE_TOKEN) private minesweeperBoard : IBoardService)
  {}

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
