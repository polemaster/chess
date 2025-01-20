const BOARD_SIZE = 8;

const IMAGES_PATH = "/images";

const PIECE_IMAGES = {
  white_pawn: "white-pawn.svg",
  white_rook: "white-rook.svg",
  white_knight: "white-knight.svg",
  white_bishop: "white-bishop.svg",
  white_queen: "white-queen.svg",
  white_king: "white-king.svg",
  black_pawn: "black-pawn.svg",
  black_rook: "black-rook.svg",
  black_knight: "black-knight.svg",
  black_bishop: "black-bishop.svg",
  black_queen: "black-queen.svg",
  black_king: "black-king.svg",
};

for (const key of Object.keys(PIECE_IMAGES)) {
  PIECE_IMAGES[key] = IMAGES_PATH + "/" + PIECE_IMAGES[key];
}

export { BOARD_SIZE, PIECE_IMAGES };
