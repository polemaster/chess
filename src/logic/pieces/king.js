import { Piece } from "./piece.js";

export class King extends Piece {
  constructor(starting_square, color) {
    super(starting_square, color);
    this.type = "king";
  }
}
