import { GUI } from "./gui.js";
import { Sound } from "./sound.js";

export class ChessUI {
  constructor(game, pieces) {
    this.game = game;

    this.gui = new GUI(game);
    this.gui.createBoard();
    this.gui.renderStartingPosition(pieces);
    this.gui.addEventListeners();

    this.sound = new Sound(game);
    this.sound.addEventListeners();
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
    const squares = piece.getPossibleMoves(this.game.board);
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
