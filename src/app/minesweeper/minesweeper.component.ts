import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MinesweeperService } from '../../services/minesweeper.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-minesweeper',
  imports: [CommonModule],
  templateUrl: './minesweeper.component.html',
  styleUrl: './minesweeper.component.css'
})
export class MinesweeperComponent {
minesweeperService: MinesweeperService = inject(MinesweeperService);

constructor(private sanitizer: DomSanitizer)
{
}

startGame() {
  this.minesweeperService.initializeBoard();
  }
  sanitizeHtml(html: string) {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

}
