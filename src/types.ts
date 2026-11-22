export type GameStatus = 'playing' | 'won' | 'lost';

/** Configuration options for the Hangman game. */
export interface HangmanConfig {
  wordList?: string[];
  maxLives?: number;
}

/** State and actions returned by useHangman hook. */
export interface HangmanState {
  currentWord: string;
  guessedLetters: Set<string>;
  wrongGuesses: string[];
  gameStatus: GameStatus;
  handleGuess: (letter: string) => void;
  resetGame: () => void;
  maxLives: number;
}
