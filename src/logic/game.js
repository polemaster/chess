export class Game {
  #ui;

  constructor(board) {
    this.board = board;
    this.current_turn = "white";
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

    // Check for the end condition
    if (this.isEnd()) {
      console.log("Game ended");
      this.is_end = true;
      this.#ui.endGame(result);
    }
  }

  isValidMove(piece, dst_square) {
    // const tmp_board = board.simulate_move(piece, dst_square);
    // if (this.isCheck(tmp_board)) return false;
    return piece.getPossibleMoves(this.board).includes(dst_square);
  }

  isCapture(square) {
    if (this.board.getPiece(square)) {
      return true;
    }
    return false;
  }

  isEnd() {
    return false;
  }

  startGame() {}
}
