export class Square {
  constructor(row, col) {
    this.column = col;
    this.row = row;
    this.color = (this.row + this.column) % 2 === 0 ? "light" : "dark";
    this.square = `${String.fromCharCode(97 + this.column)}${8 - this.row}`;

    // Create a label (object) for the square
    this.label = { text: "", position: "" };
    if (row === 7) {
      this.label.text = this.square[0];
      this.label.position = "bottom-right";
    } else if (col === 0) {
      this.label.text = this.square[1];
      this.label.position = "top-left";
    }
    this.label.color = this.color === "light" ? "light" : "dark";
  }
}
