import { HttpClient } from "@angular/common/http";
import { GenericApi } from "./generic.api";
import { IApiGame } from "./interfaces/game.api.interface";
import { Game } from "./models/game";

export class ApiGame extends GenericApi<Game> implements IApiGame
{
    override apiUrl: string = "https://localhost:7174/api/Game";
    constructor(http: HttpClient)
    {
        super(http);
    }
}