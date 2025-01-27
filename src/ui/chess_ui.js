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
    console.log("Removing ", square);
    document.querySelector(`#${square} img`).remove();
  }
}
