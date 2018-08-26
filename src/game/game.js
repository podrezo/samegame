const NUM_COLORS = 4;

class Piece {
  constructor(color) {
    this.color = color || this._getRandomColorCode();
    this.selected = false;
    this.visited = false;
  }
  _getRandomColorCode() {
    return Math.floor(Math.random()*NUM_COLORS);
  }
}

class Game {
  constructor(colsTotal = 0, rowsTotal = 0) {
    this.dimx = colsTotal;
    this.dimy = rowsTotal;
    this.grid = [];
    for(let row = 0; row < rowsTotal; row++) {
      let grid_row = [];
      for(let col = 0; col < colsTotal; col++) {
        grid_row.push(new Piece());
      }
      this.grid.push(grid_row);
    }
  }
  
  setGrid(setup) {
    this.grid = setup.split('\n').map(line => {
      return line.split('').map(colorCode => {
        return new Piece(colorCode);
      });
    });
    this.dimy = this.grid.length;
    this.dimx = this.grid[0].length;
  }

  clickOn(x,y) {
    // reset 
    this.grid.forEach(line => {
      line.forEach(piece => {
        piece.selected = false;
        piece.visited = false;
      });
    });
    const matchColor = this.grid[y][x].color;
    const searchDirections = [
      {x: 1, y: 0}, // right
      {x: -1, y: 0}, // left
      {x: 0, y: 1}, // down
      {x: 0, y: -1}, // up
    ];
    // initialize queue
    let q = [{x, y}];
    while(q.length > 0) {
      let c = q.pop();
      this.grid[c.y][c.x].selected = true;
      searchDirections.forEach(dir => {
        // check for out-of-bounds cases
        if(c.y + dir.y < 0 || c.y + dir.y >= this.dimy) return;
        if(c.x + dir.x < 0 || c.x + dir.x >= this.dimx) return;
        let neighbor =  this.grid[c.y + dir.y][c.x + dir.x];
        if(neighbor.visited) return;
        neighbor.visited = true;
        if(neighbor.color === matchColor) {
          q.unshift({
            x: c.x + dir.x,
            y: c.y + dir.y,
          });
        }
      });
    }
  }

  toString() {
    return this.grid.map(line => {
      return line.map(piece => {
        if(piece === null) {
          return ' ';
        } else {
          return piece.selected ? '*' : piece.color;
        }
      }).join('');
    }).join('\n');
  }
}
export default Game;