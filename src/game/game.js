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
    this.score = 0;
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
        return colorCode === ' ' ? null : new Piece(colorCode);
      });
    });
    this.dimy = this.grid.length;
    this.dimx = this.grid[0].length;
  }

  clickOn(x,y) {
    // ignore clicks on empty spaces
    if(this.grid[y][x] === null) return;
    if(this.grid[y][x].selected) {
      this.destroyPieces();
    } else {
      this.selectPieces(x,y);
    }
  }

  selectPieces(x, y) {
    // ignore clicks on empty spaces
    if(this.grid[y][x] === null) return;
    // reset 
    this.grid.forEach(line => {
      line.forEach(piece => {
        if(piece === null) return;
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
        if(neighbor === null || neighbor.visited) return;
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

  destroyPieces() {
    let currentValue = 10;
    for(let y = 0; y < this.dimy; y++) {
      for(let x = 0; x < this.dimx; x++) {
        if(this.grid[y][x] === null) continue;
        if(this.grid[y][x].selected) {
          this.score += currentValue;
          currentValue += 10;
          this.grid[y][x] = null;
        }
      }
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