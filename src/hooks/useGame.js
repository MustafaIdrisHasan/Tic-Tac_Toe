import { useState, useCallback, useEffect } from 'react';
import { createGame } from '../utils/gameLogic/gameFactory';
import { AIPlayer } from '../utils/gameLogic/aiLogic';
import { OPPONENT_TYPES, AI_DIFFICULTIES } from '../utils/constants';

export const useGame = (mode, opponent = OPPONENT_TYPES.TEST, difficulty = AI_DIFFICULTIES.MEDIUM) => {
  const [game, setGame] = useState(null);
  const [gameState, setGameState] = useState(null);
  const [isAIThinking, setIsAIThinking] = useState(false);
  const [aiPlayer, setAiPlayer] = useState(null);
  const [gameStats, setGameStats] = useState({
    movesCount: 0,
    startTime: null,
    endTime: null,
    duration: 0
  });

  // Initialize game
  useEffect(() => {
    if (mode) {
      const newGame = createGame(mode);
      setGame(newGame);
      setGameState(newGame.getGameState());
      
      if (opponent === OPPONENT_TYPES.AI) {
        const ai = new AIPlayer(difficulty, mode);
        setAiPlayer(ai);
      }
      
      setGameStats(prev => ({
        ...prev,
        startTime: Date.now(),
        movesCount: 0
      }));
    }
  }, [mode, opponent, difficulty]);

  // Update game state when game changes
  useEffect(() => {
    if (game) {
      setGameState(game.getGameState());
    }
  }, [game]);

  const makeMove = useCallback(async (x, y) => {
    if (!game || game.gameOver) return false;

    const success = game.makeMove(x, y);
    if (success) {
      setGameState(game.getGameState());
      setGameStats(prev => ({
        ...prev,
        movesCount: prev.movesCount + 1
      }));

      // Handle AI move if it's AI's turn and game is not over
      if (opponent === OPPONENT_TYPES.AI && !game.gameOver && game.currentPlayer === 'O' && aiPlayer) {
        setIsAIThinking(true);
        
        try {
          const aiMove = await aiPlayer.getMove(game);
          if (aiMove && !game.gameOver) {
            let aiSuccess = false;
            if (mode === 'gravity') {
              aiSuccess = game.makeMove(aiMove, 0);
            } else {
              aiSuccess = game.makeMove(aiMove.x, aiMove.y);
            }
            
            if (aiSuccess) {
              setGameState(game.getGameState());
              setGameStats(prev => ({
                ...prev,
                movesCount: prev.movesCount + 1
              }));
            }
          }
        } catch (error) {
          console.error('AI move error:', error);
        } finally {
          setIsAIThinking(false);
        }
      }

      // Update end time if game is over
      if (game.gameOver) {
        setGameStats(prev => ({
          ...prev,
          endTime: Date.now(),
          duration: Date.now() - prev.startTime
        }));
      }
    }

    return success;
  }, [game, opponent, aiPlayer, mode]);

  const resetGame = useCallback(() => {
    if (game) {
      game.reset();
      setGameState(game.getGameState());
      setGameStats({
        movesCount: 0,
        startTime: Date.now(),
        endTime: null,
        duration: 0
      });
      setIsAIThinking(false);
    }
  }, [game]);

  const undoMove = useCallback(() => {
    // This would require implementing undo functionality in the game classes
    // For now, we'll just reset the game
    resetGame();
  }, [resetGame]);

  return {
    game,
    gameState,
    isAIThinking,
    gameStats,
    makeMove,
    resetGame,
    undoMove,
    isGameOver: gameState?.gameOver || false,
    winner: gameState?.winner,
    currentPlayer: gameState?.currentPlayer,
    board: gameState?.board || [],
    moveHistory: gameState?.moveHistory || []
  };
};
