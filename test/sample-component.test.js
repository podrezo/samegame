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
  let game;
  beforeEach(() => {
    game = new Game();
    game.setGrid('120\n000');
  });
  test('clickOn selects correct pieces (single)', () => {
    game.clickOn(0,0);
    expect(game.toString()).toEqual('*20\n000');
  });
  test('clickOn selects correct pieces (multiple)', () => {
    game.clickOn(2,0);
    expect(game.toString()).toEqual('12*\n***');
  });
  test('clickOn selects correct pieces after second click', () => {
    game.clickOn(2,0);
    expect(game.toString()).toEqual('12*\n***');
    game.clickOn(0,0);
    expect(game.toString()).toEqual('*20\n000');
  });
  test('clickOn selects correct pieces (complex)', () => {
    game.setGrid('1110\n1001\n1110');
    game.clickOn(0,1);
    expect(game.toString()).toEqual('***0\n*001\n***0');
  });
});

