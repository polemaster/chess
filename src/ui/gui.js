import { BOARD_SIZE, PIECE_IMAGES } from "constants";
import { Square } from "logic/square";

export class GUI {
  constructor(game) {
    this.game = game;
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
    img.classList.add("piece");
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
    this.addClickListener();
    this.addDragStartListener();
    this.addDragEndListener();
    this.addDragOverListener();
    this.addDragDropListener();
  }

  addClickListener() {
    this.html_board.addEventListener("click", (event) => {
      const square = this.identifySquare(event);
      console.log(`Square clicked: ${square}`);
      this.game.clicked(square);
    });
  }

  addDragStartListener() {
    this.html_board.addEventListener("dragstart", (event) => {
      const square = this.identifySquare(event);
      console.log(`Dragging from: ${square}`);
      this.game.clicked(square);
    });
  }

  addDragEndListener() {
    this.html_board.addEventListener("dragend", (event) => {
      this.game.resetMove();
    });
  }

  addDragDropListener() {
    this.html_board.addEventListener("drop", (event) => {
      const square = this.identifySquare(event);
      console.log(`Dragged to: ${square}`);
      this.game.clicked(square);
    });
  }

  addDragOverListener() {
    this.html_board.addEventListener("dragover", (event) => {
      event.preventDefault();
    });
  }

  identifySquare(event) {
    let square_id;
    if (event.target.classList.contains("square")) {
      square_id = event.target.id;
    } else if (event.target.classList.contains("piece")) {
      square_id = event.target.parentNode.id;
    }
    return square_id;
  }

  endGame(result) {
    console.log("The UI updating after game end...");
  }
}
