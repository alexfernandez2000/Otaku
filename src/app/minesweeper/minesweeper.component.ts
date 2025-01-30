import { Component, inject, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MinesweeperService } from '../../services/minesweeper.service';
import { CellMine, Status } from '../models/cellmine';
import { TimerComponent } from '../timer/timer.component';
@Component({
  selector: 'app-minesweeper',
  imports: [CommonModule,TimerComponent],
  templateUrl: './minesweeper.component.html',
  styleUrl: './minesweeper.component.css'
})
export class MinesweeperComponent {
  minesweeperService: MinesweeperService = inject(MinesweeperService);
  @ViewChild(TimerComponent) timerComponent!: TimerComponent;
  Status = Status;

  showAround(cellMine: CellMine) {
    this.minesweeperService.unlockAround(cellMine);
  }
  onRightClick(event: MouseEvent, cellMine: CellMine): void {
    event.preventDefault();
    if(this.minesweeperService.activeGame)
      this.minesweeperService.insertFlag(cellMine);
  }

 async click(cellMine: CellMine) {
   await this.minesweeperService.unlockCell(cellMine);
  }

  async startGame() {
    await this.minesweeperService.initializeBoard();
    await this.timerComponent.startTimer();
  }

}
