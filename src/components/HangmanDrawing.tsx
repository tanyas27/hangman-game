interface HangmanDrawingProps {
  wrongCount: number;
}

export const HangmanDrawing = ({ wrongCount }: HangmanDrawingProps) => {
  const HEAD = wrongCount >= 1;
  const BODY = wrongCount >= 2;
  const LEFT_ARM = wrongCount >= 3;
  const RIGHT_ARM = wrongCount >= 4;
  const LEFT_LEG = wrongCount >= 5;
  const RIGHT_LEG = wrongCount >= 6;

  return (
    <svg height="250" width="200" className="hangman-svg">
      {/* Gallows */}
      <line
        x1="60"
        y1="20"
        x2="140"
        y2="20"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <line
        x1="140"
        y1="20"
        x2="140"
        y2="50"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <line
        x1="60"
        y1="20"
        x2="60"
        y2="230"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <line
        x1="20"
        y1="230"
        x2="100"
        y2="230"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />

      {/* Body parts (conditionally rendered) */}
      {HEAD && (
        <circle
          cx="140"
          cy="70"
          r="20"
          stroke="currentColor"
          strokeWidth="4"
          fill="none"
        />
      )}
      {BODY && (
        <line
          x1="140"
          y1="90"
          x2="140"
          y2="150"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
        />
      )}
      {LEFT_ARM && (
        <line
          x1="140"
          y1="110"
          x2="110"
          y2="130"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
        />
      )}
      {RIGHT_ARM && (
        <line
          x1="140"
          y1="110"
          x2="170"
          y2="130"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
        />
      )}
      {LEFT_LEG && (
        <line
          x1="140"
          y1="150"
          x2="110"
          y2="180"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
        />
      )}
      {RIGHT_LEG && (
        <line
          x1="140"
          y1="150"
          x2="170"
          y2="180"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
        />
      )}
    </svg>
  );
};
