import { GameLog } from "./gamelog";

export class Game{
    id: number;
    name: string;
    gameLogs: GameLog[];
  
    constructor(id: number, name: string, gameLogs: GameLog[] = []) {
      this.id = id;
      this.name = name;
      this.gameLogs = gameLogs;
    }
  
}