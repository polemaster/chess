import { Piece } from "./piece.js";

export class Queen extends Piece {
  constructor(starting_square, color) {
    super(starting_square, color);
    this.type = "queen";
    this.name = `${color} ${this.type}`;
    this.directions = [
      "up",
      "down",
      "left",
      "right",
      "up-left",
      "up-right",
      "down-left",
      "down-right",
    ];
  }
}
