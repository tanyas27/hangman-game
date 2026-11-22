import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useHangman } from '../useHangman';

// Mock the word selection to have deterministic tests
vi.mock('../../utils/wordUtils', () => ({
  selectRandomWord: vi.fn((wordList: string[]) => wordList[0] || 'TEST'),
}));

describe('useHangman', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('initialization', () => {
    it('should initialize with a word from the word list', () => {
      const { result } = renderHook(() => useHangman(['REACT']));

      expect(result.current.currentWord).toBe('REACT');
      expect(result.current.guessedLetters.size).toBe(0);
      expect(result.current.gameStatus).toBe('playing');
    });

    it('should accept a custom word list', () => {
      const customWords = ['CUSTOM', 'WORDS'];
      const { result } = renderHook(() => useHangman(customWords));

      expect(result.current.currentWord).toBe('CUSTOM');
    });

    it('should initialize with empty guessed letters', () => {
      const { result } = renderHook(() => useHangman(['TEST']));

      expect(result.current.guessedLetters).toEqual(new Set());
      expect(result.current.wrongGuesses).toEqual([]);
    });
  });

  describe('handleGuess', () => {
    it('should add a correct guess to guessed letters', () => {
      const { result } = renderHook(() => useHangman(['REACT']));

      act(() => {
        result.current.handleGuess('R');
      });

      expect(result.current.guessedLetters.has('R')).toBe(true);
      expect(result.current.wrongGuesses).toEqual([]);
    });

    it('should add a wrong guess to guessed letters', () => {
      const { result } = renderHook(() => useHangman(['REACT']));

      act(() => {
        result.current.handleGuess('Z');
      });

      expect(result.current.guessedLetters.has('Z')).toBe(true);
      expect(result.current.wrongGuesses).toEqual(['Z']);
    });

    it('should not add duplicate guesses', () => {
      const { result } = renderHook(() => useHangman(['REACT']));

      act(() => {
        result.current.handleGuess('R');
      });

      const guessedCountBefore = result.current.guessedLetters.size;

      act(() => {
        result.current.handleGuess('R'); // Try to guess again
      });

      expect(result.current.guessedLetters.size).toBe(guessedCountBefore);
    });

    it('should handle multiple guesses correctly', () => {
      const { result } = renderHook(() => useHangman(['REACT']));

      act(() => {
        result.current.handleGuess('R');
        result.current.handleGuess('E');
        result.current.handleGuess('Z');
      });

      expect(result.current.guessedLetters.size).toBe(3);
      expect(result.current.guessedLetters.has('R')).toBe(true);
      expect(result.current.guessedLetters.has('E')).toBe(true);
      expect(result.current.wrongGuesses).toContain('Z');
    });

    it('should not allow guesses after game is won', () => {
      const { result } = renderHook(() => useHangman(['HI']));

      // Win the game
      act(() => {
        result.current.handleGuess('H');
        result.current.handleGuess('I');
      });

      expect(result.current.gameStatus).toBe('won');

      const guessedCountBefore = result.current.guessedLetters.size;

      // Try to guess after winning
      act(() => {
        result.current.handleGuess('Z');
      });

      expect(result.current.guessedLetters.size).toBe(guessedCountBefore);
    });

    it('should not allow guesses after game is lost', () => {
      const { result } = renderHook(() => useHangman(['TEST']));

      // Lose the game with 6 wrong guesses
      act(() => {
        result.current.handleGuess('A');
        result.current.handleGuess('B');
        result.current.handleGuess('C');
        result.current.handleGuess('D');
        result.current.handleGuess('F');
        result.current.handleGuess('G');
      });

      expect(result.current.gameStatus).toBe('lost');

      const guessedCountBefore = result.current.guessedLetters.size;

      // Try to guess after losing
      act(() => {
        result.current.handleGuess('Z');
      });

      expect(result.current.guessedLetters.size).toBe(guessedCountBefore);
    });
  });

  describe('game status', () => {
    it('should set status to won when all letters are guessed', () => {
      const { result } = renderHook(() => useHangman(['CAT']));

      act(() => {
        result.current.handleGuess('C');
        result.current.handleGuess('A');
        result.current.handleGuess('T');
      });

      expect(result.current.gameStatus).toBe('won');
    });

    it('should handle words with repeated letters', () => {
      const { result } = renderHook(() => useHangman(['BOOK']));

      act(() => {
        result.current.handleGuess('B');
        result.current.handleGuess('O'); // Covers both O's
        result.current.handleGuess('K');
      });

      expect(result.current.gameStatus).toBe('won');
    });

    it('should set status to lost after 6 wrong guesses', () => {
      const { result } = renderHook(() => useHangman(['TEST']));

      act(() => {
        result.current.handleGuess('A');
        result.current.handleGuess('B');
        result.current.handleGuess('C');
        result.current.handleGuess('D');
        result.current.handleGuess('F');
        result.current.handleGuess('G');
      });

      expect(result.current.gameStatus).toBe('lost');
      expect(result.current.wrongGuesses.length).toBe(6);
    });

    it('should not be lost with 5 wrong guesses', () => {
      const { result } = renderHook(() => useHangman(['TEST']));

      act(() => {
        result.current.handleGuess('A');
        result.current.handleGuess('B');
        result.current.handleGuess('C');
        result.current.handleGuess('D');
        result.current.handleGuess('F');
      });

      expect(result.current.gameStatus).toBe('playing');
      expect(result.current.wrongGuesses.length).toBe(5);
    });
  });

  describe('resetGame', () => {
    it('should reset to new word and clear guesses', () => {
      const { result } = renderHook(() => useHangman(['REACT', 'PYTHON']));

      // Make some guesses
      act(() => {
        result.current.handleGuess('R');
        result.current.handleGuess('Z');
      });

      expect(result.current.guessedLetters.size).toBeGreaterThan(0);

      // Reset
      act(() => {
        result.current.resetGame();
      });

      expect(result.current.guessedLetters.size).toBe(0);
      expect(result.current.wrongGuesses.length).toBe(0);
      expect(result.current.gameStatus).toBe('playing');
      expect(result.current.currentWord).toBeTruthy();
    });

    it('should work from any game state', () => {
      const { result } = renderHook(() => useHangman(['HI']));

      // Win the game
      act(() => {
        result.current.handleGuess('H');
        result.current.handleGuess('I');
      });

      expect(result.current.gameStatus).toBe('won');

      // Reset
      act(() => {
        result.current.resetGame();
      });

      expect(result.current.gameStatus).toBe('playing');
      expect(result.current.guessedLetters.size).toBe(0);
    });
  });
});
