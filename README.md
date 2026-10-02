# React Tic-Tac-Toe 🎮

A fully functional Tic-Tac-Toe game built with React and Vite. This project was built to master React fundamentals, including state management, custom hooks, and side effects.

## ✨ Features
- **Classic Gameplay:** Play against a friend locally.
- **Time Travel:** Jump back to any previous move in the game history.
- **Computer AI:** Play against a simple random-move computer opponent.
- **Move History:** Detailed move log showing the exact row and column of every play.
- **Winning Highlight:** Visually highlights the three squares that secured the victory.
- **Persistence:** Automatically saves your game state to Local Storage so you can refresh the page without losing progress.
- **Sorting:** Toggle the move history between ascending and descending order.

## 🛠️ Tech Stack
- **React** (State, Effects, Custom Hooks)
- **Vite** (Build tool)
- **CSS** (Grid & Flexbox)
- **Local Storage** (Browser API)

## 🚀 How to Run
1. Clone the repository
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`

## 🧠 What I Learned
- Separating UI components from logic using **Custom Hooks** (`useTicTacToe.js`).
- Managing complex state arrays (History) and time-traveling through them.
- Using `useEffect` to sync state with Local Storage and trigger a computer opponent.
- Avoiding the "stale closure" trap using `useCallback`.
- Extracting pure helper functions into a `utils.js` file.