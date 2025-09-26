import { BaseGame } from './BaseGame.js';

export class GravityGame extends BaseGame {
  constructor(config = {}) {
    super({ width: 3, height: 6, winCondition: 4, ...config });
  }
  
  makeMove(column, _, player = this.currentPlayer) {
    if (column < 0 || column >= this.width || this.gameOver) {
      return false;
    }
    
    // Find the lowest empty row in the column
    for (let row = this.height - 1; row >= 0; row--) {
      if (this.board[row][column] === null) {
        return super.makeMove(column, row, player);
      }
    }
    
    return false; // Column is full
  }
  
  isValidMove(column, _) {
    if (column < 0 || column >= this.width || this.gameOver) {
      return false;
    }
    
    // Check if top row of column is empty
    return this.board[0][column] === null;
  }
  
  getValidMoves() {
    const moves = [];
    for (let col = 0; col < this.width; col++) {
      if (this.isValidMove(col, 0)) {
        moves.push(col);
      }
    }
    return moves;
  }
  
  clone() {
    const cloned = new GravityGame({
      width: this.width,
      height: this.height,
      winCondition: this.winCondition
    });
    
    cloned.board = this.board.map(row => [...row]);
    cloned.currentPlayer = this.currentPlayer;
    cloned.winner = this.winner;
    cloned.gameOver = this.gameOver;
    cloned.moveHistory = [...this.moveHistory];
    cloned.turnCount = this.turnCount;
    
    return cloned;
  }
  
  getDropRow(column) {
    if (column < 0 || column >= this.width) return -1;
    
    for (let row = this.height - 1; row >= 0; row--) {
      if (this.board[row][column] === null) {
        return row;
      }
    }
    return -1; // Column is full
  }
  
  isColumnFull(column) {
    return this.board[0][column] !== null;
  }
  
  getColumnHeight(column) {
    let height = 0;
    for (let row = this.height - 1; row >= 0; row--) {
      if (this.board[row][column] !== null) {
        height++;
      } else {
        break;
      }
    }
    return height;
  }
}
