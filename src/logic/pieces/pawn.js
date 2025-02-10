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
    this.en_passant = null;
  }

  getPossibleMoves(board) {
    let moves = [];
    const diagonal_moves = [];

    const row = Number(this.square[1]);

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
    }

    moves = moves.filter(Boolean);

    // Pawns can move diagonally only if it is a capture
    for (const capture of diagonal_moves) {
      if (board.isDifferentColorPiece(capture, this.color)) {
        moves.push(capture);
      }
    }

    return moves;
  }

  enPassant(previous_move) {
    if (!previous_move) return false;
    const { from, to, piece } = previous_move;
    const distance = Math.abs(to.charCodeAt(1) - from.charCodeAt(1));
    const is_adjacent =
      Math.abs(to.charCodeAt(0) - this.square.charCodeAt(0)) === 1;

    if (
      piece.type === "pawn" &&
      distance === 2 &&
      to.charAt(1) === this.square.charAt(1) &&
      is_adjacent
    ) {
      const square_between =
        from.charAt(0) + (from.charAt(1) === "2" ? "3" : "6");

      return {
        move: square_between,
        capture: to,
      };
    }

    return false;
  }
}
