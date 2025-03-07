import { IGameLogApi } from "./interfaces/gamelog.api.interface";
import { GameLog } from "./models/gamelog";
import { GenericApi } from "./generic.api";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
@Injectable({
    providedIn: 'root'
  })
export class GameLogApi extends GenericApi<GameLog> implements IGameLogApi {
    override apiUrl: string = "https://localhost:7174/api/GameLog";
    constructor(http: HttpClient)
    {
        super(http);
    }
    getAllWithGame(): Observable<GameLog[]> {
            return this.http.get<GameLog[]>(`${this.apiUrl}/GetAllWithGame`);
    }
    

}