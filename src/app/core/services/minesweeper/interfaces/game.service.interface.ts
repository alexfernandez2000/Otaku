import { Subject } from "rxjs";
import { CellMine } from "../models/cellmine";

export interface IGameService {
    onWin$: Subject<void>;
    onGameOver$: Subject<void>;
    revealCell(cell: CellMine): void;
    insertFlag(cell: CellMine): void;
    unlockAround(cell: CellMine): void;
  }
  