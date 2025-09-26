import { BaseGame } from './BaseGame.js';
import { FadingGame } from './FadingGame.js';
import { FogGame } from './FogGame.js';
import { GravityGame } from './GravityGame.js';

export const GAME_MODES = {
  STANDARD: 'standard',
  FADING: 'fading',
  FOG: 'fog',
  GRAVITY: 'gravity'
};

export const GAME_CONFIGS = {
  [GAME_MODES.STANDARD]: {
    width: 3,
    height: 3,
    winCondition: 3,
    name: 'Standard Tic-Tac-Toe',
    description: 'Classic 3x3 tic-tac-toe game',
    difficulty: 'Easy'
  },
  [GAME_MODES.FADING]: {
    width: 3,
    height: 3,
    winCondition: 3,
    markLifespan: 4,
    name: 'Fading Marks',
    description: 'Marks disappear after 4 turns. Plan your strategy carefully!',
    difficulty: 'Medium'
  },
  [GAME_MODES.FOG]: {
    width: 5,
    height: 5,
    winCondition: 4,
    revealRadius: 1,
    name: 'Fog of War',
    description: 'Limited board visibility. Reveal cells by playing nearby!',
    difficulty: 'Hard'
  },
  [GAME_MODES.GRAVITY]: {
    width: 3,
    height: 6,
    winCondition: 4,
    name: 'Gravity Drop',
    description: 'Pieces fall down like Connect Four. Think vertically!',
    difficulty: 'Easy'
  }
};

export function createGame(mode, config = {}) {
  const gameConfig = { ...GAME_CONFIGS[mode], ...config };
  
  switch (mode) {
    case GAME_MODES.FADING:
      return new FadingGame(gameConfig);
    case GAME_MODES.FOG:
      return new FogGame(gameConfig);
    case GAME_MODES.GRAVITY:
      return new GravityGame(gameConfig);
    case GAME_MODES.STANDARD:
    default:
      return new BaseGame(gameConfig);
  }
}

export function getGameConfig(mode) {
  return GAME_CONFIGS[mode] || GAME_CONFIGS[GAME_MODES.STANDARD];
}

export function isValidGameMode(mode) {
  return Object.values(GAME_MODES).includes(mode);
}

export function getGameModesList() {
  return Object.entries(GAME_CONFIGS).map(([key, config]) => ({
    mode: key,
    ...config
  }));
}
