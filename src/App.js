import { useState, useEffect } from "react";

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value && <span className={value.toLowerCase()}>{value}</span>}
    </button>
  );
}

export default function Board() {
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [showCelebration, setShowCelebration] = useState(false);

  const winner = calculateWinner(squares);
  const isBoardFull = squares.every(Boolean);

  useEffect(() => {
    if (winner) {
      setShowCelebration(true);
      const timer = setTimeout(() => setShowCelebration(false), 4000); // hide after 4s
      return () => clearTimeout(timer);
    }
  }, [winner]);

  function handleClick(i) {
    if (squares[i] || winner) return;
    const nextSquares = [...squares];
    nextSquares[i] = xIsNext ? "X" : "O";
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  function resetGame() {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
    setShowCelebration(false);
  }

  const status = winner
    ? `Winner: ${winner}`
    : isBoardFull
    ? "It's a draw!"
    : `Next player: ${xIsNext ? "X" : "O"}`;

  return (
    <>
      <div className="status">{status}</div>

      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>

      <button onClick={resetGame} disabled={!winner && !isBoardFull}>
        {winner || isBoardFull ? "New Game" : "Try Again"}
      </button>

      {showCelebration && (
        <div className="celebration">
          <div className="boom">🎉 Boom! 🎉</div>
          <div className="follow-message">Follow us for more content!</div>
        </div>
      )}
    </>
  );
}
