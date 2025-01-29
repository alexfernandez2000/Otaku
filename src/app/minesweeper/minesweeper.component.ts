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
  Status = Status;

  showAround(cellMine: CellMine) {
    this.minesweeperService.unlockAround(cellMine);
  }
  onRightClick(event: MouseEvent, cellMine: CellMine): void {
    event.preventDefault();
    if(this.minesweeperService.activeGame)
      this.minesweeperService.insertFlag(cellMine);
    console.log(this.minesweeperService.activeGame)
  }

  click(cellMine: CellMine) {
    this.minesweeperService.unlockCell(cellMine);
  }

  startGame() {
    this.minesweeperService.initializeBoard();
  }

}
