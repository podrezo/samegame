// import React from 'react';
import Game from '../src/game/game';
// import renderer from 'react-test-renderer';

// test('SampleComponent renders', () => {
//   const component = renderer.create(
//     <SampleComponent></SampleComponent>,
//   );
//   let tree = component.toJSON();
//   // expect(tree).toMatchSnapshot();
//   expect(tree.type).toBe('div');
// });

test('Game grid initalization size', () => {
  const game = new Game(4, 3);
  expect(game.dimx).toBe(4);
  expect(game.dimy).toBe(3);
  expect(game.grid.length).toBe(3);
  expect(game.grid[0].length).toBe(4);
  expect(game.grid[1].length).toBe(4);
  expect(game.grid[2].length).toBe(4);
});