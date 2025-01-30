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
  disableRightClick : boolean = false;
  showAround(cellMine: CellMine) {
    this.minesweeperService.unlockAround(cellMine);
  }
  onRightClick(event: MouseEvent, cellMine: CellMine): void {
    event.preventDefault();
    if(!this.disableRightClick)
      this.minesweeperService.insertFlag(cellMine);
  }

 async click(cellMine: CellMine) {
   await this.minesweeperService.unlockCell(cellMine);
  }

  async startGame() {
    await this.minesweeperService.startGame();
    this.minesweeperService.onWin = async () => await this.winAction();
    this.minesweeperService.onGameOver = async () => await this.gameOverAction();
    await this.timerComponent.resetTimer();
    await this.timerComponent.startTimer();
    this.disableRightClick=false;
  }
  async winAction()
  {
   await this.timerComponent.stopTimer();
    alert("you win");
  }
  async gameOverAction()
  {
    alert("you lose");
    await this.timerComponent.stopTimer();
    await this.disableButtons();
  }
  
  private async disableButtons()
  {
    const botones = document.querySelectorAll('button');
    const divs = document.querySelectorAll('div.grid-item');
    divs.forEach(div =>{
      const buttons = div.querySelectorAll('button');
      buttons.forEach(button=>
        {
          if(button instanceof HTMLButtonElement)
            button.disabled=true;    
        })
    });
    this.disableRightClick=true;
  }
}
