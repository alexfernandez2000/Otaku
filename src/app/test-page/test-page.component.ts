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

async restart() {
 await this.timerComponent.resetTimer();
}
async stop() {
 await this.timerComponent.stopTimer();
}
async start() {
await this.timerComponent.startTimer();
}

}
