import * as Utils from "utils";
import { Piece } from "./piece.js";

export class King extends Piece {
  constructor(starting_square, color) {
    super(starting_square, color);
    this.type = "king";
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
  getPossibleMoves(board) {
    let moves = [];
    for (const direction of this.directions) {
      moves.push(Utils.getSquare(board, this.square, this.color, direction));
    }
    moves = moves.filter((move) => move !== null);

    return moves;
  }
}
