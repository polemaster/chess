import { ChessUI } from "gui/chess_ui.js";
import { ChessGame } from "logic/game";
import { Board } from "logic/board";

const board = new Board();
const starting_pieces = board.createStartingPosition();
// board.createBoard();
const game = new ChessGame(board);
game.startGame();

const ui = new ChessUI(game, starting_pieces);

ui.handleSquareClick = (position) => {
  const [row, col] = position.split("-").map(Number);
  // Use game logic to handle moves
  try {
    game.makeMove(
      [
        ,/* fromRow */
        /* fromCol */
      ],
      [row, col],
    );
    ui.updateBoard(game.board); // Update the display
  } catch (error) {
    console.error(error.message);
  }
};

const pieces = document.querySelectorAll(".piece");
const squares = document.querySelectorAll(".square");

let draggedPiece = null;

// Handle drag start
pieces.forEach((piece) => {
  piece.addEventListener("dragstart", (e) => {
    draggedPiece = e.target;
    setTimeout(() => {
      draggedPiece.style.display = "none"; // Hide piece while dragging
    }, 0);
  });

  piece.addEventListener("dragend", () => {
    draggedPiece.style.display = "block"; // Show piece after drop
    draggedPiece = null;
  });
});

// Handle drag over square
squares.forEach((square) => {
  square.addEventListener("dragover", (e) => {
    e.preventDefault(); // Allow drop
  });

  square.addEventListener("drop", () => {
    if (draggedPiece) {
      square.appendChild(draggedPiece);
    }
  });
});
