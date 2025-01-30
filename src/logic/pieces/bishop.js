import { Piece } from "./piece.js";

export class Bishop extends Piece {
  constructor(starting_square, color) {
    super(starting_square, color);
    this.type = "bishop";
    this.name = `${color} ${this.type}`;
    this.directions = ["up-left", "up-right", "down-left", "down-right"];
  }
}
