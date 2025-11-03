// Game constants
export const PLAYERS = {
  X: 'X',
  O: 'O'
};

export const GAME_STATES = {
  NOT_STARTED: 'not_started',
  IN_PROGRESS: 'in_progress',
  PAUSED: 'paused',
  FINISHED: 'finished'
};

export const OPPONENT_TYPES = {
  AI: 'ai',
  TEST: 'test',
  HUMAN: 'human'
};

export const AI_DIFFICULTIES = {
  EASY: 'easy',
  MEDIUM: 'medium',
  HARD: 'hard'
};

// UI constants
export const ROUTES = {
  HOME: '/',
  MODES: '/modes',
  ENTRY: '/entry',
  GAME: '/game',
  STATS: '/stats',
  SETTINGS: '/settings'
};

export const BREAKPOINTS = {
  MOBILE: 480,
  TABLET: 768,
  DESKTOP: 1024
};

// Animation durations (in milliseconds)
export const ANIMATIONS = {
  FAST: 150,
  MEDIUM: 300,
  SLOW: 500,
  TYPEWRITER: 2000
};

// Local storage keys
export const STORAGE_KEYS = {
  GAME_STATS: 'tic_tac_toe_stats',
  SETTINGS: 'tic_tac_toe_settings',
  HIGH_SCORES: 'tic_tac_toe_high_scores'
};

// Game statistics
export const STATS_KEYS = {
  GAMES_PLAYED: 'gamesPlayed',
  GAMES_WON: 'gamesWon',
  GAMES_LOST: 'gamesLost',
  GAMES_DRAWN: 'gamesDrawn',
  TOTAL_MOVES: 'totalMoves',
  AVERAGE_GAME_TIME: 'averageGameTime',
  FAVORITE_MODE: 'favoriteMode'
};

// Error messages
export const ERROR_MESSAGES = {
  INVALID_MOVE: 'Invalid move. Please try again.',
  GAME_OVER: 'Game is already over.',
  INVALID_MODE: 'Invalid game mode selected.',
  NETWORK_ERROR: 'Network error. Please check your connection.',
  UNKNOWN_ERROR: 'An unknown error occurred.'
};

// Success messages
export const SUCCESS_MESSAGES = {
  GAME_WON: 'Congratulations! You won!',
  GAME_DRAWN: 'It\'s a draw!',
  MOVE_MADE: 'Move made successfully.',
  GAME_RESET: 'Game has been reset.'
};

// Default settings
export const DEFAULT_SETTINGS = {
  soundEnabled: true,
  animationsEnabled: true,
  autoSave: true,
  theme: 'pixel',
  difficulty: AI_DIFFICULTIES.MEDIUM
};
