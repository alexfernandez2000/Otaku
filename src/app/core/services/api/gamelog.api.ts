import { IGameLogApi } from "./interfaces/gamelog.api.interface";
import { GameLog } from "./models/gamelog";
import { GenericApi } from "./generic.api";
import { HttpClient } from "@angular/common/http";

export class GameLogApi extends GenericApi<GameLog> implements IGameLogApi {
    override apiUrl: string = "https://localhost:7174/";
    constructor(http: HttpClient)
    {
        super(http);
    }

}