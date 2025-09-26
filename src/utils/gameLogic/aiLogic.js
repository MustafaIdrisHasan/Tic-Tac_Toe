export class AIPlayer {
  constructor(difficulty = 'medium', gameType = 'standard') {
    this.difficulty = difficulty;
    this.gameType = gameType;
  }
  
  async getMove(gameInstance) {
    // Add realistic thinking delay
    await new Promise(resolve => setTimeout(resolve, 300 + Math.random() * 700));
    
    switch (this.difficulty) {
      case 'easy':
        return this.getRandomMove(gameInstance);
      case 'medium':
        return this.getMediumMove(gameInstance);
      case 'hard':
        return this.getOptimalMove(gameInstance);
      default:
        return this.getRandomMove(gameInstance);
    }
  }
  
  getRandomMove(game) {
    const validMoves = this.getValidMoves(game);
    if (validMoves.length === 0) return null;
    return validMoves[Math.floor(Math.random() * validMoves.length)];
  }
  
  getMediumMove(game) {
    // 60% optimal, 40% random
    if (Math.random() < 0.6) {
      return this.getOptimalMove(game);
    }
    return this.getRandomMove(game);
  }
  
  getOptimalMove(game) {
    const validMoves = this.getValidMoves(game);
    if (validMoves.length === 0) return null;
    
    let bestMove = validMoves[0];
    let bestScore = -Infinity;
    
    for (const move of validMoves) {
      const score = this.minimax(game, move, 0, false, -Infinity, Infinity);
      if (score > bestScore) {
        bestScore = score;
        bestMove = move;
      }
    }
    
    return bestMove;
  }
  
  minimax(game, move, depth, isMaximizing, alpha, beta) {
    // Create a copy of the game to test the move
    const testGame = game.clone();
    
    if (this.gameType === 'gravity') {
      testGame.makeMove(move, 0, isMaximizing ? 'O' : 'X');
    } else {
      testGame.makeMove(move.x, move.y, isMaximizing ? 'O' : 'X');
    }
    
    if (testGame.gameOver || depth >= 6) {
      return this.evaluatePosition(testGame);
    }
    
    const moves = this.getValidMoves(testGame);
    
    if (isMaximizing) {
      let maxEval = -Infinity;
      for (const nextMove of moves) {
        const evaluation = this.minimax(testGame, nextMove, depth + 1, false, alpha, beta);
        maxEval = Math.max(maxEval, evaluation);
        alpha = Math.max(alpha, evaluation);
        if (beta <= alpha) break;
      }
      return maxEval;
    } else {
      let minEval = Infinity;
      for (const nextMove of moves) {
        const evaluation = this.minimax(testGame, nextMove, depth + 1, true, alpha, beta);
        minEval = Math.min(minEval, evaluation);
        beta = Math.min(beta, evaluation);
        if (beta <= alpha) break;
      }
      return minEval;
    }
  }
  
  evaluatePosition(game) {
    if (game.winner === 'O') return 100;
    if (game.winner === 'X') return -100;
    if (game.gameOver) return 0;
    
    // Basic position evaluation
    let score = 0;
    
    // Center control bonus for standard games
    if (this.gameType !== 'gravity' && game.width === 3 && game.height === 3) {
      if (game.board[1][1] === 'O') score += 10;
      if (game.board[1][1] === 'X') score -= 10;
    }
    
    return score;
  }
  
  getValidMoves(game) {
    if (this.gameType === 'gravity') {
      return game.getValidMoves();
    }
    
    const moves = [];
    for (let y = 0; y < game.height; y++) {
      for (let x = 0; x < game.width; x++) {
        if (game.isValidMove(x, y)) {
          moves.push({ x, y });
        }
      }
    }
    return moves;
  }
}
