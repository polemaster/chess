import { BOARD_SIZE } from "constants";
import { Pawn, Rook, Knight, Bishop, Queen, King } from "pieces/index.js";

export class Board {
  #pieces;

  constructor() {
    this.#pieces = [];
  }

  toJSON() {
    return {
      pieces: this.pieces.map((piece) => ({
        color: piece.color,
        type: piece.type,
        square: piece.square,
      })),
    };
  }

  get pieces() {
    return this.#pieces;
  }

  set pieces(value) {
    this.#pieces = value;
  }

  createStartingPosition(pieces) {
    if (this.pieces.length > 0) {
      console.log("Pieces:", this.pieces);
      throw new Error("Pieces already exist");
    }

    // If loading pieces from a saved state
    if (pieces) {
      this.copyPieces(pieces);
      return this.pieces;
    }

    // Pawns
    for (let i = 0; i < BOARD_SIZE; i++) {
      this.createPiece("pawn", String.fromCharCode(i + 97) + "7", "black");
      this.createPiece("pawn", String.fromCharCode(i + 97) + "2", "white");
    }

    // Rest of the pieces
    this.createPiece("rook", "a1", "white");
    this.createPiece("rook", "h1", "white");
    this.createPiece("rook", "a8", "black");
    this.createPiece("rook", "h8", "black");

    this.createPiece("knight", "b1", "white");
    this.createPiece("knight", "g1", "white");
    this.createPiece("knight", "b8", "black");
    this.createPiece("knight", "g8", "black");

    this.createPiece("bishop", "c1", "white");
    this.createPiece("bishop", "f1", "white");
    this.createPiece("bishop", "c8", "black");
    this.createPiece("bishop", "f8", "black");

    this.createPiece("king", "e1", "white");
    this.createPiece("king", "e8", "black");

    this.createPiece("queen", "d1", "white");
    this.createPiece("queen", "d8", "black");

    return this.pieces;
  }

  createPiece(type, square, color) {
    let new_piece = null;
    switch (type) {
      case "king":
        new_piece = new King(square, color);
        break;
      case "queen":
        new_piece = new Queen(square, color);
        break;
      case "rook":
        new_piece = new Rook(square, color);
        break;
      case "bishop":
        new_piece = new Bishop(square, color);
        break;
      case "knight":
        new_piece = new Knight(square, color);
        break;
      case "pawn":
        new_piece = new Pawn(square, color);
        break;
      default:
        console.log("Unrecognized piece type to create");
    }
    this.pieces.push(new_piece);

    return new_piece;
  }

  copyPieces(pieces) {
    for (const piece of pieces) {
      this.createPiece(piece.type, piece.square, piece.color);
    }
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

  resetBoard() {
    this.pieces = [];
  }
}
