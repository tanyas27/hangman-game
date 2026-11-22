import { KEYBOARD_LETTERS } from '../constants/config';

interface KeyboardProps {
  onLetterClick: (letter: string) => void;
  guessedLetters: Set<string>;
  currentWord: string;
  disabled: boolean;
}

export const Keyboard = ({
  onLetterClick,
  guessedLetters,
  currentWord,
  disabled,
}: KeyboardProps) => {
  const getButtonState = (letter: string) => {
    if (!guessedLetters.has(letter)) return 'default';
    return currentWord.includes(letter) ? 'correct' : 'wrong';
  };

  return (
    <div className="keyboard">
      {KEYBOARD_LETTERS.map((letter) => {
        const state = getButtonState(letter);
        const isDisabled = disabled || guessedLetters.has(letter);

        return (
          <button
            key={letter}
            onClick={() => onLetterClick(letter)}
            disabled={isDisabled}
            className={`key key-${state}`}
          >
            {letter}
          </button>
        );
      })}
    </div>
  );
};
