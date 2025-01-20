import { BOARD_SIZE, PIECE_IMAGES } from "constants";
import { Square } from "logic/square";

export class ChessUI {
  constructor(game, pieces) {
    this.game = game;
    this.createBoard();
    this.renderStartingPosition(pieces);
    this.addEventListeners();
  }

  createBoard() {
    this.html_board = document.getElementById("chessboard");

    for (let row = 0; row < BOARD_SIZE; row++) {
      for (let col = 0; col < BOARD_SIZE; col++) {
        const square = new Square(row, col);
        const html_square = document.createElement("div");

        html_square.classList.add("square");

        if (square.label.text) {
          const label = document.createElement("div");
          label.textContent = square.label.text;
          label.classList.add(
            "square-label",
            square.label.color,
            square.label.position,
          );
          html_square.appendChild(label);

          // If it is the "a1" square with two labels, we need to add a second <div> element here
          if (row === 7 && col === 0) {
            const label2 = document.createElement("div");
            label2.textContent = "1";
            label2.classList.add(
              "square-label",
              square.label.color,
              "top-left",
            );
            html_square.appendChild(label2);
          }
        }

        html_square.classList.add(square.color + "-square");
        html_square.id = square.square;

        this.html_board.appendChild(html_square);
      }
    }
  }

  createPiece(square, path) {
    const html_square = document.getElementById(square);
    const img = document.createElement("img");
    img.src = path;
    html_square.appendChild(img);
  }

  renderStartingPosition(pieces) {
    for (const piece of pieces) {
      this.createPiece(
        piece.square,
        PIECE_IMAGES[piece.color + "_" + piece.type],
      );
    }
  }

  addEventListeners() {
    this.html_board.addEventListener("click", (event) => {
      const position = event.target.dataset.position;
      if (position) {
        this.handleSquareClick(position);
      }
    });
  }

  handleSquareClick(position) {
    const [row, col] = position.split("-").map(Number);
    console.log(`Square clicked: ${row}, ${col}`);
    // Pass this input to the game logic for processing
  }
}
