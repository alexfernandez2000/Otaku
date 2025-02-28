import { Game } from "./game";

export class GameLog{
    id: number;
    playedTime: string;
    fkIdGame: number;
    fkIdGameNavigation?: Game;
  
    constructor( playedTime: string, fkIdGame: number, fkIdGameNavigation?: Game,id?: number) {
      this.id = id ?? 0;
      this.playedTime = playedTime;
      this.fkIdGame = fkIdGame;
      this.fkIdGameNavigation = fkIdGameNavigation;
    }
  
}