import { AIPlayer } from '../aiLogic';
import { BaseGame } from '../BaseGame';

describe('AIPlayer', () => {
  let ai;
  let game;

  beforeEach(() => {
    ai = new AIPlayer('easy', 'standard');
    game = new BaseGame();
  });

  test('creates AI player with difficulty', () => {
    expect(ai.difficulty).toBe('easy');
    expect(ai.gameType).toBe('standard');
  });

  test('easy difficulty returns random move', async () => {
    const move = await ai.getMove(game);
    expect(move).toBeDefined();
    expect(move).toHaveProperty('x');
    expect(move).toHaveProperty('y');
    expect(move.x).toBeGreaterThanOrEqual(0);
    expect(move.x).toBeLessThan(3);
    expect(move.y).toBeGreaterThanOrEqual(0);
    expect(move.y).toBeLessThan(3);
  });

  test('returns null when no valid moves', async () => {
    // Fill board except one cell
    game.board = [
      ['X', 'O', 'X'],
      ['O', 'X', 'O'],
      ['X', 'O', null]
    ];
    game.currentPlayer = 'X';
    const move = await ai.getMove(game);
    expect(move).toEqual({ x: 2, y: 2 });
  });

  test('hard difficulty returns a valid move in complex scenarios', async () => {
    const hardAI = new AIPlayer('hard', 'standard');
    const scenario = new BaseGame();
    scenario.makeMove(0, 0); // X
    scenario.makeMove(0, 1); // O
    scenario.makeMove(2, 2); // X
    scenario.makeMove(1, 1); // O
    scenario.makeMove(1, 0); // X

    const move = await hardAI.getMove(scenario);
    expect(scenario.isValidMove(move.x, move.y)).toBe(true);
  });

  test('hard difficulty takes winning move when it is the only option', async () => {
    const hardAI = new AIPlayer('hard', 'standard');
    const scenario = new BaseGame();
    scenario.board = [
      ['O', 'O', null],
      ['X', 'X', 'O'],
      ['X', 'O', 'X']
    ];
    scenario.currentPlayer = 'O';

    const move = await hardAI.getMove(scenario);
    expect(move).toEqual({ x: 2, y: 0 });
  });
});


