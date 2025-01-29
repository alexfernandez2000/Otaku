import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MinesweeperService } from '../../services/minesweeper.service';
import { CellMine, Status } from '../models/cellmine';
@Component({
  selector: 'app-minesweeper',
  imports: [CommonModule],
  templateUrl: './minesweeper.component.html',
  styleUrl: './minesweeper.component.css'
})
export class MinesweeperComponent {
  minesweeperService: MinesweeperService = inject(MinesweeperService);

  showAround(cellMine: CellMine) {
    this.minesweeperService.unlockAround(cellMine);
  }
  onRightClick(event: MouseEvent, cellMine: CellMine): void {
    event.preventDefault();
    this.minesweeperService.insertFlag(cellMine);
  }

  Status = Status;
  click(cellMine: CellMine) {
    this.minesweeperService.unlockCell(cellMine);
  }

  startGame() {
    this.minesweeperService.initializeBoard();
  }

}
