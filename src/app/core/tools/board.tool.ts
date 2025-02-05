  export const DIRECTIONS = [
    [-1, -1], [-1, 0], [-1, 1], // Upper row
    [0, -1], [0, 1],            // Same row, left and right
    [1, -1], [1, 0], [1, 1],    // Lower row
  ];
  export function isValidPosition(row: number, col: number, board: any[][]): boolean {
    return row >= 0 && row < board.length && col >= 0 && col < board[0].length;
  }
  