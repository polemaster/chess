import { BoardDisplay } from "./board_display.js";
import { Sound } from "./sound.js";
import { ResetGameButton } from "./reset_button.js";
import { PIECE_IMAGES } from "constants";

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

  replacePiece(square, new_piece) {
    this.removePiece(square);
    this.board_display.createPiece(
      square,
      PIECE_IMAGES[new_piece.color + "_" + new_piece.type],
    );
  }

  showMoves(piece) {
    console.log("Showing moves of", piece.name);
    const squares = piece
      .getPossibleMoves(this.game.board)
      .filter((square) => this.game.isValidMove(piece, square));
    for (const square of squares) {
      const html_square = document.getElementById(square);
      const circle = document.createElement("div");
      const has_image = html_square.querySelector("img");
      if (!has_image) circle.classList.add("possible_move");
      else circle.classList.add("possible_capture");
      html_square.appendChild(circle);
    }
  }

  resetShowingMoves() {
    const squares = document.querySelectorAll(
      ".possible_move, .possible_capture",
    );
    squares.forEach((square) => square.remove());
  }

  getPromotionPiece(piece, square) {
    return new Promise((resolve) => {
      // Extract column and define target squares
      const col = square.charAt(0);
      let rows = null;
      square.charAt(1) === "8" ? (rows = [8, 7, 6, 5]) : (rows = [1, 2, 3, 4]);
      // const rows = [8, 7, 6, 5];
      const tmp_img_squares = rows.map((row) => col + row);
      const html_squares = tmp_img_squares.map((square) =>
        document.getElementById(square),
      );
      const piece_types = ["queen", "knight", "rook", "bishop"];

      // Track selected piece
      let selected = null;

      html_squares.forEach((square) => {
        const img = square.querySelector("img");
        if (img) img.style.display = "none";
      });

      // Show promotion pieces
      tmp_img_squares.forEach((square, i) => {
        const html_square = html_squares[i];

        // Display promotion piece
        const piece_type = piece_types[i];
        this.board_display.createPiece(
          square,
          PIECE_IMAGES[piece.color + "_" + piece_type],
          "tmp-img",
        );

        // Handle user selection
        html_square.addEventListener(
          "click",
          (event) => {
            event.stopPropagation(); // Prevent event from propagating to parent listeners

            selected = piece_type;

            // Remove temporary images
            document
              .querySelectorAll(".tmp-img")
              .forEach((img) => img.remove());

            // Show the original image if it was there before
            html_squares.forEach((square) => {
              const img = square.querySelector("img");
              if (img) img.style.display = "";
            });

            resolve(selected);
          },
          { once: true },
        );
      });

      // Get all board squares other than the 4 with new pieces
      const squares = document.querySelectorAll(".square");
      const filtered_squares = Array.from(squares).filter(
        (square) => !tmp_img_squares.includes(square.id),
      );

      filtered_squares.forEach((square) => {
        square.addEventListener(
          "click",
          () => {
            document
              .querySelectorAll(".tmp-img")
              .forEach((img) => img.remove());

            // Show the original image if it was there before
            html_squares.forEach((square) => {
              const img = square.querySelector("img");
              if (img) img.style.display = "";
            });

            resolve(null);
          },
          { once: true },
        );
      });
    });
  }

  endGame(result) {
    console.log("The UI updating after game end...");
    this.board_display.makeTransparent(0.6);
  }
}
