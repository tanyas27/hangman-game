import type { GameStatus } from '../types';
import './WordDisplay.css';

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
    <div
      className="word-display"
      role="region"
      aria-label="Current word progress"
    >
      {word.split('').map((letter, index) => {
        const isGuessed = guessedLetters.has(letter);
        const showLetter = gameStatus !== 'playing' || isGuessed;

        const letterClass =
          gameStatus !== 'playing'
            ? isGuessed
              ? 'letter-correct'
              : 'letter-missed'
            : '';

        return (
          <span
            key={index}
            className={`letter ${letterClass}`}
            role="text"
            aria-label={
              showLetter
                ? `Letter ${letter}`
                : `Hidden letter ${index + 1} of ${word.length}`
            }
          >
            {showLetter ? letter : '_'}
          </span>
        );
      })}
    </div>
  );
};
