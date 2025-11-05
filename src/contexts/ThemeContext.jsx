import React, { createContext, useContext, useEffect, useState, useRef } from 'react';
import { useGameSettings } from '../hooks/useLocalStorage';

const ThemeContext = createContext();

export const THEME_MODES = {
  NORMAL: 'normal',
  OLD_SCHOOL: 'old-school'
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const { settings, updateSetting } = useGameSettings();
  const [darkMode, setDarkMode] = useState(() => {
    return settings.darkMode || false;
  });
  const [themeMode, setThemeMode] = useState(() => {
    return settings.themeMode || THEME_MODES.NORMAL;
  });
  const [isTransitioning, setIsTransitioning] = useState(false);
  const vhsOverlayRef = useRef(null);
  const vhsFlashRef = useRef(null);

  // Create VHS transition elements on mount
  useEffect(() => {
    if (!vhsOverlayRef.current) {
      const overlay = document.createElement('div');
      overlay.className = 'vhs-transition-overlay';
      document.body.appendChild(overlay);
      vhsOverlayRef.current = overlay;
    }

    if (!vhsFlashRef.current) {
      const flash = document.createElement('div');
      flash.className = 'vhs-flash';
      document.body.appendChild(flash);
      vhsFlashRef.current = flash;
    }

    return () => {
      if (vhsOverlayRef.current) {
        vhsOverlayRef.current.remove();
      }
      if (vhsFlashRef.current) {
        vhsFlashRef.current.remove();
      }
    };
  }, []);

  // Apply theme classes to document
  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;
    
    // Apply dark mode
    if (darkMode) {
      root.classList.add('dark-mode');
    } else {
      root.classList.remove('dark-mode');
    }

    // Apply theme mode
    if (themeMode === THEME_MODES.OLD_SCHOOL) {
      body.classList.add('old-school-theme');
    } else {
      body.classList.remove('old-school-theme');
    }
  }, [darkMode, themeMode]);

  // Initialize from settings on mount
  useEffect(() => {
    if (settings.darkMode !== undefined) {
      setDarkMode(settings.darkMode);
    }
    if (settings.themeMode !== undefined) {
      setThemeMode(settings.themeMode);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const playVHSTransition = (callback) => {
    if (isTransitioning) return;

    setIsTransitioning(true);

    // Start transition animation
    if (vhsOverlayRef.current) {
      vhsOverlayRef.current.classList.add('active');
    }
    if (vhsFlashRef.current) {
      vhsFlashRef.current.classList.add('active');
    }

    // Change theme at the middle of transition (when screen is "off")
    setTimeout(() => {
      if (callback) callback();
    }, 750); // Half of 1.5s transition

    // Remove transition classes after animation
    setTimeout(() => {
      if (vhsOverlayRef.current) {
        vhsOverlayRef.current.classList.remove('active');
      }
      if (vhsFlashRef.current) {
        vhsFlashRef.current.classList.remove('active');
      }
      setIsTransitioning(false);
    }, 1500);
  };

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    updateSetting('darkMode', newDarkMode);
  };

  const setTheme = (newTheme) => {
    if (newTheme === themeMode) return;

    playVHSTransition(() => {
      setThemeMode(newTheme);
      updateSetting('themeMode', newTheme);
    });
  };

  return (
    <ThemeContext.Provider value={{ 
      darkMode, 
      toggleDarkMode,
      themeMode,
      setTheme,
      isTransitioning,
      THEME_MODES
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

