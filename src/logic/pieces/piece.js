export class Piece {
  constructor(starting_square, color) {
    this.square = starting_square;
    this.color = color;
  }
  getPossibleMoves(board) {
    throw new Error(
      "Method getPossibleMoves(board) must be defined by each subclass",
    );
  }
  move(square) {
    this.square = square;
  }
}
