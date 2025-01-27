export class Game {
  #ui;

  constructor(board) {
    this.board = board;
    this.current_turn = "white";
    this.#ui = null;
    this.started_move = false;
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

  clicked(square) {
    if (this.started_move) {
      console.log("Making move...");
      this.makeMove(this.started_move, square);
      this.resetMove();
    } else if (this.getPiece(square)) {
      console.log("Started moving " + this.getPiece(square));
      this.started_move = square;
    }
  }

  resetMove() {
    console.log("Resetting move...");
    this.started_move = null;
  }

  makeMove(from, to) {
    if (from === to) return;

    const piece = this.getPiece(from);

    // Return if the move is invalid
    if (!this.isValidMove(piece, from, to)) {
      // this.ui.stopDrag()
      return;
    }

    // Check if it is a capture
    if (this.isCapture(to)) {
      console.log("Capturing...", this.getPiece(to));
      this.ui.removePiece(to);
      this.removePiece(to);
    }

    // Move the piece
    piece.move(to);
    this.ui.movePiece(from, to);

    // Switch turns
    this.current_turn = this.current_turn === "white" ? "black" : "white";

    // Check for the end condition
    if (this.isEnd()) {
      console.log("Game ended");
      this.is_end = true;
      this.#ui.endGame(result);
    }
  }

  isValidMove(piece, from, to) {
    // Implement chess rules for move validation
    return true; // Simplified for brevity
  }

  isCapture(square) {
    if (this.getPiece(square)) {
      return true;
    }
    return false;
  }

  getPiece(square) {
    for (let piece of this.pieces) {
      if (piece.square === square) return piece;
    }
    return null;
  }

  removePiece(square) {
    const index = this.pieces.findIndex((piece) => piece.square === square);
    if (index !== -1) {
      console.log("removed piece at", index);
      this.pieces.splice(index, 1);
    }
  }

  isEnd() {
    return false;
  }

  startGame() {}
}
