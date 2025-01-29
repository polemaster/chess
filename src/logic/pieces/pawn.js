import * as Utils from "utils";
import { Piece } from "./piece.js";

export class Pawn extends Piece {
  constructor(starting_square, color) {
    super(starting_square, color);
    this.type = "pawn";
    this.name = `${color} ${this.type}`;
    this.direction = this.color === "white" ? "up" : "down";
    this.capture_directions =
      this.color === "white"
        ? ["up-left", "up-right"]
        : ["down-left", "down-right"];
    this.starting_row = this.color === "white" ? 2 : 7;
  }

  getPossibleMoves(board) {
    let moves = [];
    const diagonal_moves = [];

    const row = Number(this.square[1]);

    // Do a move for black
    if (this.color === "black" || this.color === "white") {
      // Add moves in forward direction
      if (row === this.starting_row) {
        moves.push(
          ...Utils.getSquares(
            board,
            this.square,
            this.color,
            this.direction,
          ).slice(0, 2),
        );
      } else {
        moves.push(
          Utils.getSquares(board, this.square, this.color, this.direction)[0],
        );
      }

      // Remove the moves forward if there is an enemy there
      for (let i = moves.length - 1; i >= 0; i--) {
        if (
          !board.isEmpty(moves[i]) &&
          board.getPiece(moves[i]).color !== this.color
        ) {
          moves.splice(i, 1);
        }
      }

      // Add capturing possibilities
      diagonal_moves.push(
        Utils.getSquare(
          board,
          this.square,
          this.color,
          this.capture_directions[0],
        ),
      );
      diagonal_moves.push(
        Utils.getSquare(
          board,
          this.square,
          this.color,
          this.capture_directions[1],
        ),
      );
    } // Do a move for white
    else if (this.color === "white") {
      // Add moves in forward direction
      if (row === 2) {
        moves.push(
          ...Utils.getSquares(board, this.square, this.color, "up").slice(0, 2), // get two first moves up
        );
      } else {
        moves.push(Utils.getSquares(board, this.square, this.color, "up")[0]); // get one first move up
      }

      // Remove the moves forward if there is an enemy there
      for (let i = moves.length - 1; i >= 0; i--) {
        if (
          !board.isEmpty(moves[i]) &&
          board.getPiece(moves[i]).color !== this.color
        ) {
          moves.splice(i, 1);
        }
      }

      // Add capturing possibilities
      diagonal_moves.push(
        Utils.getSquare(board, this.square, this.color, "up-left"),
      );
      diagonal_moves.push(
        Utils.getSquare(board, this.square, this.color, "up-right"),
      );
    }

    // Pawns can move diagonally only if it is a capture
    for (const capture of diagonal_moves) {
      if (board.isDifferentColorPiece(capture, this.color)) {
        moves.push(capture);
      }
    }

    return moves;
  }
}
