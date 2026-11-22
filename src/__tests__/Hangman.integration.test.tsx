import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Hangman } from '../components/Hangman';

// Mock random word selection for deterministic tests
vi.mock('../utils/wordUtils', () => ({
  selectRandomWord: vi.fn(() => 'CAT'),
}));

describe('Hangman Game Integration', () => {
  it('should complete a winning game flow', async () => {
    const user = userEvent.setup();
    render(<Hangman />);

    // Game starts - verify initial state
    expect(screen.getByText(/hangman game/i)).toBeInTheDocument();
    expect(screen.queryByText(/you won/i)).not.toBeInTheDocument();

    // Guess correct letters: C, A, T
    await user.click(screen.getByRole('button', { name: 'C' }));
    await user.click(screen.getByRole('button', { name: 'A' }));
    await user.click(screen.getByRole('button', { name: 'T' }));

    // Win modal should appear
    expect(screen.getByText(/you won/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /play again/i })).toBeInTheDocument();
  });

  it('should complete a losing game flow', async () => {
    const user = userEvent.setup();
    render(<Hangman />);

    // Make 6 wrong guesses (MAX_LIVES)
    const wrongLetters = ['X', 'Y', 'Z', 'Q', 'W', 'R'];
    for (const letter of wrongLetters) {
      await user.click(screen.getByRole('button', { name: letter }));
    }

    // Lose modal should appear
    expect(screen.getByText(/you lost/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /try again/i })).toBeInTheDocument();
  });

  it('should reset game when play again is clicked', async () => {
    const user = userEvent.setup();
    render(<Hangman />);

    // Win the game quickly
    await user.click(screen.getByRole('button', { name: 'C' }));
    await user.click(screen.getByRole('button', { name: 'A' }));
    await user.click(screen.getByRole('button', { name: 'T' }));

    expect(screen.getByText(/you won/i)).toBeInTheDocument();

    // Click reset
    await user.click(screen.getByRole('button', { name: /play again/i }));

    // Modal should be gone, game reset
    expect(screen.queryByText(/you won/i)).not.toBeInTheDocument();
  });

  it('should handle keyboard input', async () => {
    const user = userEvent.setup();
    render(<Hangman />);

    // Type letters on keyboard
    await user.keyboard('C');
    await user.keyboard('A');
    await user.keyboard('T');

    // Should win
    expect(screen.getByText(/you won/i)).toBeInTheDocument();
  });

  it('should disable guessing after game ends', async () => {
    const user = userEvent.setup();
    render(<Hangman />);

    // Win the game
    await user.click(screen.getByRole('button', { name: 'C' }));
    await user.click(screen.getByRole('button', { name: 'A' }));
    await user.click(screen.getByRole('button', { name: 'T' }));

    // Try to guess another letter after winning
    const buttonX = screen.getByRole('button', { name: 'X' });
    await user.click(buttonX);

    // Button should be disabled (not register the click)
    expect(buttonX).toBeDisabled();
  });
});
