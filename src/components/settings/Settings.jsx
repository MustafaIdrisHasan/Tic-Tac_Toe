import React from 'react';
import { useNavigate } from 'react-router-dom';
import PixelButton from '../shared/PixelButton';
import { useGameSettings } from '../../hooks/useLocalStorage';
import { soundManager } from '../../utils/soundManager';
import { AI_DIFFICULTIES } from '../../utils/constants';
import { ROUTES } from '../../utils/constants';
import styles from './Settings.module.css';

const Settings = () => {
  const navigate = useNavigate();
  const { settings, updateSetting, resetSettings } = useGameSettings();

  const handleBackToHome = () => {
    navigate(ROUTES.HOME);
  };

  const handleSoundToggle = () => {
    const newValue = !settings.soundEnabled;
    updateSetting('soundEnabled', newValue);
    soundManager.setEnabled(newValue);
    if (newValue) {
      soundManager.play('click');
    }
  };

  const handleAnimationsToggle = () => {
    updateSetting('animationsEnabled', !settings.animationsEnabled);
    soundManager.play('click');
  };

  const handleDifficultyChange = (difficulty) => {
    updateSetting('difficulty', difficulty);
    soundManager.play('click');
  };

  const handleResetSettings = () => {
    if (window.confirm('Are you sure you want to reset all settings to default?')) {
      resetSettings();
      soundManager.play('click');
    }
  };

  const difficulties = [
    { value: AI_DIFFICULTIES.EASY, label: 'Easy' },
    { value: AI_DIFFICULTIES.MEDIUM, label: 'Medium' },
    { value: AI_DIFFICULTIES.HARD, label: 'Hard' }
  ];

  return (
    <div className={styles.settingsPage}>
      <div className={styles.settingsContainer}>
        <h1 className={styles.pageTitle}>Settings</h1>

        <div className={styles.settingsSection}>
          <h2 className={styles.sectionTitle}>Audio</h2>
          <div className={styles.settingItem}>
            <div className={styles.settingInfo}>
              <label className={styles.settingLabel}>Sound Effects</label>
              <p className={styles.settingDescription}>
                Enable or disable sound effects during gameplay
              </p>
            </div>
            <button
              className={`${styles.toggleButton} ${settings.soundEnabled ? styles.active : ''}`}
              onClick={handleSoundToggle}
              aria-label={`Sound effects: ${settings.soundEnabled ? 'On' : 'Off'}`}
            >
              <span className={styles.toggleSlider} />
            </button>
          </div>
        </div>

        <div className={styles.settingsSection}>
          <h2 className={styles.sectionTitle}>Gameplay</h2>
          <div className={styles.settingItem}>
            <div className={styles.settingInfo}>
              <label className={styles.settingLabel}>Default AI Difficulty</label>
              <p className={styles.settingDescription}>
                Choose the default difficulty level for AI opponents
              </p>
            </div>
            <div className={styles.difficultyButtons}>
              {difficulties.map((diff) => (
                <PixelButton
                  key={diff.value}
                  variant={settings.difficulty === diff.value ? 'primary' : 'secondary'}
                  size="small"
                  onClick={() => handleDifficultyChange(diff.value)}
                  className={styles.difficultyButton}
                >
                  {diff.label}
                </PixelButton>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.settingsSection}>
          <h2 className={styles.sectionTitle}>Visual</h2>
          <div className={styles.settingItem}>
            <div className={styles.settingInfo}>
              <label className={styles.settingLabel}>Animations</label>
              <p className={styles.settingDescription}>
                Enable or disable visual animations
              </p>
            </div>
            <button
              className={`${styles.toggleButton} ${settings.animationsEnabled ? styles.active : ''}`}
              onClick={handleAnimationsToggle}
              aria-label={`Animations: ${settings.animationsEnabled ? 'On' : 'Off'}`}
            >
              <span className={styles.toggleSlider} />
            </button>
          </div>
        </div>

        <div className={styles.actions}>
          <PixelButton
            variant="danger"
            onClick={handleResetSettings}
            className={styles.resetButton}
          >
            🔄 Reset to Defaults
          </PixelButton>
          <PixelButton
            variant="secondary"
            onClick={handleBackToHome}
            className={styles.backButton}
          >
            ← Back to Home
          </PixelButton>
        </div>
      </div>
    </div>
  );
};

export default Settings;

