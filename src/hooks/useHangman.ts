import { useState, useEffect } from 'react';
import { selectRandomWord } from '../utils/wordUtils';
import { DEFAULT_WORD_LIST } from '../constants/words';
import { MAX_LIVES } from '../constants/config';
import type { GameStatus } from '../types';

export const useHangman = (wordList: string[] = DEFAULT_WORD_LIST) => {
  const [currentWord, setCurrentWord] = useState('');
  const [guessedLetters, setGuessedLetters] = useState<Set<string>>(new Set());

  const wrongGuesses = Array.from(guessedLetters).filter(
    (letter) => !currentWord.toUpperCase().includes(letter)
  );

  const isWon =
    currentWord &&
    currentWord
      .split('')
      .every((letter) => guessedLetters.has(letter.toUpperCase()));

  const isLost = wrongGuesses.length >= MAX_LIVES;

  const gameStatus: GameStatus = isWon ? 'won' : isLost ? 'lost' : 'playing';

  useEffect(() => {
    resetGame();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleGuess = (letter: string) => {
    if (gameStatus !== 'playing') return;
    if (guessedLetters.has(letter)) return;

    setGuessedLetters((prev) => new Set(prev).add(letter));
  };

  const resetGame = () => {
    setCurrentWord(selectRandomWord(wordList).toUpperCase());
    setGuessedLetters(new Set());
  };

  return {
    currentWord,
    guessedLetters,
    wrongGuesses,
    gameStatus,
    handleGuess,
    resetGame,
  };
};
