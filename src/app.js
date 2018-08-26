import './assets/scss/app.scss';
// import './react-app';

// Draw a square on screen.
import { createjs } from '@createjs/easeljs';
import Game from './game/game';
const stage = new createjs.Stage('game');
const BUBBLE_SIZE = 50;
const POSSIBLE_COLORS = [
  '#44D7A8', // Green
  '#DA2647', // Red
  '#FFFF66', // Yellow
  '#4F86F7', // Blue
];

const game = new Game(6, 4);


const repaint = () => {
  // background
  const bg = new createjs.Shape();
  bg.graphics.beginFill('black').drawRect(0, 0, stage.canvas.width, stage.canvas.height);
  stage.addChild(bg);
  // bubbles
  const BUBBLE_RADIUS = BUBBLE_SIZE/2 * 0.9;
  const BUBBLE_MARGIN = BUBBLE_SIZE - BUBBLE_RADIUS*2;
  for(let y = 0; y < game.dimy; y++) {
    for(let x = 0; x < game.dimx; x++) {
      const bubble = new createjs.Shape();
      bubble.graphics.beginFill(POSSIBLE_COLORS[game.grid[y][x]]).drawCircle(BUBBLE_RADIUS + BUBBLE_MARGIN + x*BUBBLE_SIZE, BUBBLE_RADIUS + BUBBLE_MARGIN + y*BUBBLE_SIZE, BUBBLE_RADIUS);
      bubble.addEventListener('click', event => { console.log(`Clicked on ${x},${y}`) })
      stage.addChild(bubble);
    }
  }
  stage.update();
};
const resize = () => {
  stage.canvas.width = window.innerWidth;
  stage.canvas.height = window.innerHeight;
  repaint();
};
window.addEventListener('resize', resize, false);
window.addEventListener('load', event => {
  resize();
});