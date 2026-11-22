import { useState, useEffect, useCallback, useMemo } from 'react';
import { selectRandomWord } from '../utils/wordUtils';
import { DEFAULT_WORD_LIST } from '../constants/words';
import { MAX_LIVES } from '../constants/config';
import type { GameStatus, HangmanConfig, HangmanState } from '../types';

const DEFAULT_CONFIG: HangmanConfig = {
  wordList: DEFAULT_WORD_LIST,
  maxLives: MAX_LIVES,
};

export const useHangman = (config?: HangmanConfig): HangmanState => {
  const { wordList, maxLives } = { ...DEFAULT_CONFIG, ...config };

  const [currentWord, setCurrentWord] = useState('');
  const [guessedLetters, setGuessedLetters] = useState<Set<string>>(new Set());

  const wrongGuesses = useMemo(
    () =>
      Array.from(guessedLetters).filter(
        (letter) => !currentWord.includes(letter)
      ),
    [guessedLetters, currentWord]
  );

  const isWon =
    currentWord &&
    currentWord
      .split('')
      .every((letter) => guessedLetters.has(letter));

  const isLost = wrongGuesses.length >= maxLives!;

  const gameStatus: GameStatus = isWon ? 'won' : isLost ? 'lost' : 'playing';

  const resetGame = useCallback(() => {
    setCurrentWord(selectRandomWord(wordList!).toUpperCase());
    setGuessedLetters(new Set());
  }, [wordList]);

  useEffect(() => {
    resetGame();
  }, [resetGame]);

  const handleGuess = useCallback(
    (letter: string) => {
      if (gameStatus !== 'playing') return;
      if (guessedLetters.has(letter)) return;

      setGuessedLetters((prev) => new Set(prev).add(letter));
    },
    [gameStatus, guessedLetters]
  );

  return {
    currentWord,
    guessedLetters,
    wrongGuesses,
    gameStatus,
    handleGuess,
    resetGame,
    maxLives: maxLives!,
  };
};
