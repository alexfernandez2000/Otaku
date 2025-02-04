import { CellMine } from "../../../models/cellmine";

export interface IBoardService {
    initializeBoard(size: number, mines: number): void;
    getBoard(): CellMine[][];
  }
  