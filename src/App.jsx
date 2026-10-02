import { useState, useEffect } from "react";

function Square({value, onSquareClick, highlight}) {
    return (
        <button
            className={"square " + (highlight ? "highlight" : "")}
            onClick={onSquareClick}
        >
            {value}
        </button>
    );
}

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b]
            && squares[a] === squares[c]) {

            return lines[i];
        }
    }

    return null;
}

function Board({xIsNext, squares, onPlay}) {
    function handleClick(i) {
        if (calculateWinner(squares) || squares[i]) {
            return;
        }

        const nextSquares = squares.slice();
        if (xIsNext) {
            nextSquares[i] = "X";
        } else {
            nextSquares[i] = "O";
        }

        onPlay(nextSquares, i);
    }

    const winningLine = calculateWinner(squares);
    const winner = winningLine ? squares[winningLine[0]] : null;

    let status;
    if (winner) {
        status = "Winner: " + winner;
    } else if (squares.every(square => square !== null))
    {
        status = "Draw";
    } else {
        status = "Next player: " + (xIsNext ? "X" : "O");
    }

    const boardRows = [];
    for (let row = 0; row < 3; row++) {
        const rowSquares = [];
        for (let col = 0; col < 3; col++) {
            const index = row * 3 + col;
            const isWinningSquare = winningLine && winningLine.includes(index);
            rowSquares.push(
                <Square
                    key={index}
                    value={squares[index]}
                    onSquareClick={() => handleClick(index)}
                    highlight={isWinningSquare}
                />
            );
        }

        boardRows.push(
            <div key={row} className="board-row">
                {rowSquares}
            </div>
        );
    }

    return (
        <>
            <div className="status">{status}</div>
            {boardRows}
        </>
    );
}

export default function Game() {
    const [history, setHistory] = useState(() => {
        const savedGame = localStorage.getItem("ticTacToeHistory");
        if (savedGame) {
            return JSON.parse(savedGame);
        }

        return [{ squares: Array(9).fill(null), location: null }];
    });

    const [currentMove, setCurrentMove] = useState(() => {
        const savedMove = localStorage.getItem("ticTacToeMove");
        if (savedMove) {
            return JSON.parse(savedMove);
        }
        return 0;
    });

    useEffect(() => {
        localStorage.setItem("ticTacToeHistory", JSON.stringify(history));
        localStorage.setItem("ticTacToeMove", JSON.stringify(currentMove));
    }, [history, currentMove]);

    const [isAscending, setIsAscending] = useState(true);
    const xIsNext = currentMove % 2 === 0;
    const currentSquares = history[currentMove].squares;

    function handlePlay(nextSquares, index) {
        const row = Math.floor(index / 3) + 1;
        const col = (index % 3) + 1;
        const location = `(${row}, ${col})`;
        const nextHistory = [
            ...history.slice(0, currentMove + 1),
            { squares: nextSquares, location: location }
        ];

        setHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1);
    }

    function jumpTo(nextMove) {
        setCurrentMove(nextMove);
    }

    function handleReset() {
        setHistory([{ squares: Array(9).fill(null), location: null }]);
        setCurrentMove(0);
        localStorage.removeItem("ticTacToeHistory");
        localStorage.removeItem("ticTacToeMove");
    }

    const moves = history.map((step, move) => {
        const location = step.location;
        let description = 'Go to game start';

        if (move > 0) {
            description = `Go to move #${move} ${location}`;
        }

        if (move === currentMove) {
            return (
                <li key={move}>
                    You are at move #{move} {location}
                </li>
            );
        }

        return (
            <li key={move}>
                <button onClick={() => jumpTo(move)}>
                    {description}
                </button>
            </li>
        )
    });

    const sortedMoves = isAscending ? moves : [...moves].reverse();

    return (
        <div className="game">
            <div className="game-board">
                <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
            </div>
            <div className="game-info">
                <button onClick={handleReset}>Reset Game</button>
                <button onClick={() => setIsAscending((!isAscending))}>
                    Sort {isAscending ? 'Descending' : 'Ascending'}
                </button>
                <ol>{sortedMoves}</ol>
            </div>
        </div>
    );
}
