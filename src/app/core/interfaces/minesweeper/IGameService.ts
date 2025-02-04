import { CellMine } from "../../../models/cellmine";

export interface IGameService {
    revealCell(cell: CellMine): void;
    insertFlag(cell: CellMine): void;
  }
  