import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
@Component({
  selector: 'app-timer',
  imports: [CommonModule],
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.css'
})
export class TimerComponent {
  hours: number = 0;
  minutes : number = 0;
  seconds : number = 0;
private intervalId : NodeJS.Timeout|undefined;
  async startTimer() 
  {
    if(this.intervalId == undefined)
      this.intervalId = setInterval(()=>{
        this.seconds++
        if(this.seconds>=60)
        {
          this.seconds=0;
          this.minutes++;
          if(this.minutes>=60)
          {
            this.minutes=0;
            this.hours++;
          }
        }
    }, 1000)
  }
  async stopTimer() 
  {
    clearInterval(this.intervalId);
    this.intervalId = undefined;
  }
  async resetTimer()
  {
    this.hours=0;
    this.minutes=0;
    this.seconds=0;
  }
}