import { Inject, Injectable } from "@angular/core";
import { API_GAMELOG_TOCKEN } from "../../../app.tokens";
import { IGameLogService } from "./interfaces/gamelog.service.interface";
import { GameLog } from "../api/models/gamelog";
import { GameId } from "../../tools/board.tool";
import { IGameLogApi } from "../api/interfaces/gamelog.api.interface";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class GameLogService implements IGameLogService
{
  constructor(@Inject(API_GAMELOG_TOCKEN) private gamelogApi: IGameLogApi) { }
  
  public registerGameLog(time : string,gameId : GameId): void 
  {
    const gameLog : GameLog= new GameLog(time,gameId);
    this.gamelogApi.add(gameLog).subscribe(
      {
        next: (data) => {
          console.log(data);
        },
        error: (error) => {
          console.log(error);
          alert(`Error while inserting product:${error.message}`);
        }
  
      }
    );
  } 
}