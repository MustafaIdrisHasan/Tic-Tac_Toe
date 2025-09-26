import { BaseGame } from './BaseGame.js';

export class FogGame extends BaseGame {
  constructor(config = {}) {
    super({ width: 5, height: 5, winCondition: 4, ...config });
    this.revealRadius = config.revealRadius || 1;
    this.visibility = Array(this.height).fill().map(() => Array(this.width).fill(false));
    // Reveal center cell initially
    this.visibility[2][2] = true;
  }
  
  makeMove(x, y, player = this.currentPlayer) {
    const success = super.makeMove(x, y, player);
    if (success) {
      this.revealArea(x, y);
    }
    return success;
  }
  
  revealArea(centerX, centerY) {
    for (let dy = -this.revealRadius; dy <= this.revealRadius; dy++) {
      for (let dx = -this.revealRadius; dx <= this.revealRadius; dx++) {
        const x = centerX + dx;
        const y = centerY + dy;
        if (x >= 0 && x < this.width && y >= 0 && y < this.height) {
          this.visibility[y][x] = true;
        }
      }
    }
  }
  
  isValidMove(x, y) {
    return super.isValidMove(x, y) && this.visibility[y][x];
  }
  
  getGameState() {
    return {
      ...super.getGameState(),
      visibility: this.visibility.map(row => [...row]),
      revealRadius: this.revealRadius
    };
  }
  
  reset() {
    super.reset();
    this.visibility = Array(this.height).fill().map(() => Array(this.width).fill(false));
    this.visibility[2][2] = true;
  }
  
  clone() {
    const cloned = new FogGame({
      width: this.width,
      height: this.height,
      winCondition: this.winCondition,
      revealRadius: this.revealRadius
    });
    
    cloned.board = this.board.map(row => [...row]);
    cloned.currentPlayer = this.currentPlayer;
    cloned.winner = this.winner;
    cloned.gameOver = this.gameOver;
    cloned.moveHistory = [...this.moveHistory];
    cloned.turnCount = this.turnCount;
    cloned.visibility = this.visibility.map(row => [...row]);
    
    return cloned;
  }
  
  isCellVisible(x, y) {
    return this.visibility[y][x];
  }
  
  getValidMoves() {
    const moves = [];
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        if (this.isValidMove(x, y)) {
          moves.push({ x, y });
        }
      }
    }
    return moves;
  }
}
