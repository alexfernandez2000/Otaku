import { HttpClient } from "@angular/common/http";
import { GenericApi } from "./generic.api";
import { IGameApi } from "./interfaces/game.api.interface";
import { Game } from "./models/game";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
  })
export class GameApi extends GenericApi<Game> implements IGameApi
{
    override apiUrl: string = "https://localhost:7174/api/Game";
    constructor(http: HttpClient)
    {
        super(http);
    }
}