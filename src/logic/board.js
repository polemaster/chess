import { Square } from "logic/square";
import { BOARD_SIZE } from "constants";
import { Pawn, Rook, Knight, Bishop, Queen, King } from "pieces/index.js";

export class Board {
  constructor() {
    this.html_board = document.getElementById("chessboard");
    this.pieces = [];
  }

  createStartingPosition() {
    // Pawns
    for (let i = 0; i < BOARD_SIZE; i++) {
      this.createPiece(new Pawn(String.fromCharCode(i + 97) + "7", "black"));
      this.createPiece(new Pawn(String.fromCharCode(i + 97) + "2", "white"));
    }

    // Rest of the pieces
    this.createPiece(new Rook("a1", "white"));
    this.createPiece(new Rook("h1", "white"));
    this.createPiece(new Rook("a8", "black"));
    this.createPiece(new Rook("h8", "black"));

    this.createPiece(new Knight("b1", "white"));
    this.createPiece(new Knight("g1", "white"));
    this.createPiece(new Knight("b8", "black"));
    this.createPiece(new Knight("g8", "black"));

    this.createPiece(new Bishop("c1", "white"));
    this.createPiece(new Bishop("f1", "white"));
    this.createPiece(new Bishop("c8", "black"));
    this.createPiece(new Bishop("f8", "black"));

    this.createPiece(new King("e1", "white"));
    this.createPiece(new King("e8", "black"));

    this.createPiece(new Queen("d1", "white"));
    this.createPiece(new Queen("d8", "black"));

    return this.pieces;
  }

  createPiece(piece) {
    this.pieces.push(piece);
  }

  // 1 argument: square (a1, a2, etc.)
  // 2 arguments: col, row ([a, 1], [a, 2], etc.)
  getPiece(...args) {
    if (arguments.length === 1) {
      const square = args[0];
      for (let piece of this.pieces) {
        if (piece.square === square) return piece;
      }
    } else if (arguments.length === 2) {
      const [col, row] = args;
      for (let piece of this.pieces) {
        if (piece.square === `${col}${row}`) return piece;
      }
    }
    return null;
  }

  removePiece(square) {
    const index = this.pieces.findIndex((piece) => piece.square === square);
    if (index !== -1) {
      console.log(`Removed ${this.pieces[index].name} from ${square}`);
      this.pieces.splice(index, 1);
    }
  }

  isEmpty(...args) {
    if (this.getPiece(...args)) {
      return false;
    }
    return true;
  }

  isSameColorPiece(square, color) {
    if (!this.isEmpty(square)) {
      const piece = this.getPiece(square);
      if (piece && piece.color === color) {
        return true;
      }
    }
    return null;
  }

  isDifferentColorPiece(square, color) {
    if (!this.isEmpty(square)) {
      const piece = this.getPiece(square);
      if (piece && piece.color !== color) {
        return true;
      }
    }
    return null;
  }
}
