import { Component, Inject, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CellMine, Status } from '../core/services/minesweeper/models/cellmine';
import { TimerComponent } from '../timer/timer.component';
import { MINESWEEPER_BOARD_SERVICE_TOKEN, MINESWEEPER_GAME_SERVICE_TOKEN, MINESWEEPER_GAMELOG_SERVICE_TOKEN } from '../app.tokens';
import { IBoardService } from '../core/services/minesweeper/interfaces/board.service.interface';
import { IGameService } from '../core/services/minesweeper/interfaces/game.service.interface';
import { BoardService } from '../core/services/minesweeper/board.service';
import { GameService } from '../core/services/minesweeper/game.service';
import { take } from 'rxjs';
import { IGameLogService } from '../core/services/minesweeper/interfaces/gamelog.service.interface';
import { GameId } from '../core/tools/board.tool';
import { GameLogService } from '../core/services/minesweeper/gamelog.service';
@Component({
  selector: 'app-minesweeper',
  imports: [CommonModule,TimerComponent],
  templateUrl: './minesweeper.component.html',
  styleUrl: './minesweeper.component.css',
  providers: [{provide: MINESWEEPER_BOARD_SERVICE_TOKEN, useClass: BoardService},
    {provide: MINESWEEPER_GAME_SERVICE_TOKEN, useClass: GameService},
    {provide: MINESWEEPER_GAMELOG_SERVICE_TOKEN, useClass: GameLogService}
  ]
  
})
export class MinesweeperComponent {
  @ViewChild(TimerComponent) timerComponent!: TimerComponent;
  Status = Status;
  board: CellMine[][]=[];
  constructor(
    @Inject(MINESWEEPER_GAMELOG_SERVICE_TOKEN) private gameLogService : IGameLogService,
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
    this.gameLogService.registerGameLog("00:00:10",GameId.Minesweeper);
    this.minesweeperBoard.initializeBoard(10,10);
    this.minesweeperGame.onWin$.pipe(take(1)).subscribe(()=>this.winAction());
    this.minesweeperGame.onGameOver$.pipe(take(1)).subscribe(() =>this.gameOverAction());
    this.board=this.minesweeperBoard.getBoard();
    await this.timerComponent.resetTimer();
    await this.timerComponent.startTimer();
  }
  async winAction()
  {
    await this.timerComponent.stopTimer();
    this.gameLogService.registerGameLog(this.timerComponent.getTime(),GameId.Minesweeper);
    alert("you win");
  }
  async gameOverAction()
  {
    await this.timerComponent.stopTimer();
    alert("you lose");
  }
  
}
