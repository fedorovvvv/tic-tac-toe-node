import * as rl from 'readline';
import { drawBoard, initBoard } from './board/board.js';
import { checkConditions } from './logic/conditionsLogic.js';
import { changePlayer } from './logic/changePlayerLogic.js';
import * as dotenv from 'dotenv';
import drawError from './utils/drawError.js';

dotenv.config();

const board = initBoard();

let currentPlayer = process.env.FIRST_PLAYER;

const rlInstance = rl.createInterface({
    input: process.stdin,
    output: process.stdout
  });

const gameLoop = () => {
    drawBoard(board);

    rlInstance.question(`${' '.repeat(8)}Print the row and the column for your sign (row, column): `, (ans) => {
        const [row, column] = ans.split(',');

        const isConditions = checkConditions(row, column, board);

        if ( isConditions ) {
          board[+row - 1][+column - 1] = currentPlayer;
          currentPlayer = changePlayer(currentPlayer);
          gameLoop();
        } else {
          setTimeout(() => {
            gameLoop()
          }, 5000)
        }
    })  
}

gameLoop();