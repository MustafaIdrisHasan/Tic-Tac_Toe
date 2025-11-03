import React from 'react';
import { useNavigate } from 'react-router-dom';
import PixelButton from '../shared/PixelButton';
import { useGameStats } from '../../hooks/useLocalStorage';
import { getGameConfig, GAME_MODES } from '../../utils/gameLogic/gameFactory';
import { ROUTES } from '../../utils/constants';
import { formatTime, capitalize } from '../../utils/helpers';
import styles from './GameStats.module.css';

const GameStats = () => {
  const navigate = useNavigate();
  const { stats, resetStats } = useGameStats();

  const handleBackToHome = () => {
    navigate(ROUTES.HOME);
  };

  const getWinRate = () => {
    if (stats.gamesPlayed === 0) return 0;
    return Math.round((stats.gamesWon / stats.gamesPlayed) * 100);
  };

  const getModeDisplayName = (mode) => {
    if (!mode) return 'N/A';
    const config = getGameConfig(mode);
    return config.name || capitalize(mode);
  };

  return (
    <div className={styles.statsPage}>
      <div className={styles.statsContainer}>
        <h1 className={styles.pageTitle}>Game Statistics</h1>
        
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>🎮</div>
            <div className={styles.statValue}>{stats.gamesPlayed}</div>
            <div className={styles.statLabel}>Games Played</div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statIcon}>🏆</div>
            <div className={styles.statValue}>{stats.gamesWon}</div>
            <div className={styles.statLabel}>Games Won</div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statIcon}>😔</div>
            <div className={styles.statValue}>{stats.gamesLost}</div>
            <div className={styles.statLabel}>Games Lost</div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statIcon}>🤝</div>
            <div className={styles.statValue}>{stats.gamesDrawn}</div>
            <div className={styles.statLabel}>Games Drawn</div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statIcon}>📊</div>
            <div className={styles.statValue}>{getWinRate()}%</div>
            <div className={styles.statLabel}>Win Rate</div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statIcon}>⏱️</div>
            <div className={styles.statValue}>
              {stats.averageGameTime > 0 
                ? formatTime(Math.floor(stats.averageGameTime / 1000))
                : '00:00'
              }
            </div>
            <div className={styles.statLabel}>Avg Game Time</div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statIcon}>🎯</div>
            <div className={styles.statValue}>{stats.totalMoves}</div>
            <div className={styles.statLabel}>Total Moves</div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statIcon}>⭐</div>
            <div className={styles.statValue}>
              {stats.favoriteMode ? getModeDisplayName(stats.favoriteMode) : 'N/A'}
            </div>
            <div className={styles.statLabel}>Favorite Mode</div>
          </div>
        </div>

        {Object.keys(stats.modeStats || {}).length > 0 && (
          <div className={styles.modeStatsSection}>
            <h2 className={styles.sectionTitle}>Mode-Specific Statistics</h2>
            <div className={styles.modeStatsGrid}>
              {Object.entries(stats.modeStats).map(([mode, modeStat]) => {
                const modeConfig = getGameConfig(mode);
                const modeWinRate = modeStat.played > 0 
                  ? Math.round((modeStat.won / modeStat.played) * 100)
                  : 0;

                return (
                  <div key={mode} className={styles.modeStatCard}>
                    <h3 className={styles.modeStatTitle}>
                      {modeConfig.name || capitalize(mode)}
                    </h3>
                    <div className={styles.modeStatDetails}>
                      <div className={styles.modeStatRow}>
                        <span>Played:</span>
                        <span>{modeStat.played}</span>
                      </div>
                      <div className={styles.modeStatRow}>
                        <span>Won:</span>
                        <span>{modeStat.won}</span>
                      </div>
                      <div className={styles.modeStatRow}>
                        <span>Lost:</span>
                        <span>{modeStat.lost}</span>
                      </div>
                      <div className={styles.modeStatRow}>
                        <span>Drawn:</span>
                        <span>{modeStat.drawn}</span>
                      </div>
                      <div className={styles.modeStatRow}>
                        <span>Win Rate:</span>
                        <span>{modeWinRate}%</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div className={styles.actions}>
          <PixelButton 
            variant="danger" 
            onClick={resetStats}
            className={styles.resetButton}
          >
            🗑️ Reset Statistics
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

export default GameStats;

