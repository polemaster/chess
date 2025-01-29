import { BOARD_SIZE } from "constants";

// Return a square in the line direction from the given square distanced at "num"
// Return null if the square is invalid or occupied by a piece of the same color
function getSquare(board, square, color, direction, num = 1) {
  const [col, row_str] = square.split("");
  const row = parseInt(row_str);

  let next_row, next_col;

  switch (direction) {
    case "up":
      next_row = row + num;
      next_col = col;
      break;
    case "down":
      next_row = row - num;
      next_col = col;
      break;
    case "left":
      next_row = row;
      next_col = String.fromCharCode(col.charCodeAt(0) - num);
      break;
    case "right":
      next_row = row;
      next_col = String.fromCharCode(col.charCodeAt(0) + num);
      break;
    case "up-left":
      next_row = row + num;
      next_col = String.fromCharCode(col.charCodeAt(0) - num);
      break;
    case "up-right":
      next_row = row + num;
      next_col = String.fromCharCode(col.charCodeAt(0) + num);
      break;
    case "down-left":
      next_row = row - num;
      next_col = String.fromCharCode(col.charCodeAt(0) - num);
      break;
    case "down-right":
      next_row = row - num;
      next_col = String.fromCharCode(col.charCodeAt(0) + num);
      break;
  }

  const next_square = `${next_col}${next_row}`;

  // Check if out of bounds
  if (
    next_col > String.fromCharCode("a".charCodeAt(0) + BOARD_SIZE - 1) ||
    next_col < "a" ||
    next_row < 1 ||
    next_row > BOARD_SIZE
  )
    return null;

  // Check if the square is occupied by a piece of the same color
  if (board.isSameColorPiece(next_square, color)) return null;

  return next_square;
}

// Return all squares in one line direction up to a piece that blocks the path (if it is a different color, include it)
function getSquares(board, square, color, direction) {
  const result = [];
  let curr_square = square;

  for (let i = 0; i < BOARD_SIZE; i++) {
    let next_square;
    switch (direction) {
      case "up":
        next_square = getSquare(board, curr_square, color, "up");
        break;
      case "down":
        next_square = getSquare(board, curr_square, color, "down");
        break;
      case "left":
        next_square = getSquare(board, curr_square, color, "left");
        break;
      case "right":
        next_square = getSquare(board, curr_square, color, "right");
        break;
      case "up-left":
        next_square = getSquare(board, curr_square, color, "up-left");
        break;
      case "up-right":
        next_square = getSquare(board, curr_square, color, "up-right");
        break;
      case "down-left":
        next_square = getSquare(board, curr_square, color, "down-left");
        break;
      case "down-right":
        next_square = getSquare(board, curr_square, color, "down-right");
        break;
    }

    // Stop if we go out of bounds or encounter a square with a piece of the same color
    if (!next_square) {
      break;
    }

    // If the piece on the next square is of the opposite color, it is the last square
    if (!board.isEmpty(next_square)) {
      result.push(next_square);
      break;
    }

    result.push(next_square);
    curr_square = next_square;
  }

  return result;
}

export { getSquare, getSquares };
