import { KEYBOARD_LETTERS } from '../constants/config';
import './Keyboard.css';

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
  return (
    <div className="keyboard" role="group" aria-label="Virtual keyboard">
      {KEYBOARD_LETTERS.map((letter) => {
        const isGuessed = guessedLetters.has(letter);
        const isCorrect = isGuessed && currentWord.includes(letter);

        const state = !isGuessed ? 'default' : isCorrect ? 'correct' : 'wrong';
        const isDisabled = disabled || isGuessed;

        return (
          <button
            key={letter}
            type="button"
            onClick={() => onLetterClick(letter)}
            disabled={isDisabled}
            className={`key key-${state}`}
            aria-label={`Letter ${letter}${
              state === 'correct' ? ', correct guess' :
              state === 'wrong' ? ', wrong guess' :
              ''
            }`}
            aria-pressed={isGuessed}
          >
            {letter}
          </button>
        );
      })}
    </div>
  );
};
