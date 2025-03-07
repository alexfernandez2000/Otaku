import { Game } from "./game";

export class GameLog{
    id: number;
    playedTime: string;
    fkIdGame: number;
  
    constructor( playedTime: string, fkIdGame: number,id?: number) {
      this.id = id ?? 0;
      this.playedTime = playedTime;
      this.fkIdGame = fkIdGame;
    }
  
}