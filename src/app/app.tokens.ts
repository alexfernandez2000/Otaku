import { InjectionToken } from '@angular/core';
import { IBoardService } from './core/services/minesweeper/interfaces/board.service.interface';
import { IGameService } from './core/services/minesweeper/interfaces/game.service.interface';
import { IGameLogApi } from './core/services/api/interfaces/gamelog.api.interface';
import { IGameLogService } from './core/services/minesweeper/interfaces/gamelog.service.interface';
import { IGameApi } from './core/services/api/interfaces/game.api.interface';

export const MINESWEEPER_BOARD_SERVICE_TOKEN = new InjectionToken<IBoardService>('BoardService');
export const MINESWEEPER_GAME_SERVICE_TOKEN = new InjectionToken<IGameService>('GameService');
export const API_GAMELOG_TOCKEN = new InjectionToken<IGameLogApi>('GameLogApi');
export const API_GAME_TOCKEN = new InjectionToken<IGameApi>('GameApi');
export const MINESWEEPER_GAMELOG_SERVICE_TOKEN = new InjectionToken<IGameLogService>('GameLogService');
