import { ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { API_GAME_TOCKEN, API_GAMELOG_TOCKEN } from './app.tokens';
import { GameLogApi } from './core/services/api/gamelog.api';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { GameApi } from './core/services/api/game.api';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch()),
    { provide: API_GAMELOG_TOCKEN, useClass: GameLogApi },
    { provide: API_GAME_TOCKEN, useClass: GameApi }

    ]
};
