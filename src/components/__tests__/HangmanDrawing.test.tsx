import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { HangmanDrawing } from '../HangmanDrawing';

describe('HangmanDrawing', () => {
  it('has descriptive aria-label that updates with wrong count', () => {
    const { rerender } = render(<HangmanDrawing wrongCount={0} />);
    expect(screen.getByRole('img')).toHaveAttribute('aria-label', 'Hangman drawing: 0 wrong guesses out of 6');

    rerender(<HangmanDrawing wrongCount={5} />);
    expect(screen.getByRole('img')).toHaveAttribute('aria-label', 'Hangman drawing: 5 wrong guesses out of 6');
  });
});
