export class ResetGameButton {
  constructor(game, board_display) {
    this.html = document.getElementById("reset_button");

    this.html.addEventListener("click", () => {
      game.resetGame();
      board_display.resetDisplay(game.pieces);
    });
  }
}
