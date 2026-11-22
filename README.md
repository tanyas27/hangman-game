# Hangman Game

A modern, interactive Hangman word guessing game built with React 19, TypeScript, and Vite.

## Features

- 🎮 Classic Hangman gameplay with visual feedback
- ⌨️ Virtual alphabetical keyboard (A-Z) with color-coded button states
- 🖱️ Physical keyboard support - type letters to play
- 🎨 Clean, responsive UI matching reference design
- ✅ Green highlights for correct guesses
- ❌ Red/gray highlights for wrong guesses
- 🎯 SVG hangman drawing with 7 progressive stages
- 🪟 Modal popup for win/loss state
- 🔄 Reset game functionality
- 📱 Mobile-responsive design (adaptive grid layout)
- ✨ Smooth animations and transitions
- 🧪 Comprehensive test coverage (159 tests)

## Tech Stack

- **React 19.3** - Latest React with modern hooks
- **TypeScript 7.0** - Type safety and better DX
- **Vite 8.3** - Fast build tool and dev server (10-20x faster than CRA)
- **Vitest 5.1** - Unit testing framework
- **React Testing Library 16.3** - Component testing

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build

```bash
npm run build
```

### Test

```bash
npm test           # Run all tests
npm test -- --watch # Watch mode
```

## Project Structure

```
src/
├── components/              # React components
│   ├── Hangman.tsx         # Main game container
│   ├── Hangman.css         # Main component styles
│   ├── HangmanDrawing.tsx  # SVG hangman figure
│   ├── HangmanDrawing.css  # Drawing styles
│   ├── WordDisplay.tsx     # Word with blanks/letters
│   ├── WordDisplay.css     # Word display styles
│   ├── Keyboard.tsx        # Alphabetical keyboard (A-Z)
│   ├── Keyboard.css        # Keyboard styles
│   ├── GameStatus.tsx      # Win/loss modal
│   └── GameStatus.css      # Modal styles
├── hooks/                  # Custom React hooks
│   ├── useHangman.ts       # Game state management
│   └── useKeyboardInput.ts # Physical keyboard handler
├── utils/                  # Utility functions
│   └── wordUtils.ts        # Word selection
├── constants/              # Configuration
│   ├── words.ts            # Word list
│   └── config.ts           # Game config
├── globals.css             # Global styles
├── types.ts                # TypeScript types
├── setup.ts                # Test setup
└── vitest-setup.d.ts       # Test TypeScript declarations
```

## Game Rules

1. A random word is selected from the word list
2. Click letters on the keyboard OR press keys on your physical keyboard
3. Correct guesses reveal letters in the word
4. Wrong guesses add parts to the hangman drawing
5. Win by guessing all letters before 6 wrong guesses
6. A modal appears when you win or lose with reset option
7. After the game ends, missed letters show in red and correct ones in green

## UI Design

- **Background**: Light purple/lavender (#e8eaf6)
- **Layout**: Centered vertical flow
- **Keyboard**: CSS Grid with 9 columns (responsive: 7 on tablet, 5 on mobile)
- **Modal**: Fixed overlay with semi-transparent backdrop
- **No white card container** - elements render directly on background

## Customization

### Word List

You can customize the word list by modifying `src/constants/words.ts`:

```typescript
export const WORD_LIST = [
  'YOUR',
  'CUSTOM',
  'WORDS',
];
```

### Max Lives

Adjust the maximum number of wrong guesses in `src/constants/config.ts`:

```typescript
export const MAX_LIVES = 6; // Change this value
```

### Keyboard Layout

The keyboard uses a flat array with CSS Grid for layout in `src/constants/config.ts`:

```typescript
export const KEYBOARD_LETTERS = [
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I',
  'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R',
  'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
] as const;
```

CSS handles the visual layout:

```css
.keyboard {
  display: grid;
  grid-template-columns: repeat(9, 1fr);
  gap: 8px;
}
```

## Architecture

The game uses a clean, scalable architecture:

- **State Management**: Simple `useState` hooks in `useHangman` custom hook
- **Derived State**: Game status, win/loss conditions computed on render
- **Separation of Concerns**: Physical keyboard input in separate `useKeyboardInput` hook
- **Component Structure**: Modular, focused components with clear responsibilities
- **Type Safety**: Full TypeScript coverage with interfaces
- **CSS Architecture**: Each component has its own CSS file for maintainability
- **CSS Grid**: Flexible, responsive layout without nested arrays
- **Testing**: 24 passing tests with React Testing Library (Testing Trophy approach)

## Why Vite over CRA?

- ⚡ **10-20x faster** dev server start and hot reload
- 📦 **Modern tooling** built for ES modules
- 🎯 **Active maintenance** (CRA is deprecated)
- ✅ **React 19 ready** out of the box
- 🔧 **Cleaner config** - no ejecting needed

## Testing

Focused test coverage with Testing Trophy approach:
- **24 tests passing**
- **3 test files** (integration, hooks, utilities)
- **React Testing Library** for component testing
- **Vitest** for fast unit tests
- **Coverage**: User flows, game logic, and utility functions

Run tests:
```bash
npm test              # Run once
npm test -- --watch   # Watch mode
npm test -- --coverage # With coverage report
```

## Physical Keyboard Support

Press any letter key (A-Z) on your keyboard to play:
- ✅ Works alongside virtual keyboard
- ✅ Auto-disabled when game ends
- ✅ Prevents duplicate guesses
- ✅ Case-insensitive (A or a both work)

Implementation: Clean separation using `useKeyboardInput` custom hook.

## Future Enhancements

The architecture supports easy addition of:
- Difficulty levels (word length categories)
- Hint system (reveal one letter)
- Score tracking (wins/losses, streaks)
- Timer (time-limited mode)
- Sound effects (correct/wrong/win/loss)
- Enhanced animations (letter reveals, confetti)
- Multiplayer mode (two-player turns)
- Word categories (animals, countries, etc.)
- Leaderboard (localStorage persistence)
- Dark mode toggle

## Reference

UI design based on: https://hangman-with-react-ts.vercel.app/

## License

MIT
