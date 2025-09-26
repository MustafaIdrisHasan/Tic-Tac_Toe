import { BaseGame } from './BaseGame.js';

export class FadingGame extends BaseGame {
  constructor(config = {}) {
    super(config);
    this.markLifespan = config.markLifespan || 4;
    this.markAges = Array(this.height).fill().map(() => Array(this.width).fill(0));
  }
  
  makeMove(x, y, player = this.currentPlayer) {
    const success = super.makeMove(x, y, player);
    if (success) {
      this.markAges[y][x] = this.markLifespan;
      this.ageAllMarks();
    }
    return success;
  }
  
  ageAllMarks() {
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        if (this.markAges[y][x] > 0) {
          this.markAges[y][x]--;
          if (this.markAges[y][x] === 0 && this.board[y][x] !== null) {
            this.board[y][x] = null;
          }
        }
      }
    }
    // Recheck win condition after fading
    this.checkWinCondition();
  }
  
  getGameState() {
    return {
      ...super.getGameState(),
      markAges: this.markAges.map(row => [...row]),
      markLifespan: this.markLifespan
    };
  }
  
  reset() {
    super.reset();
    this.markAges = Array(this.height).fill().map(() => Array(this.width).fill(0));
  }
  
  clone() {
    const cloned = new FadingGame({
      width: this.width,
      height: this.height,
      winCondition: this.winCondition,
      markLifespan: this.markLifespan
    });
    
    cloned.board = this.board.map(row => [...row]);
    cloned.currentPlayer = this.currentPlayer;
    cloned.winner = this.winner;
    cloned.gameOver = this.gameOver;
    cloned.moveHistory = [...this.moveHistory];
    cloned.turnCount = this.turnCount;
    cloned.markAges = this.markAges.map(row => [...row]);
    
    return cloned;
  }
  
  getCellOpacity(x, y) {
    if (this.markAges[y][x] === 0) return 1;
    return this.markAges[y][x] / this.markLifespan;
  }
  
  getMarkAge(x, y) {
    return this.markAges[y][x];
  }
}
