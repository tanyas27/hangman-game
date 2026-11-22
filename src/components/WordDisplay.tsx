import type { GameStatus } from '../types';

interface WordDisplayProps {
  word: string;
  guessedLetters: Set<string>;
  gameStatus: GameStatus;
}

export const WordDisplay = ({
  word,
  guessedLetters,
  gameStatus,
}: WordDisplayProps) => {
  return (
    <div className="word-display">
      {word.split('').map((letter, index) => {
        const isGuessed = guessedLetters.has(letter.toUpperCase());
        const showLetter = gameStatus !== 'playing' || isGuessed;

        // After game ends: green for guessed, red for missed
        const letterClass =
          gameStatus !== 'playing'
            ? isGuessed
              ? 'letter-correct'
              : 'letter-missed'
            : '';

        return (
          <span key={index} className={`letter ${letterClass}`}>
            {showLetter ? letter : '_'}
          </span>
        );
      })}
    </div>
  );
};
