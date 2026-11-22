import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Keyboard } from '../Keyboard';
import { WordDisplay } from '../WordDisplay';
import { GameStatusModal } from '../GameStatus';

// Minimal component tests - only test what integration tests don't cover well

describe('Component CSS & Accessibility', () => {
  it('Keyboard: applies correct CSS classes for guess states', () => {
    render(
      <Keyboard
        onLetterClick={vi.fn()}
        guessedLetters={new Set(['T', 'X'])}
        currentWord="TEST"
        disabled={false}
      />
    );
    expect(screen.getByRole('button', { name: /Letter T/ })).toHaveClass('key-correct');
    expect(screen.getByRole('button', { name: /Letter X/ })).toHaveClass('key-wrong');
  });

  it('WordDisplay: applies CSS classes for game end states', () => {
    const { rerender, container } = render(
      <WordDisplay word="CAT" guessedLetters={new Set(['C', 'A', 'T'])} gameStatus="won" />
    );
    expect(container.querySelectorAll('.letter-correct').length).toBeGreaterThan(0);

    rerender(<WordDisplay word="CAT" guessedLetters={new Set(['C'])} gameStatus="lost" />);
    expect(container.querySelectorAll('.letter-missed').length).toBeGreaterThan(0);
  });

  it('GameStatusModal: renders portal with correct ARIA attributes', () => {
    render(<GameStatusModal gameStatus="won" onReset={vi.fn()} />);

    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(document.body.querySelector('.modal-overlay')).toBeInTheDocument();
  });
});
