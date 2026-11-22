import { useHangman } from '../hooks/useHangman';
import { useKeyboardInput } from '../hooks/useKeyboardInput';
import { HangmanDrawing } from './HangmanDrawing';
import { WordDisplay } from './WordDisplay';
import { Keyboard } from './Keyboard';
import { GameStatusModal } from './GameStatus';
import type { HangmanConfig } from '../types';
import './Hangman.css';

interface HangmanProps {
  config?: HangmanConfig;
}

export const Hangman = ({ config }: HangmanProps) => {
  const {
    currentWord,
    guessedLetters,
    wrongGuesses,
    gameStatus,
    handleGuess,
    resetGame,
    maxLives,
  } = useHangman(config);

  useKeyboardInput({
    onKeyPress: handleGuess,
    enabled: gameStatus === 'playing',
  });

  return (
    <div className="hangman-container">
      <h1 className="title">Hangman Game</h1>
      <p className="keyboard-hint">
        Use your keyboard or click the letters below
      </p>

      <div className="visually-hidden" role="status" aria-live="polite">
        {wrongGuesses.length} wrong guesses, {maxLives - wrongGuesses.length} lives remaining
      </div>

      <HangmanDrawing wrongCount={wrongGuesses.length} />

      <WordDisplay
        word={currentWord}
        guessedLetters={guessedLetters}
        gameStatus={gameStatus}
      />

      <Keyboard
        onLetterClick={handleGuess}
        guessedLetters={guessedLetters}
        currentWord={currentWord}
        disabled={gameStatus !== 'playing'}
      />

      <GameStatusModal gameStatus={gameStatus} onReset={resetGame} />
    </div>
  );
};
