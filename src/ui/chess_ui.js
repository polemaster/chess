import { BoardDisplay } from "./board_display.js";
import { Sound } from "./sound.js";
import { ResetGameButton } from "./reset_button.js";

export class ChessUI {
  constructor(game, pieces) {
    this.game = game;

    this.board_display = new BoardDisplay(game);
    this.board_display.createBoard();
    this.board_display.addPiecesImages(pieces);
    this.board_display.addEventListeners();

    this.sound = new Sound(game);
    this.sound.addEventListeners();

    this.reset_button = new ResetGameButton(game, this.board_display);
  }

  movePiece(from, to) {
    const from_square = document.getElementById(from);
    const to_square = document.getElementById(to);

    const img = from_square.querySelector("img");
    to_square.appendChild(img);
  }

  removePiece(square) {
    console.log("Removing image of piece on", square);
    document.querySelector(`#${square} img`).remove();
  }

  showMoves(piece) {
    console.log("Showing moves of", piece.name);
    const squares = piece
      .getPossibleMoves(this.game.board)
      .filter((square) => this.game.isValidMove(piece, square));
    for (const square of squares) {
      console.log(square);
      const html_square = document.getElementById(square);
      const circle = document.createElement("div");
      const has_image = Array.from(html_square.children).some(
        (child) => child.tagName === "IMG",
      );
      if (!has_image) circle.classList.add("possible_move");
      else circle.classList.add("possible_capture");
      html_square.appendChild(circle);
    }
  }

  resetShowingMoves() {
    const squares = document.querySelectorAll(
      ".possible_move, .possible_capture",
    );
    for (const square of squares) {
      square.remove();
    }
  }
}
