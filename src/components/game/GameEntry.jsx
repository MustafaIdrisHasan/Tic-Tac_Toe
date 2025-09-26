import React from 'react';
import { useNavigate } from 'react-router-dom';
import PixelButton from '../shared/PixelButton';
import { useUrlParams } from '../../hooks/useUrlParams';
import { getGameConfig } from '../../utils/gameLogic/gameFactory';
import { ROUTES, OPPONENT_TYPES, AI_DIFFICULTIES } from '../../utils/constants';
import styles from './GameEntry.module.css';

const GameEntry = () => {
  const navigate = useNavigate();
  const { mode } = useUrlParams();

  if (!mode) {
    navigate(ROUTES.MODES);
    return null;
  }

  const config = getGameConfig(mode);

  const handlePlayVsAI = () => {
    navigate(`${ROUTES.GAME}?mode=${mode}&opponent=${OPPONENT_TYPES.AI}&difficulty=${AI_DIFFICULTIES.MEDIUM}`);
  };

  const handleTestMode = () => {
    navigate(`${ROUTES.GAME}?mode=${mode}&opponent=${OPPONENT_TYPES.TEST}`);
  };

  const handleBackToModes = () => {
    navigate(ROUTES.MODES);
  };

  const getModeRules = (mode) => {
    switch (mode) {
      case 'fading':
        return [
          'Each mark you place will fade away after exactly 4 turns',
          'Plan your moves carefully - temporary marks require strategic thinking',
          'Win by getting 3 in a row before your marks disappear',
          'Watch the opacity of marks to see how long they have left'
        ];
      case 'fog':
        return [
          'The board is hidden in fog - you can only see revealed cells',
          'Playing a move reveals all adjacent cells (including diagonals)',
          'Start with only the center cell visible',
          'Win by getting 4 in a row on the 5x5 board'
        ];
      case 'gravity':
        return [
          'Pieces fall down due to gravity, like Connect Four',
          'Click on a column to drop your piece to the bottom',
          'Win by getting 4 in a row (horizontal, vertical, or diagonal)',
          'Think vertically - plan your column strategy'
        ];
      default:
        return ['Standard tic-tac-toe rules apply'];
    }
  };

  const getModeIcon = (mode) => {
    switch (mode) {
      case 'fading':
        return '⏳';
      case 'fog':
        return '🌫️';
      case 'gravity':
        return '⬇️';
      default:
        return '⭕';
    }
  };

  return (
    <div className={`${styles.gameEntryPage} ${styles[mode]}`}>
      <div className={styles.contentContainer}>
        <div className={styles.modeHeader}>
          <div className={styles.modeIcon}>
            {getModeIcon(mode)}
          </div>
          <h1 className={styles.modeTitle}>{config.name}</h1>
          <div className={styles.difficultyBadge}>
            {config.difficulty}
          </div>
        </div>

        <div className={styles.modeDescription}>
          <p>{config.description}</p>
        </div>

        <div className={styles.rulesSection}>
          <h2 className={styles.rulesTitle}>How to Play</h2>
          <ul className={styles.rulesList}>
            {getModeRules(mode).map((rule, index) => (
              <li key={index} className={styles.ruleItem}>
                {rule}
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.actionButtons}>
          <PixelButton
            variant="primary"
            size="large"
            onClick={handlePlayVsAI}
            className={styles.playButton}
          >
            🤖 PLAY VS AI
          </PixelButton>
          
          <PixelButton
            variant="secondary"
            size="large"
            onClick={handleTestMode}
            className={styles.testButton}
          >
            🧪 TEST MODE
          </PixelButton>
        </div>

        <div className={styles.modeInfo}>
          <div className={styles.infoCard}>
            <h3>VS AI Mode</h3>
            <p>Challenge yourself against an intelligent computer opponent with medium difficulty.</p>
          </div>
          <div className={styles.infoCard}>
            <h3>Test Mode</h3>
            <p>Practice and experiment with the game mechanics. Place both X and O pieces manually.</p>
          </div>
        </div>

        <PixelButton
          variant="secondary"
          onClick={handleBackToModes}
          className={styles.backButton}
        >
          ← Back to Modes
        </PixelButton>
      </div>
    </div>
  );
};

export default GameEntry;
