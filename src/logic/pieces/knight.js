import { Piece } from "./piece.js";
import { BOARD_SIZE } from "constants";

export class Knight extends Piece {
  constructor(starting_square, color) {
    super(starting_square, color);
    this.type = "knight";
    this.name = `${color} ${this.type}`;
  }
  getPossibleMoves(board) {
    const moves = [];
    const [col, row_str] = this.square.split("");
    const row = parseInt(row_str);

    // All possible knight move offsets (L-shape)
    const offsets = [
      [-2, -1],
      [-2, 1],
      [2, -1],
      [2, 1],
      [-1, -2],
      [-1, 2],
      [1, -2],
      [1, 2],
    ];

    for (const [row_change, col_change] of offsets) {
      const next_row = row + row_change;
      const next_col = String.fromCharCode(col.charCodeAt(0) + col_change);
      const next_square = `${next_col}${next_row}`;

      // Check if the move is within bounds
      if (
        next_col >= "a" &&
        next_col <= String.fromCharCode("a".charCodeAt(0) + BOARD_SIZE - 1) &&
        next_row >= 1 &&
        next_row <= BOARD_SIZE
      ) {
        // Check if the square is occupied by the same color
        if (!board.isSameColorPiece(next_square, this.color)) {
          moves.push(next_square);
        }
      }
    }
    return moves;
  }
}
