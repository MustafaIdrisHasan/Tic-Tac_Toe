import { useState, useEffect } from 'react';

export const useLocalStorage = (key, initialValue) => {
  // Get value from localStorage or use initial value
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Update localStorage when state changes
  const setValue = (value) => {
    try {
      // Allow value to be a function so we have the same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  // Remove item from localStorage
  const removeValue = () => {
    try {
      window.localStorage.removeItem(key);
      setStoredValue(initialValue);
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue, removeValue];
};

// Hook for managing game statistics
export const useGameStats = () => {
  const [stats, setStats, removeStats] = useLocalStorage('tic_tac_toe_stats', {
    gamesPlayed: 0,
    gamesWon: 0,
    gamesLost: 0,
    gamesDrawn: 0,
    totalMoves: 0,
    averageGameTime: 0,
    favoriteMode: null,
    modeStats: {}
  });

  const updateStats = (gameResult) => {
    setStats(prevStats => {
      const newStats = { ...prevStats };
      
      // Update general stats
      newStats.gamesPlayed += 1;
      newStats.totalMoves += gameResult.movesCount || 0;
      
      if (gameResult.winner === 'X') {
        newStats.gamesWon += 1;
      } else if (gameResult.winner === 'O') {
        newStats.gamesLost += 1;
      } else {
        newStats.gamesDrawn += 1;
      }
      
      // Update average game time
      if (gameResult.duration) {
        const totalTime = (prevStats.averageGameTime * (prevStats.gamesPlayed - 1)) + gameResult.duration;
        newStats.averageGameTime = totalTime / newStats.gamesPlayed;
      }
      
      // Update mode-specific stats
      if (gameResult.mode) {
        if (!newStats.modeStats[gameResult.mode]) {
          newStats.modeStats[gameResult.mode] = {
            played: 0,
            won: 0,
            lost: 0,
            drawn: 0
          };
        }
        
        newStats.modeStats[gameResult.mode].played += 1;
        
        if (gameResult.winner === 'X') {
          newStats.modeStats[gameResult.mode].won += 1;
        } else if (gameResult.winner === 'O') {
          newStats.modeStats[gameResult.mode].lost += 1;
        } else {
          newStats.modeStats[gameResult.mode].drawn += 1;
        }
        
        // Update favorite mode
        const mostPlayedMode = Object.entries(newStats.modeStats)
          .sort(([,a], [,b]) => b.played - a.played)[0];
        
        if (mostPlayedMode) {
          newStats.favoriteMode = mostPlayedMode[0];
        }
      }
      
      return newStats;
    });
  };

  const resetStats = () => {
    removeStats();
  };

  return {
    stats,
    updateStats,
    resetStats
  };
};

// Hook for managing game settings
export const useGameSettings = () => {
  const [settings, setSettings, removeSettings] = useLocalStorage('tic_tac_toe_settings', {
    soundEnabled: true,
    animationsEnabled: true,
    autoSave: true,
    theme: 'pixel',
    difficulty: 'medium',
    darkMode: false,
    themeMode: 'normal'
  });

  const updateSetting = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const resetSettings = () => {
    removeSettings();
  };

  return {
    settings,
    updateSetting,
    resetSettings
  };
};
