import { useTicTacToe} from "./useTicTacToe.js";
import { calculateWinner } from "./utils.js";

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
    const {
        history,
        currentMove,
        xIsNext,
        currentSquares,
        isAscending,
        setIsAscending,
        isVsComputer,
        setIsVsComputer,
        handlePlay,
        jumpTo,
        handleReset
    } = useTicTacToe();

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
                <button onClick={() => setIsVsComputer(!isVsComputer)}>
                    {isVsComputer ? "Playing vs computer" : "Playing vs Human"}
                </button>
                <button onClick={() => setIsAscending((!isAscending))}>
                    Sort {isAscending ? 'Descending' : 'Ascending'}
                </button>
                <ol>{sortedMoves}</ol>
            </div>
        </div>
    );
}
