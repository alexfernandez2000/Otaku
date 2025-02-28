import { GameId } from "../../../tools/board.tool";

export interface IGameLogService{
    registerGameLog(time : string,gameId : GameId) : void;
}