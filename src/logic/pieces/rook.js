import { Piece } from "./piece.js";

export class Rook extends Piece {
  constructor(starting_square, color) {
    super(starting_square, color);
    this.type = "rook";
    this.name = `${color} ${this.type}`;
    this.directions = ["up", "down", "left", "right"];
  }
}
