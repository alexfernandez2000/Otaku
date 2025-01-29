import { Component } from '@angular/core';

@Component({
  selector: 'app-timer',
  imports: [],
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.css'
})
export class TimerComponent {
time : Date = new Date(0);
private intervalId : NodeJS.Timeout|undefined;
  async startTimer() 
  {
    console.log("Entra timer");
    //Every second add one secont to the timer
    this.intervalId = setInterval(()=>{
        this.time.setSeconds(this.time.getSeconds())
    }, 1000)
  }
  async stopTimer() 
  {
    clearInterval(this.intervalId);
  }
  async resetTimer()
  {
    this.time=new Date(0);
  }
}