import { Component, Inject } from '@angular/core';
import { GameLog } from '../core/services/api/models/gamelog';
import { API_GAMELOG_TOCKEN, MINESWEEPER_GAMELOG_SERVICE_TOKEN } from '../app.tokens';
import { GameLogService } from '../core/services/minesweeper/gamelog.service';
import { IGameLogService } from '../core/services/minesweeper/interfaces/gamelog.service.interface';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GameLogApi } from '../core/services/api/gamelog.api';
import { IGameLogApi } from '../core/services/api/interfaces/gamelog.api.interface';
import { Game } from '../core/services/api/models/game';

@Component({
  selector: 'app-leaderboard',
  imports: [CommonModule, FormsModule],
  templateUrl: './leaderboard.component.html',
  styleUrl: './leaderboard.component.css',
    providers: [
      {provide: MINESWEEPER_GAMELOG_SERVICE_TOKEN, useClass: GameLogService},
      {provide: API_GAMELOG_TOCKEN,useClass: GameLogApi}
    ]
  
})
export class LeaderboardComponent {
   gameLogs : GameLog[] = [];
   games : Game[] = [];
  constructor(
    @Inject(API_GAMELOG_TOCKEN)private apiGameLog : IGameLogApi,
    @Inject(API_GAME_TOCKEN)
  )
  {}
  ngOnInit()
  {
    this.initializeGameLogs();
    this.initializeGame();
  }
  initializeGameLogs()
  {
    this.apiGameLog.getAll().subscribe({
      next:(data)=>{
        this.gameLogs=data;
      },
      error:(error)=>{
        console.log(error.message);
      }
    })
  }
  initializeGame()
  {
    this.
  }
}
