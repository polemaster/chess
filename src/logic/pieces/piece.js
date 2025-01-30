import * as Utils from "utils";

export class Piece {
  constructor(starting_square, color) {
    this.square = starting_square;
    this.color = color;
    this.directions = [];
  }
  getPossibleMoves(board) {
    const moves = [];
    for (const direction of this.directions) {
      moves.push(
        ...Utils.getSquares(board, this.square, this.color, direction),
      );
    }
    return moves;
  }
  move(square) {
    this.square = square;
  }
}
