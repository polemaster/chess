export class Piece {
  constructor(starting_square, color) {
    this.square = starting_square;
    this.color = color;
  }
  possibleMoves(square) {}
  move(square) {
    this.square = square;
  }
}
