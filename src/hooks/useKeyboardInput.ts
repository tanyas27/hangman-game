import { useEffect, useEffectEvent } from 'react';

interface UseKeyboardInputProps {
  onKeyPress: (letter: string) => void;
  enabled: boolean;
}

export const useKeyboardInput = ({ onKeyPress, enabled }: UseKeyboardInputProps) => {
  const onKey = useEffectEvent((letter: string) => {
    onKeyPress(letter);
  });

  useEffect(() => {
    if (!enabled) return;

    const handleKeyPress = (event: KeyboardEvent) => {
      const key = event.key.toUpperCase();

      if (key.length === 1 && key >= 'A' && key <= 'Z') {
        event.preventDefault();
        onKey(key);
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [enabled]);
};
