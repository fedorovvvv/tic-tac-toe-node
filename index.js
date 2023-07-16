import * as rl from 'readline';
import { drawBoard, initBoard } from './board/board.js';
import { checkConditions } from './logic/conditionsLogic.js';
import { changePlayer } from './logic/changePlayerLogic.js';

const board = initBoard();

let currentPlayer = 'X'

const rlInstance = rl.createInterface({
    input: process.stdin,
    output: process.stdout
  });

const gameLoop = () => {

    drawBoard(board);

    rlInstance.question('Print the row and the column for your sign (row, column): ', (ans) => {
        const [row, column] = ans.split(',');

        const isConditions = checkConditions(row, column);

        if ( isConditions ) {
          board[+row - 1][+column - 1] = currentPlayer;
          currentPlayer = changePlayer(currentPlayer);
          gameLoop();
        }
    })  
}

gameLoop();