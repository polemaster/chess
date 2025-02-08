import { ChessUI } from "ui/chess_ui.js";
import { Game } from "logic/game";
import { Board } from "logic/board";

function loadState() {
  console.log("Loading state...");
  return JSON.parse(sessionStorage.getItem("board_state"));
}

const state = loadState();
const board = new Board();

board.createStartingPosition(state?.board?.pieces);

const game = new Game(board, state);

game.ui = new ChessUI(game, board.pieces);
