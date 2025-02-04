import { InjectionToken } from '@angular/core';
import { IBoardService } from './core/services/minesweeper/interfaces/board.service.interface';
import { IGameService } from './core/services/minesweeper/interfaces/game.service.interface';

export const MINESWEEPER_BOARD_SERVICE_TOKEN = new InjectionToken<IBoardService>('BoardService');
export const MINESWEEPER_GAME_SERVICE_TOKEN = new InjectionToken<IGameService>('GameService');