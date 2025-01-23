import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MinesweeperService } from '../../services/minesweeper.service';
import {Status} from '../models/cellmine';
@Component({
  selector: 'app-minesweeper',
  imports: [CommonModule],
  templateUrl: './minesweeper.component.html',
  styleUrl: './minesweeper.component.css'
})
export class MinesweeperComponent {
  Status = Status;
minesweeperService: MinesweeperService = inject(MinesweeperService);
startGame() {
  this.minesweeperService.initializeBoard();
  }

}
