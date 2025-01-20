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

  createBoard() {}
}
