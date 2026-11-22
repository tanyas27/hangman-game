export const selectRandomWord = (wordList: string[]): string => {
  if (wordList.length === 0) return 'HANGMAN';
  return wordList[Math.floor(Math.random() * wordList.length)].toUpperCase();
};
