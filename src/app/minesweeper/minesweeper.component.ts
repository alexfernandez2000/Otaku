import { Component, Inject, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CellMine, Status } from '../models/cellmine';
import { TimerComponent } from '../timer/timer.component';
import { MINESWEEPER_BOARD_SERVICE_TOKEN, MINESWEEPER_GAME_SERVICE_TOKEN } from '../app.tokens';
import { IBoardService } from '../core/services/minesweeper/interfaces/board.service.interface';
import { IGameService } from '../core/services/minesweeper/interfaces/game.service.interface';
import { BoardService } from '../core/services/minesweeper/board.service';
import { GameService } from '../core/services/minesweeper/game.service';
@Component({
  selector: 'app-minesweeper',
  imports: [CommonModule,TimerComponent],
  templateUrl: './minesweeper.component.html',
  styleUrl: './minesweeper.component.css',
  providers: [{provide: MINESWEEPER_BOARD_SERVICE_TOKEN, useClass: BoardService},
    {provide: MINESWEEPER_GAME_SERVICE_TOKEN, useClass: GameService}
  ]
  
})
export class MinesweeperComponent {
  @ViewChild(TimerComponent) timerComponent!: TimerComponent;
  Status = Status;
  board: CellMine[][]=[];
  constructor(
    @Inject(MINESWEEPER_BOARD_SERVICE_TOKEN) private minesweeperBoard : IBoardService,
    @Inject(MINESWEEPER_GAME_SERVICE_TOKEN) private minesweeperGame : IGameService)
  {}

  showAround(cellMine: CellMine) {
    this.minesweeperGame.unlockAround(cellMine);
  }
  onRightClick(event: MouseEvent, cellMine: CellMine): void {
    event.preventDefault();
    this.minesweeperGame.insertFlag(cellMine);
  }

 async click(cellMine: CellMine) 
  {
    this.minesweeperGame.revealCell(cellMine);
  }

  async startGame() {
    this.minesweeperBoard.initializeBoard(10,10);
    this.minesweeperGame.onWin$.subscribe(()=>this.winAction());
    this.minesweeperGame.onGameOver$.subscribe(() =>this.gameOverAction());
    this.board=this.minesweeperBoard.getBoard();
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
