import { BaseGame } from '../BaseGame';

describe('BaseGame', () => {
  let game;

  beforeEach(() => {
    game = new BaseGame();
  });

  test('initializes with empty board', () => {
    const state = game.getGameState();
    expect(state.board).toEqual([
      [null, null, null],
      [null, null, null],
      [null, null, null]
    ]);
  });

  test('initializes with X as current player', () => {
    expect(game.currentPlayer).toBe('X');
  });

  test('makes a valid move', () => {
    const success = game.makeMove(0, 0);
    expect(success).toBe(true);
    expect(game.board[0][0]).toBe('X');
  });

  test('rejects invalid move', () => {
    game.makeMove(0, 0);
    const success = game.makeMove(0, 0); // Same cell
    expect(success).toBe(false);
  });

  test('switches player after move', () => {
    game.makeMove(0, 0);
    expect(game.currentPlayer).toBe('O');
    game.makeMove(0, 1);
    expect(game.currentPlayer).toBe('X');
  });

  test('detects horizontal win', () => {
    game.makeMove(0, 0); // X
    game.makeMove(1, 1); // O
    game.makeMove(1, 0); // X
    game.makeMove(2, 1); // O
    game.makeMove(2, 0); // X - wins
    expect(game.winner).toBe('X');
    expect(game.gameOver).toBe(true);
  });

  test('detects vertical win', () => {
    game.makeMove(0, 0); // X
    game.makeMove(1, 0); // O
    game.makeMove(0, 1); // X
    game.makeMove(1, 1); // O
    game.makeMove(0, 2); // X - wins
    expect(game.winner).toBe('X');
    expect(game.gameOver).toBe(true);
  });

  test('detects diagonal win', () => {
    game.makeMove(0, 0); // X
    game.makeMove(1, 0); // O
    game.makeMove(1, 1); // X
    game.makeMove(2, 0); // O
    game.makeMove(2, 2); // X - wins
    expect(game.winner).toBe('X');
    expect(game.gameOver).toBe(true);
  });

  test('detects draw', () => {
    // X O X
    // X O O
    // O X X
    game.makeMove(0, 0); // X
    game.makeMove(1, 0); // O
    game.makeMove(2, 0); // X
    game.makeMove(1, 1); // O
    game.makeMove(0, 1); // X
    game.makeMove(2, 1); // O
    game.makeMove(1, 2); // X
    game.makeMove(0, 2); // O
    game.makeMove(2, 2); // X
    expect(game.gameOver).toBe(true);
    expect(game.winner).toBe(null);
  });

  test('undo functionality', () => {
    game.makeMove(0, 0);
    game.makeMove(1, 0);
    const beforeUndo = game.getGameState();
    game.undo();
    expect(game.board[1][0]).toBe(null);
    expect(game.currentPlayer).toBe('O');
  });

  test('cannot undo when stack is empty', () => {
    expect(game.canUndo()).toBe(false);
    expect(game.undo()).toBe(false);
  });

  test('cannot undo after game over', () => {
    game.makeMove(0, 0);
    game.makeMove(1, 0);
    game.makeMove(1, 1);
    game.makeMove(2, 0);
    game.makeMove(2, 2); // X wins
    expect(game.canUndo()).toBe(false);
  });

  test('reset clears board and state', () => {
    game.makeMove(0, 0);
    game.makeMove(1, 1);
    game.reset();
    expect(game.board[0][0]).toBe(null);
    expect(game.currentPlayer).toBe('X');
    expect(game.winner).toBe(null);
    expect(game.gameOver).toBe(false);
    expect(game.undoStack.length).toBe(0);
  });

  test('getValidMoves returns all empty cells', () => {
    game.makeMove(0, 0);
    const moves = game.getValidMoves();
    expect(moves.length).toBe(8);
    expect(moves).not.toContainEqual({ x: 0, y: 0 });
  });

  test('clone creates independent copy', () => {
    game.makeMove(0, 0);
    const cloned = game.clone();
    cloned.makeMove(1, 1);
    expect(game.board[1][1]).toBe(null);
    expect(cloned.board[1][1]).toBe('O');
  });
});


