import { Board } from "logic/board";
import * as Utils from "utils";

export class Game {
  #ui;

  constructor(board, state) {
    this.board = board;
    this.current_turn = state?.current_player ? state.current_player : "white";
    this.#ui = null;
    this.piece_to_move = null;
    this.is_end = false;
    this.pieces_moved = state?.pieces_moved ? state.pieces_moved : {};
  }

  get ui() {
    return this.#ui;
  }

  set ui(value) {
    this.#ui = value;
  }

  get pieces() {
    return this.board.pieces;
  }

  // Handles click when a square is clicked
  clicked(square) {
    this.ui.resetShowingMoves();
    const piece = this.board.getPiece(square);

    // If clicked the same square, cancel the move
    if (this.piece_to_move && square === this.piece_to_move.square) {
      this.piece_to_move = null;
    }
    // Else if the move
    else if (
      this.piece_to_move && // has already started and
      (!piece || piece.color !== this.piece_to_move.color) // the square is either empty or contains enemy piece,
    ) {
      // atempt to make a move
      console.log("Making move...");
      this.makeMove(this.piece_to_move, square);
      this.resetMove();
    }
    // Else if this square contains a piece of our color, start making a move
    else if (piece && piece.color === this.current_turn) {
      console.log("Started moving " + piece.name);
      this.ui.showMoves(piece);
      this.piece_to_move = piece;
    }
    console.log();
  }

  resetMove() {
    console.log("Resetting clicked piece...");
    this.piece_to_move = null;
  }

  async makeMove(piece, to) {
    const from = piece.square;

    // Return if the move is invalid
    if (!this.isValidMove(piece, to)) {
      return;
    }

    // Handle pawn promotion
    if (this.isPromotion(piece)) {
      console.log("Promoting pawn...");

      // Wait until the Promise from getPromotionPiece is resolved
      const selected_piece = await this.ui.getPromotionPiece(piece, to);
      console.log("selected piece:", selected_piece);

      if (!selected_piece) {
        console.log("Cancelling selection");
        return;
      }

      // Once the Promise is resolved, continue with the promotion logic
      const new_piece = this.promotePawn(piece, selected_piece);
      console.log("new piece:", new_piece);
      this.board.removePiece(piece.square);
      piece = new_piece;
      this.ui.replacePiece(piece.square, piece);
    }

    // If castle, move the rook behind the king
    if (this.isCastle(piece, to)) {
      console.log("Castled");
      const rook_square = (to.charAt(0) === "c" ? "a" : "h") + to.charAt(1);
      const rook = this.board.getPiece(rook_square);
      const new_rook_square = (to.charAt(0) === "c" ? "d" : "f") + to.charAt(1);

      rook.move(new_rook_square);
      this.ui.movePiece(rook_square, new_rook_square);
    }

    // Check if it is a capture
    if (this.isCapture(this.board, to)) {
      console.log("Capturing...", this.board.getPiece(to));
      this.ui.removePiece(to);
      this.board.removePiece(to);
    }

    // Move the piece
    piece.move(to);
    this.ui.movePiece(from, to);

    // Switch turns
    this.current_turn = this.current_turn === "white" ? "black" : "white";

    // Update pieces moved (required for castling)
    if (piece.type === "king") this.pieces_moved[piece.color + "_king"] = true;
    if (piece.type === "rook")
      this.pieces_moved[piece.color + "_" + piece.square.charAt(0) + "_rook"] =
        true;

    this.saveState();

    // Check for the end condition
    if (this.isEnd()) {
      console.log("Game ended");
      this.is_end = true;
      this.ui.endGame("");
    }
  }

  isValidMove(piece, square) {
    // Copy the board (deep copy)
    const tmp_board = new Board();
    tmp_board.copyPieces(this.pieces);

    // Find the piece to move in the copied board
    const new_piece = tmp_board.pieces.filter(
      (p) => p.square === piece.square,
    )[0];

    // If the move is a capture, remove the captured piece
    if (this.isCapture(tmp_board, square)) {
      tmp_board.removePiece(square);
    }

    new_piece.move(square);

    // If after a move, the king is checked, it is invalid
    if (this.isCheck(tmp_board, piece.color)) {
      return false;
    }

    return this.getPiecePossibleMoves(piece).includes(square);
  }

  // Returns true if "color"'s king is being checked
  isCheck(board, color) {
    const king = board.pieces.filter(
      (p) => p.color === color && p.type === "king",
    )[0];
    const opposite_color = color === "white" ? "black" : "white";
    const opposite_pieces = board.pieces.filter(
      (p) => p.color === opposite_color,
    );

    for (const piece of opposite_pieces) {
      const moves = piece.getPossibleMoves(board);
      for (const move of moves) {
        if (move === king.square) {
          return true;
        }
      }
    }

    return false;
  }

  // Checks if any piece of given "color" attacks a "square"
  isAttacked(square, color) {
    const pieces = this.pieces.filter((piece) => piece.color === color);

    for (const piece of pieces) {
      if (piece.getPossibleMoves(this.board).includes(square)) return true;
    }

    return false;
  }

  isCapture(board, square) {
    if (board.getPiece(square)) {
      return true;
    }
    return false;
  }

  isCastle(piece, square) {
    if (
      piece.type === "king" &&
      Math.abs(piece.square.charCodeAt(0) - square.charCodeAt(0)) === 2
    )
      return true;
    return false;
  }

  canCastle(king, rook) {
    // check if the rook is a rook
    if (!rook || rook.type !== "rook") return false;

    // this guarantees that both king and rook haven't moved from their original square
    if (
      this.pieces_moved[king.color + "_king"] ||
      this.pieces_moved[rook.color + "_" + rook.square.charAt(0) + "_rook"]
    )
      return false;

    // Find squares between the king and the rook
    let min = Math.min(king.square.charCodeAt(0), rook.square.charCodeAt(0));
    let max = Math.max(king.square.charCodeAt(0), rook.square.charCodeAt(0));
    const squares_between = Array.from(
      { length: max - min - 1 },
      (_, i) => String.fromCharCode(min + i + 1) + king.square.charAt(1),
    );

    if (!squares_between.every((square) => !this.board.getPiece(square)))
      return false;

    // Now we need to find if kings passes through an attacked square
    const closer_square_col = rook.square.charAt(0) === "a" ? "d" : "f";
    const closer_square = closer_square_col + king.square.charAt(1);

    if (this.isAttacked(closer_square, Utils.getOppositeColor(king.color)))
      return false;

    return true;
  }

  isPromotion(piece) {
    if (piece.type === "pawn") {
      const end_row = piece.starting_row === 2 ? "7" : "2";
      if (piece.square.charAt(1) === end_row) return true;
    }
    return false;
  }

  promotePawn(piece, new_type) {
    return this.board.createPiece(new_type, piece.square, piece.color);
  }

  isEnd() {
    const white = this.getNumberOfValidMoves("white");
    const black = this.getNumberOfValidMoves("black");

    if (white === 0 || black === 0) return true;

    return false;
  }

  getPiecePossibleMoves(piece, board = this.board) {
    const moves = piece.getPossibleMoves(board);

    // find rooks for castling
    const a_rook = board.getPiece("a" + piece.square.charAt(1));
    const h_rook = board.getPiece("h" + piece.square.charAt(1));

    // short castling
    if (piece.type === "king" && this.canCastle(piece, a_rook)) {
      moves.push(
        String.fromCharCode(piece.square.charCodeAt(0) - 2) +
          piece.square.charAt(1),
      );
    }

    // long castling
    if (piece.type === "king" && this.canCastle(piece, h_rook)) {
      moves.push(
        String.fromCharCode(piece.square.charCodeAt(0) + 2) +
          piece.square.charAt(1),
      );
    }

    // en passant
    if (piece.type === "pawn" && piece.can_enpassant) {
      // implement en passant
    }
    return moves;
  }

  // For each piece check all of its moves and count only valid ones
  getNumberOfValidMoves(color) {
    const pieces = this.pieces.filter((p) => p.color === color);
    let result = 0;
    for (const piece of pieces) {
      result += piece
        .getPossibleMoves(this.board)
        .filter((p) => this.isValidMove(piece, p)).length;
    }
    return result;
  }

  saveState() {
    console.log("Saving state...");
    const state = {
      board: this.board,
      current_player: this.current_turn,
      pieces_moved: this.pieces_moved,
    };
    sessionStorage.setItem("board_state", JSON.stringify(state));
  }

  resetGame() {
    this.board.resetBoard();
    this.board.createStartingPosition();
    this.current_turn = "white";
    this.piece_to_move = null;
    this.is_end = false;
    this.pieces_moved = {};
    sessionStorage.clear();
    console.log("Game resetted");
  }
}
