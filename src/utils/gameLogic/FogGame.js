import { BaseGame } from './BaseGame.js';

export class FogGame extends BaseGame {
  constructor(config = {}) {
    super({ width: 5, height: 5, winCondition: 4, ...config });
    this.revealRadius = config.revealRadius || 1;
    this.visibility = Array(this.height).fill().map(() => Array(this.width).fill(false));
    // Reveal center cell initially
    this.visibility[2][2] = true;
  }

  saveStateForUndo() {
    const baseState = {
      board: this.board.map(row => [...row]),
      currentPlayer: this.currentPlayer,
      winner: this.winner,
      gameOver: this.gameOver,
      moveHistory: [...this.moveHistory],
      turnCount: this.turnCount,
      visibility: this.visibility.map(row => [...row])
    };
    this.undoStack.push(baseState);
  }

  undo() {
    if (this.undoStack.length === 0 || this.gameOver) return false;
    
    const previousState = this.undoStack.pop();
    this.board = previousState.board.map(row => [...row]);
    this.currentPlayer = previousState.currentPlayer;
    this.winner = previousState.winner;
    this.gameOver = previousState.gameOver;
    this.moveHistory = [...previousState.moveHistory];
    this.turnCount = previousState.turnCount;
    this.visibility = previousState.visibility.map(row => [...row]);
    
    return true;
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
    const cloned = super.clone();
    cloned.visibility = this.visibility.map(row => [...row]);
    cloned.revealRadius = this.revealRadius;
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
