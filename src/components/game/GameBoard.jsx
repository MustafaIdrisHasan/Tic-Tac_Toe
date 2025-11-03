import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import GameCell from './GameCell';
import PixelButton from '../shared/PixelButton';
import LoadingSpinner from '../shared/LoadingSpinner';
import { useUrlParams } from '../../hooks/useUrlParams';
import { useGame } from '../../hooks/useGame';
import { getGameConfig } from '../../utils/gameLogic/gameFactory';
import { ROUTES, OPPONENT_TYPES } from '../../utils/constants';
import { formatTime } from '../../utils/helpers';
import styles from './GameBoard.module.css';

const GameBoard = () => {
  const navigate = useNavigate();
  const { mode, opponent, difficulty } = useUrlParams();
  
  const {
    gameState,
    isAIThinking,
    gameStats,
    makeMove,
    resetGame,
    undoMove,
    isGameOver,
    winner,
    currentPlayer,
    board,
    moveHistory,
    canUndo
  } = useGame(mode, opponent, difficulty);

  // Redirect if no mode is specified
  useEffect(() => {
    if (!mode) {
      navigate(ROUTES.MODES);
    }
  }, [mode, navigate]);

  if (!mode || !gameState) {
    return <LoadingSpinner text="Loading game..." />;
  }

  const config = getGameConfig(mode);

  const handleCellClick = (x, y) => {
    if (mode === 'gravity') {
      // For gravity mode, only use the column (x coordinate)
      makeMove(x, 0);
    } else {
      makeMove(x, y);
    }
  };

  const handleBackToEntry = () => {
    navigate(`${ROUTES.ENTRY}?mode=${mode}`);
  };

  const getCellOpacity = (x, y) => {
    if (mode === 'fading' && gameState.markAges) {
      const age = gameState.markAges[y][x];
      if (age > 0) {
        return age / gameState.markLifespan;
      }
    }
    return 1;
  };

  const isCellVisible = (x, y) => {
    if (mode === 'fog' && gameState.visibility) {
      return gameState.visibility[y][x];
    }
    return true;
  };

  const isCellDisabled = (x, y) => {
    if (isGameOver || isAIThinking) return true;
    if (opponent === OPPONENT_TYPES.AI && currentPlayer === 'O') return true;
    
    if (mode === 'gravity') {
      // For gravity mode, check if column is full
      return board[0][x] !== null;
    }
    
    if (mode === 'fog' && !isCellVisible(x, y)) return true;
    
    return board[y][x] !== null;
  };

  const renderBoard = () => {
    const cells = [];
    
    for (let y = 0; y < board.length; y++) {
      for (let x = 0; x < board[y].length; x++) {
        cells.push(
          <GameCell
            key={`${x}-${y}`}
            value={board[y][x]}
            onClick={handleCellClick}
            disabled={isCellDisabled(x, y)}
            hidden={!isCellVisible(x, y)}
            opacity={getCellOpacity(x, y)}
            x={x}
            y={y}
          />
        );
      }
    }
    
    return cells;
  };

  const getGameStatusText = () => {
    if (isGameOver) {
      if (winner) {
        if (opponent === OPPONENT_TYPES.AI) {
          return winner === 'X' ? 'You Win!' : 'AI Wins!';
        } else {
          return `Player ${winner} Wins!`;
        }
      } else {
        return "It's a Draw!";
      }
    }
    
    if (isAIThinking) {
      return 'AI is thinking...';
    }
    
    if (opponent === OPPONENT_TYPES.AI) {
      return currentPlayer === 'X' ? 'Your Turn' : "AI's Turn";
    } else {
      return `Player ${currentPlayer}'s Turn`;
    }
  };

  return (
    <div className={styles.gamePage}>
      <div className={styles.gameHeader}>
        <h1 className={styles.gameTitle}>{config.name}</h1>
        <div className={styles.gameMode}>
          {opponent === OPPONENT_TYPES.AI ? `VS AI (${difficulty})` : 'Test Mode'}
        </div>
      </div>

      {isAIThinking && (
        <div className={styles.aiThinking}>
          <LoadingSpinner size="small" showText={false} />
          <span className={styles.thinkingText}>AI is thinking...</span>
        </div>
      )}

      <div className={styles.gameContainer}>
        <div className={styles.boardContainer}>
          <div className={styles.gameStatus} role="status" aria-live="polite">
            <div className={styles.currentPlayer} aria-label="Current game status">
              {getGameStatusText()}
            </div>
            {isGameOver && (
              <div className={clsx(styles.gameResult, {
                [styles.winner]: winner,
                [styles.draw]: !winner
              })}>
                {winner ? `${winner} Wins!` : "It's a Draw!"}
              </div>
            )}
          </div>

          <div 
            className={clsx(styles.gameBoard, styles[mode])}
            role="grid"
            aria-label={`${config.name} game board`}
          >
            {renderBoard()}
          </div>

          <div className={styles.gameControls}>
            <PixelButton 
              onClick={undoMove}
              disabled={!canUndo || isAIThinking}
              title={canUndo ? "Undo last move" : "Cannot undo"}
            >
              ↩️ Undo
            </PixelButton>
            <PixelButton onClick={resetGame}>
              🔄 Reset Game
            </PixelButton>
            <PixelButton 
              variant="secondary" 
              onClick={handleBackToEntry}
              className={styles.backToEntry}
            >
              ← Back to Setup
            </PixelButton>
          </div>
        </div>

        <aside className={styles.sidePanel} aria-label="Game information">
          <h3 className={styles.panelTitle}>Game Info</h3>
          
          <div className={styles.gameStats}>
            <div className={styles.statItem}>
              <span>Moves:</span>
              <span>{gameStats.movesCount}</span>
            </div>
            <div className={styles.statItem}>
              <span>Time:</span>
              <span>
                {gameStats.startTime ? 
                  formatTime(Math.floor((Date.now() - gameStats.startTime) / 1000)) : 
                  '00:00'
                }
              </span>
            </div>
            <div className={styles.statItem}>
              <span>Mode:</span>
              <span>{config.difficulty}</span>
            </div>
          </div>

          {moveHistory.length > 0 && (
            <>
              <h4 className={styles.panelTitle}>Move History</h4>
              <div className={styles.moveHistory}>
                {moveHistory.map((move, index) => (
                  <div key={index} className={styles.moveItem}>
                    {index + 1}. {move.player} → ({move.x}, {move.y})
                  </div>
                ))}
              </div>
            </>
          )}
        </aside>
      </div>
    </div>
  );
};

export default GameBoard;
