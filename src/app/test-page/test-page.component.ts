import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimerComponent } from '../timer/timer.component';

@Component({
  selector: 'app-test-page',
  imports: [CommonModule, TimerComponent],
  templateUrl: './test-page.component.html',
  styleUrl: './test-page.component.css'
})
export class TestPageComponent {
  @ViewChild(TimerComponent) timerComponent!: TimerComponent;

restart() {
  this.timerComponent.resetTimer();
}
stop() {
  this.timerComponent.stopTimer();
}
start() {
this.timerComponent.startTimer();
}

}
