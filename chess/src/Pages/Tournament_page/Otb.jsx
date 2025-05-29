import React, { useEffect, useState } from "react";
import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";


const ManualClockChess = () => {
  const [game, setGame] = useState(new Chess());
  const [whiteTime, setWhiteTime] = useState(300); // 5 minutes
  const [blackTime, setBlackTime] = useState(300);
  const [currentTurn, setCurrentTurn] = useState("w");
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [result, setResult] = useState("");

  useEffect(() => {
    if (!isGameStarted || game.isGameOver() || result) return;

    const interval = setInterval(() => {
      if (isTimerRunning) {
        if (currentTurn === "w") {
          setWhiteTime((prev) => {
            if (prev <= 1) {
              clearInterval(interval);
              setResult("⏱️ Time's up! Black wins!");
              toast.success("⏱️ Time's up! Black wins!");
              return 0;
            }
            return prev - 1;
          });
        } else {
          setBlackTime((prev) => {
            if (prev <= 1) {
              clearInterval(interval);
              setResult("⏱️ Time's up! White wins!");
              toast.success("⏱️ Time's up! White wins!");
              return 0;
            }
            return prev - 1;
          });
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isTimerRunning, currentTurn, isGameStarted, game, result]);

  const handleMove = (sourceSquare, targetSquare) => {
    const newGame = new Chess(game.fen());
    const move = newGame.move({ from: sourceSquare, to: targetSquare, promotion: "q" });

    if (move) {
      setGame(newGame);
      if (newGame.isGameOver()) {
        const winner = currentTurn === "w" ? "White" : "Black";
        toast.success(`${winner} wins!`);
        setResult(`${winner} wins!`);
        setIsTimerRunning(false);
      }
      setCurrentTurn(currentTurn === "w" ? "b" : "w");
    }
  };

  const startGame = () => {
    setIsGameStarted(true);
    setIsTimerRunning(true);
    setCurrentTurn("w");
    toast.success("Game Started!");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-4">
        <button
  onClick={startGame}
  disabled={isGameStarted}
  className="mb-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400"
>
  Start Game
</button>
        <div className="font-semibold text-lg">{result}</div>
      </div>

      <div className="flex justify-between items-center mb-4 gap-2">
        <button
          className={`flex-1 p-2 rounded text-white ${currentTurn === "w" ? 'bg-green-600' : 'bg-gray-500'}`}
          onClick={() => {
            if (currentTurn === "w" && isGameStarted && !game.isGameOver()) {
              setCurrentTurn("b");
            }
          }}
        >
          <h4>White</h4>
          <div>{Math.floor(whiteTime / 60)}:{String(whiteTime % 60).padStart(2, "0")}</div>
        </button>

        <button
          className={`flex-1 p-2 rounded text-white ${currentTurn === "b" ? 'bg-green-600' : 'bg-gray-500'}`}
          onClick={() => {
            if (currentTurn === "b" && isGameStarted && !game.isGameOver()) {
              setCurrentTurn("w");
            }
          }}
        >
          <h4>Black</h4>
          <div>{Math.floor(blackTime / 60)}:{String(blackTime % 60).padStart(2, "0")}</div>
        </button>
      </div>

      <Chessboard
        position={game.fen()}
        onPieceDrop={handleMove}
        boardWidth={400}
      />
    </div>
  );
};

export default ManualClockChess;
