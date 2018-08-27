import './assets/scss/app.scss';
// import './react-app';

(() => {
  if('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js');
  }
})();

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
const BG_COLOR = '#000000';
const BUBBLE_OUTLINE_WIDTH = 8;
let game;

const winGame = () => {
  alert(`You win with ${game.score} points!`);
  newGame();
};


const repaint = () => {
  // clear stage
  stage.removeAllChildren();
  // background
  const bg = new createjs.Shape();
  bg.graphics.beginFill(BG_COLOR).drawRect(0, 0, stage.canvas.width, stage.canvas.height);
  stage.addChild(bg);
  // bubbles
  const BUBBLE_RADIUS = BUBBLE_SIZE/2 * 0.75;
  const BUBBLE_MARGIN = BUBBLE_SIZE - BUBBLE_RADIUS*2 - BUBBLE_OUTLINE_WIDTH/2;
  for(let y = 0; y < game.dimy; y++) {
    for(let x = 0; x < game.dimx; x++) {
      if(!game.grid[y][x]) continue;
      const hitbox = new createjs.Shape();
      hitbox.graphics.beginFill(BG_COLOR).drawRect(
        x*BUBBLE_SIZE,
        y*BUBBLE_SIZE,
        BUBBLE_SIZE,
        BUBBLE_SIZE,
      );
      hitbox.addEventListener('click', event => {
        game.clickOn(x,y);
        repaint();
      });
      stage.addChild(hitbox);
      // the bubble itself
      const bubble = new createjs.Shape();
      bubble.graphics.beginFill(
        game.grid[y][x].selected ? POSSIBLE_COLORS[(game.grid[y][x]).color] : BG_COLOR
      ).drawCircle(
        BUBBLE_RADIUS + BUBBLE_MARGIN + x*BUBBLE_SIZE,
        BUBBLE_RADIUS + BUBBLE_MARGIN + y*BUBBLE_SIZE,
        BUBBLE_RADIUS
      );
      bubble.graphics.setStrokeStyle(BUBBLE_OUTLINE_WIDTH,'round').beginStroke(
        POSSIBLE_COLORS[(game.grid[y][x]).color]
      ).drawCircle(
        BUBBLE_RADIUS + BUBBLE_MARGIN + x*BUBBLE_SIZE,
        BUBBLE_RADIUS + BUBBLE_MARGIN + y*BUBBLE_SIZE,
        BUBBLE_RADIUS
      );
      stage.addChild(bubble);
    }
  }
  // display score
  const text = new createjs.Text(game.score.toString(), '20px Helvetica', 'white');
  const textBounds = text.getBounds();
  text.x = stage.canvas.width - textBounds.width;
  text.y = 0;
  stage.addChild(text);
  // render
  stage.update();
};
const resize = () => {
  stage.canvas.width = window.innerWidth;
  stage.canvas.height = window.innerHeight;
  if(game) {
    repaint();
  }
};
window.addEventListener('resize', resize, false);
window.addEventListener('load', event => {
  resize();
  newGame();
});

const newGame = () => {
  const cols = Math.floor(stage.canvas.width / BUBBLE_SIZE);
  const rows = Math.floor(stage.canvas.height / BUBBLE_SIZE);
  game = new Game(winGame, cols, rows);
  repaint();
}