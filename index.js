import { ChessUI } from "ui/chess_ui.js";
import { Game } from "logic/game";
import { Board } from "logic/board";

const board = new Board();
const starting_pieces = board.createStartingPosition();
const game = new Game(board);

const ui = new ChessUI(game, starting_pieces);
game.ui = ui;

// game.startGame();
