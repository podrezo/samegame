import Game from '../src/game/game';

describe('constructor', () => {
  test('sets size with correct x/y', () => {
    const game = new Game(4, 3);
    expect(game.dimx).toBe(4);
    expect(game.dimy).toBe(3);
    expect(game.grid.length).toBe(3);
    expect(game.grid[0].length).toBe(4);
    expect(game.grid[1].length).toBe(4);
    expect(game.grid[2].length).toBe(4);
  });
});

describe('setGrid', () => {
  test('setGrid', () => {
    const game = new Game();
    game.setGrid('000\n011');
    expect(game.toString()).toEqual('000\n011');
  });
});

describe('clickOn', () => {
  test('empty space click', () => {
    const game = new Game();
    game.setGrid(' ');
    game.clickOn(0,0);
  });
  test('first click selects, second click destroys', () => {
    const game = new Game();
    game.setGrid('000');
    game.clickOn(0,0);
    expect(game.toString()).toEqual('***');
    game.clickOn(0,0);
    expect(game.toString()).toEqual('   ');
  });
  test('changing selection', () => {
    const game = new Game();
    game.setGrid('01');
    game.clickOn(0,0);
    expect(game.toString()).toEqual('*1');
    game.clickOn(1,0);
    expect(game.toString()).toEqual('0*');
  });
});

describe('_selectPieces', () => {
  let game;
  beforeEach(() => {
    game = new Game();
    game.setGrid('120\n000');
  });
  test('_selectPieces works if empty spot clicked', () => {
    game.setGrid('  \n  ');
    game._selectPieces(0,0);
    expect(game.toString()).toEqual('  \n  ');
  });
  test('_selectPieces selects correct pieces (single)', () => {
    game._selectPieces(0,0);
    expect(game.toString()).toEqual('*20\n000');
  });
  test('_selectPieces selects correct pieces (multiple)', () => {
    game._selectPieces(2,0);
    expect(game.toString()).toEqual('12*\n***');
  });
  test('_selectPieces selects correct pieces (complex)', () => {
    game.setGrid('1110\n1001\n1110');
    game._selectPieces(0,1);
    expect(game.toString()).toEqual('***0\n*001\n***0');
  });
});

describe('_destroyPieces', () => {
  let game;
  beforeEach(() => {
    game = new Game();
    game.setGrid('1110\n1001\n1110');
    game._selectPieces(0,0);
  });
  test('all selected pieces are destroyed', () => {
    game._destroyPieces();
    expect(game.toString()).toEqual('   0\n 001\n   0');
  });
});

describe('_fallPieces', () => {
  let game;
  beforeEach(() => {
    game = new Game();
    game.setGrid('   0\n 001\n   0');
  });
  test('pieces fall down', () => {
    game._fallPieces();
    expect(game.toString()).toEqual('   0\n   1\n 000');
  });
});