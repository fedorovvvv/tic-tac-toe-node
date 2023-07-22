import { initBoard } from "../board/board.js"
import { CONFIG } from "../config/index.js"
import { changePlayer } from "../logic/changePlayerLogic.js"
import isWin from "../logic/checkWin.js"
import { checkConditions } from "../logic/conditionsLogic.js"

export class TicTacToe {
    board
    counter = 0
    currentPlayer = CONFIG.FIRST_PLAYER
    on
    tickCallback
    constructor({on, tickCallback} = {}) {
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
      return this.tick()
    }
    print([row,col]) {
      const isConditions = checkConditions(row, col, this.board)
      if (isConditions.status) {
        this.board[Number(row) - 1][Number(col) - 1] = this.currentPlayer;
        this.changePlayer()
      } else {
        setTimeout(() => this.tick(), 5000);
        return {
          error: isConditions,
        };
      }
      return {
        error: isConditions,
        tickResult: this.tick()
      }
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
        this.on?.endTick?.(this)
        return this.tickCallback?.(this)
      }
      this.on?.endTick?.(this)
      return ([row, col]) => {
        this.print([row, col])
      }
    }
  }