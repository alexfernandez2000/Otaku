import { Observable } from "rxjs";
import { GameLog } from "../models/gamelog";
import { IGenericApi } from "./generic.api.interface";

export interface IGameLogApi extends IGenericApi<GameLog>{
    getAllWithGame() : Observable<GameLog[]>;
    getByGameId(gameId : number) : Observable<GameLog[]>;
}