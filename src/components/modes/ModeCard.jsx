import React from 'react';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import styles from './ModeSelect.module.css';
import { ROUTES } from '../../utils/constants';

const ModeCard = ({ mode, config }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`${ROUTES.ENTRY}?mode=${mode}`);
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

  const getDifficultyClass = (difficulty) => {
    return difficulty.toLowerCase();
  };

  const getModeFeatures = (mode) => {
    switch (mode) {
      case 'fading':
        return [
          'Marks fade after 4 turns',
          'Strategic planning required',
          'Dynamic board state'
        ];
      case 'fog':
        return [
          '5x5 board with limited visibility',
          'Reveal cells by playing nearby',
          'Need 4 in a row to win'
        ];
      case 'gravity':
        return [
          'Pieces fall down like Connect Four',
          '3x6 vertical board',
          'Think in columns, not rows'
        ];
      default:
        return [
          'Classic 3x3 grid',
          'Traditional rules',
          'Perfect for beginners'
        ];
    }
  };

  return (
    <div
      className={clsx(styles.modeCard, styles[mode])}
      onClick={handleCardClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleCardClick();
        }
      }}
    >
      <div className={styles.modeIcon}>
        {getModeIcon(mode)}
      </div>
      
      <h3 className={styles.modeTitle}>{config.name}</h3>
      
      <div className={clsx(styles.difficultyBadge, styles[getDifficultyClass(config.difficulty)])}>
        {config.difficulty}
      </div>
      
      <p className={styles.modeDescription}>
        {config.description}
      </p>
      
      <ul className={styles.modeFeatures}>
        {getModeFeatures(mode).map((feature, index) => (
          <li key={index}>{feature}</li>
        ))}
      </ul>
    </div>
  );
};

export default ModeCard;
