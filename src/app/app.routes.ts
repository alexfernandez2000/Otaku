import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { MinesweeperComponent } from './minesweeper/minesweeper.component';

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
    }
];
