import * as rl from 'readline';
import { drawBoard, initBoard } from './board/board.js';
import { checkConditions } from './logic/conditionsLogic.js';
import { changePlayer } from './logic/changePlayerLogic.js';
import * as dotenv from 'dotenv';
import isWin from './logic/checkWin.js';

dotenv.config();

let board = initBoard();

let counter = 0;
let currentPlayer = process.env.FIRST_PLAYER;

const rlInstance = rl.createInterface({
    input: process.stdin,
    output: process.stdout
  });

const gameLoop = () => {
  drawBoard(board);

  if ( counter === 9 ) {
    console.log(' '.repeat(8) + 'Draw!');
    return;
  }

  if ( counter >= 5 && isWin(board)) {
    console.log(' '.repeat(8) + `Player with sign '${changePlayer(currentPlayer)}' won!`);
    rlInstance.question(`${' '.repeat(8)}Do you wanna play again? y/n: `, (ans) => {
      if (ans == 'y') {
        counter = 0;
        currentPlayer = process.env.FIRST_PLAYER;
        board = initBoard();
        gameLoop();
      } else {
        rlInstance.close();
      }
    })
  }

  counter++;

  rlInstance.question(`${' '.repeat(8)}Print the row and the column for your sign (row, column): `, (ans) => {
    const [row, column] = ans.split(',');

    const isConditions = checkConditions(row, column, board);

    if ( isConditions ) {
      board[Number(row) - 1][Number(column) - 1] = currentPlayer;
      currentPlayer = changePlayer(currentPlayer);
    } else {
      setTimeout(gameLoop, 5000);
      return;
    }

    gameLoop();
  });
};  

gameLoop();