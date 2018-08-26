const NUM_COLORS = 4;

class Game {
  constructor(cols_total, rows_total) {
    this.dimx = cols_total;
    this.dimy = rows_total;
    this.grid = [];
    for(let row = 0; row < rows_total; row++) {
      let grid_row = [];
      for(let col = 0; col < cols_total; col++) {
        grid_row.push(this._getRandomColorCode());
      }
      this.grid.push(grid_row);
    }
    console.log(this.toString());
  }

  _getRandomColorCode() {
    return Math.floor(Math.random()*NUM_COLORS);
  }

  toString() {
    return this.grid.map(line => line.join('')).join('\n');
  }
}
export default Game;