import React, { useEffect, useState } from "react";
import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import bg from '../../assets/chessbgimg.jpg';

const Otb = () => {
  const navigate = useNavigate();
  const [game, setGame] = useState(new Chess());
  const [whiteTime, setWhiteTime] = useState(300);
  const [blackTime, setBlackTime] = useState(300);
  const [highlightSquares, setHighlightSquares] = useState({});
  const [currentTurn, setCurrentTurn] = useState("w");
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [result, setResult] = useState("");
  const [moveHistory, setMoveHistory] = useState([]);
  const [selectedSquare, setSelectedSquare] = useState(null);
  const [highlightedSquares, setHighlightedSquares] = useState({});

  // Timer effect
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

  const safeGameMutate = (modify) => {
    setGame((prevGame) => {
      const updated = new Chess(prevGame.fen());
      modify(updated);
      return updated;
    });
  };

  const handleMove = (sourceSquare, targetSquare) => {
    safeGameMutate((newGame) => {
      const move = newGame.move({ from: sourceSquare, to: targetSquare, promotion: "q" });
      if (move) {
        setMoveHistory((prev) => [...prev, move.san]);
        setHighlightedSquares({});
        setSelectedSquare(null);

        if (newGame.isGameOver()) {
          const winner = currentTurn === "w" ? "White" : "Black";
          toast.success(`${winner} wins!`);
          setResult(`${winner} wins!`);
          setIsTimerRunning(false);
        }
      }
    });
  };

  const handleSquareClick = (square) => {
    const moves = game.moves({ square, verbose: true });
    if (moves.length === 0) return;

    const highlights = {};
    moves.forEach((m) => {
      highlights[m.to] = {
        background: "radial-gradient(circle, #fffc9e 40%, transparent 50%)",
        borderRadius: "50%",
      };
    });

    setHighlightedSquares(highlights);
    setSelectedSquare(square);
  };

  const onMouseOverSquare = (square) => {
    const moves = game.moves({ square, verbose: true });
    if (moves.length === 0) return;

    const highlights = {};
    moves.forEach((m) => {
      highlights[m.to] = {
        background:
          game.get(m.to) && game.get(m.to).color !== game.get(square)?.color
            ? "radial-gradient(circle, red 36%, transparent 40%)"
            : "radial-gradient(circle, #00FF00 36%, transparent 40%)",
        borderRadius: "50%",
      };
    });

    setHighlightSquares(highlights);
  };
  const onMouseOutSquare = () => {
  setHighlightSquares({});
};


  const startGame = () => {
    setIsGameStarted(true);
    setIsTimerRunning(true);
    setCurrentTurn("w");
    toast.success("Game Started!");
  };

  const restartGame = () => {
    setGame(new Chess());
    setWhiteTime(300);
    setBlackTime(300);
    setCurrentTurn("w");
    setIsTimerRunning(false);
    setIsGameStarted(false);
    setResult("");
    setHighlightedSquares({});
    setSelectedSquare(null);
    setMoveHistory([]);
  };

  const showInstructions = () => {
    Swal.fire({
      icon: 'info',
      title: '🎯 Instructions',
      html: `
        <ul style="text-align: left; font-size: 16px;">
          <li>Click <strong>Start Game</strong> to begin the match and activate both clocks.</li>
          <li>Each player must manually press their clock after completing a move.</li>
          <li>When a player's timer reaches 0, they lose the game.</li>
          <li>Click a piece to preview its moves before dragging.</li>
          <li>Use the <strong>Restart</strong> button to reset everything.</li>
        </ul>
      `,
      confirmButtonText: 'Got it!',
      customClass: {
        popup: 'rounded-lg shadow-lg',
      },
    });
  };

  return (
  <div
    className="p-5 bg-blue-100 min-h-screen"
    style={{
      background: `url(${bg}) no-repeat center center`,
      backgroundSize: 'cover',
    }}
  >
    <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
      <button className="bg-black text-white px-4 py-2 rounded" onClick={() => navigate("/tournament")}>
        ← Back
      </button>

      <h1 className="text-xl font-semibold text-white bg-black/20 px-2 py-0 rounded ml-[200px]">
        Over The Board (OTB)
      </h1>

      <div className="text-lg font-semibold text-center text-green-800">{result}</div>

      <button
        className="bg-black text-white px-2 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        onClick={startGame}
        disabled={isGameStarted}
      >
      <button className="rounded" onClick={showInstructions} title="Instructions">
        ℹ️
      </button> Start Game
      </button>
      
    </div>

    <div className="flex flex-col lg:flex-row gap-8 bg-black/50 backdrop-blur px-4 py-4 rounded">
      <div className="flex flex-col items-center flex-1">
        <div className="mb-4">
          <Chessboard
            position={game.fen()}
            onPieceDrop={handleMove}
            onSquareClick={handleSquareClick}
            onMouseOverSquare={onMouseOverSquare}
            onMouseOutSquare={onMouseOutSquare}
            boardWidth={500}
            customSquareStyles={{ ...highlightedSquares, ...highlightSquares }}
            animationDuration={200}
          />
        </div>
        <button
          className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-red-700"
          onClick={restartGame}
        >
          🔁 Restart
        </button>
      </div>

      <div className="w-full lg:w-[330px] flex flex-col gap-4">
        <button
          className={`p-4 rounded font-semibold ${
            currentTurn === "w"
              ? "bg-[#DCA06D] text-black"
              : "bg-[#FCEFCB] text-black "
          }`}
          onClick={() => isGameStarted && !game.isGameOver() && setCurrentTurn("b")}
        >
          <h4 className="text-lg font-bold">White</h4>
          <div>{Math.floor(whiteTime / 60)}:{String(whiteTime % 60).padStart(2, "0")}</div>
        </button>

        <button
          className={`p-4 rounded font-semibold ${
            currentTurn === "b"
              ? "bg-[#DCA06D] text-black"
              : "bg-[#FCEFCB] text-black "
          }`}
          onClick={() => isGameStarted && !game.isGameOver() && setCurrentTurn("w")}
        >
          <h4 className="text-lg font-bold">Black</h4>
          <div>{Math.floor(blackTime / 60)}:{String(blackTime % 60).padStart(2, "0")}</div>
        </button>
      </div>

      <div className="bg-white/10 p-4 rounded shadow w-full max-w-md overflow-x-auto">
        <h3 className="font-semibold mb-4 text-white">📜 Move List</h3>
        <table className="table-auto w-full text-left border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-2 py-1">No</th>
              <th className="border px-2 py-1">White</th>
              <th className="border px-2 py-1">Black</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: Math.ceil(moveHistory.length / 2) }).map((_, idx) => (
              <tr key={idx}>
                <td className="border px-2 py-1 text-white">{idx + 1}</td>
                <td className="border px-2 py-1 text-white">{moveHistory[idx * 2] || ""}</td>
                <td className="border px-2 py-1 text-white">{moveHistory[idx * 2 + 1] || ""}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

};

export default Otb;
