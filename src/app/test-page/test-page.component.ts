import { Component, inject } from '@angular/core';
import { MinesweeperService } from '../../services/minesweeper.service';
import { CommonModule } from '@angular/common';
import { CellMine, Status } from '../models/cellmine';

@Component({
  selector: 'app-test-page',
  imports: [CommonModule],
  templateUrl: './test-page.component.html',
  styleUrl: './test-page.component.css'
})
export class TestPageComponent {
    minesweeperService: MinesweeperService = inject(MinesweeperService);
  
  startGame() {
    this.minesweeperService.initializeBoard();

  }

}
