import type { GameStatus } from '../types';

interface GameStatusModalProps {
  gameStatus: GameStatus;
  onReset: () => void;
}

export const GameStatusModal = ({ gameStatus, onReset }: GameStatusModalProps) => {
  return (
    <>
      {(gameStatus === 'won' || gameStatus === 'lost') && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>{gameStatus === 'won' ? 'You Won!' : 'You Lost!'}</h2>
            <button onClick={onReset} className="reset-button">
              {gameStatus === 'won' ? 'Play Again' : 'Try Again'}
            </button>
          </div>
        </div>
      )}
    </>
  );
};
