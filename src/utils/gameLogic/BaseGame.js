export class BaseGame {
  constructor(config = {}) {
    this.width = config.width || 3;
    this.height = config.height || 3;
    this.winCondition = config.winCondition || 3;
    this.board = Array(this.height).fill().map(() => Array(this.width).fill(null));
    this.currentPlayer = 'X';
    this.winner = null;
    this.gameOver = false;
    this.moveHistory = [];
    this.turnCount = 0;
  }
  
  makeMove(x, y, player = this.currentPlayer) {
    if (!this.isValidMove(x, y)) return false;
    
    this.board[y][x] = player;
    this.moveHistory.push({ x, y, player, turn: this.turnCount });
    this.turnCount++;
    
    this.checkWinCondition();
    if (!this.gameOver) {
      this.switchPlayer();
    }
    
    return true;
  }
  
  isValidMove(x, y) {
    return x >= 0 && x < this.width && 
           y >= 0 && y < this.height && 
           this.board[y][x] === null && 
           !this.gameOver;
  }
  
  checkWinCondition() {
    // Check horizontal, vertical, and diagonal wins
    const directions = [
      [1, 0], [0, 1], [1, 1], [1, -1] // right, down, diagonal-right, diagonal-left
    ];
    
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        const player = this.board[y][x];
        if (!player) continue;
        
        for (const [dx, dy] of directions) {
          if (this.checkLine(x, y, dx, dy, player)) {
            this.winner = player;
            this.gameOver = true;
            return;
          }
        }
      }
    }
    
    // Check for draw
    if (this.board.every(row => row.every(cell => cell !== null))) {
      this.gameOver = true;
    }
  }
  
  checkLine(startX, startY, dx, dy, player) {
    let count = 0;
    for (let i = 0; i < this.winCondition; i++) {
      const x = startX + i * dx;
      const y = startY + i * dy;
      if (x < 0 || x >= this.width || y < 0 || y >= this.height) break;
      if (this.board[y][x] === player) {
        count++;
      } else {
        break;
      }
    }
    return count >= this.winCondition;
  }
  
  getGameState() {
    return {
      board: this.board.map(row => [...row]),
      currentPlayer: this.currentPlayer,
      winner: this.winner,
      gameOver: this.gameOver,
      moveHistory: [...this.moveHistory],
      turnCount: this.turnCount
    };
  }
  
  switchPlayer() {
    this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
  }
  
  reset() {
    this.board = Array(this.height).fill().map(() => Array(this.width).fill(null));
    this.currentPlayer = 'X';
    this.winner = null;
    this.gameOver = false;
    this.moveHistory = [];
    this.turnCount = 0;
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
  
  clone() {
    const cloned = new BaseGame({
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
}
