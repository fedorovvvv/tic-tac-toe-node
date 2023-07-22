import * as rl from 'readline';
import { drawBoard, initBoard } from './board/board.js';
import { checkConditions } from './logic/conditionsLogic.js';
import { changePlayer } from './logic/changePlayerLogic.js';
import * as dotenv from 'dotenv';
import isWin from './logic/checkWin.js';
import { CONFIG } from './config/index.js';

dotenv.config();

export class TicTacToe {
  board
  counter = 0
  currentPlayer = CONFIG.FIRST_PLAYER
  on
  tickCallback
  constructor({on, tickCallback}) {
    this.board = initBoard()
    this.on = on
    this.tickCallback = tickCallback
  }
  setCounter(value) {
    this.counter = value
  }
  setPlayer(player) {
    this.currentPlayer = player
  }
  changePlayer(current = this.currentPlayer) {
    this.setPlayer(changePlayer(current))
  }
  reset() {
    this.setCounter(0)
    this.setPlayer(CONFIG.FIRST_PLAYER)
    this.board = initBoard()
  }
  win() {
    console.log(' '.repeat(8) + `Player with sign '${changePlayer(this.currentPlayer)}' won!`);
    this.reset()
    this.on?.win?.(this)
  }
  play() {
    this.on?.play?.(this)
    this.tick()
  }
  print([row,col]) {
    const isConditions = checkConditions(row, col, this.board)
    if (isConditions) {
      this.board[Number(row) - 1][Number(col) - 1] = this.currentPlayer;
      this.changePlayer()
    } else {
      setTimeout(() => this.tick(), 5000);
      return;
    }
    this.tick()
  }
  tick() {
    this.on?.startTick?.(this)
    if (this.counter === 9) {
      console.log(' '.repeat(8) + 'Draw!')
      return
    }
    if (this.counter >= 5 && isWin(this.board)) {
      this.win()
      return
    }

    this.setCounter(this.counter + 1)
    if (this.tickCallback) {
      return this.tickCallback?.(this)
    }
    return (([row, col]) => {
      this.print([row, col])
    })
  }
}

export class TicTacToeNode extends TicTacToe {
  rlInstance
  constructor(params) {
    super({
      ...params,
      tickCallback: (instance) => {
        instance.rlInstance.question(`${' '.repeat(8)}Print the row and the column for your sign (row, column): `, (ans) => {
          const [row, col] = ans.split(',');
          instance.print([row, col])
        })
      },
      on: {
        win(instance) {
          instance.rlInstance.question(`${' '.repeat(8)}Do you wanna play again? y/n: `, (ans) => {
            if (ans == 'y') {
              instance.tick()
            } else {
              instance.rlInstance.close();
            }
          })
        },
        startTick(instance) {
          drawBoard(instance.board)
        }
      }
    })
    this.rlInstance = rl.createInterface({
      input: process.stdin,
      output: process.stdout
    });
  }
}