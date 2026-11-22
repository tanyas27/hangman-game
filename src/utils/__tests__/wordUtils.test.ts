import { describe, it, expect } from 'vitest';
import { selectRandomWord } from '../wordUtils';

describe('wordUtils', () => {
  describe('selectRandomWord', () => {
    it('should return a word from the list', () => {
      const list = ['APPLE', 'BANANA', 'CHERRY'];
      const word = selectRandomWord(list);
      expect(list).toContain(word);
    });

    it('should return uppercase word', () => {
      const word = selectRandomWord(['test']);
      expect(word).toBe('TEST');
    });

    it('should handle empty list', () => {
      const word = selectRandomWord([]);
      expect(word).toBe('HANGMAN');
    });
  });
});
