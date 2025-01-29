import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { MinesweeperComponent } from './minesweeper/minesweeper.component';
import { TestPageComponent } from './test-page/test-page.component';
import { TimerComponent } from './timer/timer.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        title: 'Home Page'
    },
    {
        path: 'About',
        component: AboutComponent,
        title: 'About Me'
    },
    {
        path: 'Minesweeper',
        component: MinesweeperComponent,
        title: 'Minesweeper'
    },
    {
        path: 'Test',
        component: TestPageComponent,
        title: 'Test Page'
    },
    {
        path: 'Timer',
        component: TimerComponent,
        title: 'Timer'
    }
];
