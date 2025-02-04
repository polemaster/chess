import { Board } from "logic/board";

export class Game {
  #ui;

  constructor(board, current_player) {
    this.board = board;
    this.current_turn = current_player ? current_player : "white";
    this.#ui = null;
    this.piece_to_move = null;
    this.is_end = false;
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

  makeMove(piece, to) {
    const from = piece.square;

    // Return if the move is invalid
    if (!this.isValidMove(piece, to)) {
      // this.ui.stopDrag()
      return;
    }

    // Check if it is a capture
    if (this.isCapture(to)) {
      console.log("Capturing...", this.board.getPiece(to));
      this.ui.removePiece(to);
      this.board.removePiece(to);
    }

    // Move the piece
    piece.move(to);
    this.ui.movePiece(from, to);

    // Switch turns
    this.current_turn = this.current_turn === "white" ? "black" : "white";

    this.saveState();

    // Check for the end condition
    if (this.isEnd()) {
      console.log("Game ended");
      this.is_end = true;
      this.#ui.endGame(result);
    }
  }

  isValidMove(piece, dst_square) {
    const tmp_board = this.simulateMove(piece, dst_square);
    // if (this.isCheck(tmp_board)) return false;
    return piece.getPossibleMoves(this.board).includes(dst_square);
  }

  simulateMove(piece, square) {
    const tmp_board = new Board();
    // tmp board pieces are not of Piece object - TO-DO: correct it
    // tmp_board.pieces = structuredClone(this.pieces);
    tmp_board.copyPieces(this.pieces);
    console.log("Is check:", this.isCheck(tmp_board));

    // tmp_board.createStartingPosition();
    const pieces = tmp_board.pieces;
    const new_piece = pieces.filter((p) => p.square === piece.square)[0];
  }

  // Returns true if "color"'s king is being checked
  isCheck(board, color) {
    const king = board.pieces.filter(
      (p) => p.color === color && p.type === "king",
    );
    const opposite_color = color === "white" ? "black" : "white";
    const opposite_pieces = board.pieces.filter(
      (p) => p.color === opposite_color,
    );

    for (const piece of board.pieces) {
      const moves = piece.getPossibleMoves(board);
      for (const move of moves) {
        if (move === king.square) return true;
      }
    }

    return false;
  }

  isCapture(square) {
    if (this.board.getPiece(square)) {
      return true;
    }
    return false;
  }

  isEnd() {
    const white = this.getNumberOfValidMoves("white");
    const black = this.getNumberOfValidMoves("black");

    if (white === 0 || black === 0) return true;

    return false;
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
    };
    sessionStorage.setItem("board_state", JSON.stringify(state));
    console.log("Saved state:", JSON.stringify(state));
  }

  resetGame() {
    this.board.resetBoard();
    this.board.createStartingPosition();
    this.current_turn = "white";
    this.piece_to_move = null;
    this.is_end = false;
    console.log("Game resetted");
  }
}
