import { Game } from "./game";

export class GameLog{
    id: number;
    playedTime: string;
    fkIdGame: number;
    fkIdGameNavigation?: Game;
  
    constructor(id: number, playedTime: string, fkIdGame: number, fkIdGameNavigation?: Game) {
      this.id = id;
      this.playedTime = playedTime;
      this.fkIdGame = fkIdGame;
      this.fkIdGameNavigation = fkIdGameNavigation;
    }
  
}