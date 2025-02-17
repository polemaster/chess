import { BOARD_SIZE, PIECE_IMAGES } from "constants";
import { Square } from "logic/square";

export class BoardDisplay {
  constructor(game) {
    this.game = game;
    this.html_board = document.getElementById("chessboard");
  }

  createBoard() {
    for (let row = 0; row < BOARD_SIZE; row++) {
      for (let col = 0; col < BOARD_SIZE; col++) {
        const square = new Square(row, col);
        const html_square = document.createElement("div");

        html_square.classList.add("square"); // needed for CSS styling and creating CSS grid

        // If the square needs to have a label (row or col number), add it to the square
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

        html_square.classList.add(square.color + "-square"); // needed for CSS styling
        html_square.id = square.square; // needed for accessing squares (in game logic)

        this.html_board.appendChild(html_square);
      }
    }
  }

  createPiece(square, path, img_class) {
    const html_square = document.getElementById(square);
    const img = document.createElement("img");
    img.src = path;
    img.classList.add("piece");
    if (img_class) img.classList.add(img_class);
    html_square.appendChild(img);
  }

  addPiecesImages(pieces) {
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

  resetDisplay(pieces) {
    // First, remove all images from the board
    const images = this.html_board.querySelectorAll("img");

    images.forEach((image) => image.remove());

    // Then render all images again
    this.addPiecesImages(pieces);
    this.makeTransparent(1);

    // Remove previous move
    const prev_move = document.querySelectorAll(".previous-move");
    prev_move.forEach((square) => square.classList.remove("previous-move"));
  }

  makeTransparent(value) {
    this.html_board.style.opacity = value;
  }
}
