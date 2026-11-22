import { createPortal } from 'react-dom';
import type { GameStatus } from '../types';
import './GameStatus.css';

interface GameStatusModalProps {
  gameStatus: GameStatus;
  onReset: () => void;
}

export const GameStatusModal = ({ gameStatus, onReset }: GameStatusModalProps) => {
  const isOpen = gameStatus === 'won' || gameStatus === 'lost';

  if (!isOpen) return null;

  return createPortal(
    <div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="game-result"
    >
      <div className="modal">
        <h2 id="game-result">
          {gameStatus === 'won' ? 'You Won!' : 'You Lost!'}
        </h2>
        <button
          onClick={onReset}
          className="reset-button"
          aria-label="Start a new game"
        >
          {gameStatus === 'won' ? 'Play Again' : 'Try Again'}
        </button>
      </div>
    </div>,
    document.body
  );
};
