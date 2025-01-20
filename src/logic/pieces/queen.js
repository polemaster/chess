import { Piece } from "./piece.js";

export class Queen extends Piece {
  constructor(starting_square, color) {
    super(starting_square, color);
    this.type = "queen";
  }
}
