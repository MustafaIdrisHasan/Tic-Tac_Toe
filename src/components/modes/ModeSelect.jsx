import React from 'react';
import { useNavigate } from 'react-router-dom';
import ModeCard from './ModeCard';
import PixelButton from '../shared/PixelButton';
import styles from './ModeSelect.module.css';
import { getGameModesList } from '../../utils/gameLogic/gameFactory';
import { ROUTES } from '../../utils/constants';

const ModeSelect = () => {
  const navigate = useNavigate();
  const gameModes = getGameModesList();

  const handleBackToHome = () => {
    navigate(ROUTES.HOME);
  };

  // Filter out standard mode for the variants showcase
  const variantModes = gameModes.filter(mode => mode.mode !== 'standard');

  return (
    <div className={styles.modeSelectPage}>
      <h1 className={styles.pageTitle}>Choose Your Game Mode</h1>
      <p className={styles.pageSubtitle}>
        Select from three unique tic-tac-toe variants, each with its own strategic challenges and gameplay mechanics.
      </p>

      <div className={styles.modesGrid}>
        {variantModes.map((modeData) => (
          <ModeCard
            key={modeData.mode}
            mode={modeData.mode}
            config={modeData}
          />
        ))}
      </div>

      <PixelButton
        variant="secondary"
        onClick={handleBackToHome}
        className={styles.backButton}
      >
        ← Back to Home
      </PixelButton>
    </div>
  );
};

export default ModeSelect;
