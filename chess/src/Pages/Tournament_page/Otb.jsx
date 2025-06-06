import React, { useEffect, useState } from "react";
import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { useNavigate,Link } from "react-router-dom";
import bg from '../../assets/chessbgimg.jpg';
import logo from '../../assets/logo.jpg'

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

  const [showPopup, setShowPopup] = useState(true);
  
    const closePopup = () => setShowPopup(false);
  

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

  return (
    <div
      className="p-5 bg-blue-100 min-h-screen"
      style={{
        background: `url(${bg}) no-repeat center center`,
        backgroundSize: 'cover',
      }}
    >
        {/* Instruction Popup */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
          <div className="bg-white/90 h-[510px] rounded-[20px] p-2 w-[420px]">
            <div className="flex flex-row justify-end">
              <button
                onClick={closePopup}
                className="px-4 py-2 w-[80px] rounded-4 h-[40px] bg-green-700 text-white hover:bg-green-800 transition"
              >
                Close
              </button>
            </div>
            <div className="flex flex-row justify-center ">
              <h2
                className=" text-shadow-lg  rounded-[10px] shadow-lg p-2 w-[200px] font-semibold flex justify-center"
                style={{
                  color: "#30475E",
                  fontWeight: "700",
                  fontSize: "20px",
                  marginTop: "0px",
                  fontFamily: "Anton sans-serif",
                }}
              >
                Instruction
              </h2>
            </div>
            <div className="mt-[0px]">
              <p className="mb-4 text-[#30475E] text-[16px] font-[600] px-[20px] text-justify flex justify-center mt-5">
                Welcome, players! <br />
                You're about to enter the exciting world of Match Play Chess,
                  where two players face off in multiple rounds to determine the
                  ultimate winner
              </p>
              <ul className="text-justify text-[15px] text-[#596E79] font-[600] ml-3 list-disc" style={{ width: "368px" }}>
                <li>You’ll play multiple games against the same opponent,
                    alternating between white and black pieces.</li>
                <li> For every win, you’ll earn 1 point. No points are awarded
                    for losses</li>
                <li>The player with the most wins at the end of all rounds is
                    declared the Match Winner.</li>
                <li>Play smart, plan your moves carefully, and use your time
                    wisely.</li>
                <li> A timer will keep the game fair and fast-paced.</li>
              </ul>
            </div>
          </div>
        </div>
      )}

       <div className="flex flex-row justify-between mb-2 ">
      <Link
        to="/"
        className="flex items-center space-x-3 text-white font-semibold pb-4"
        style={{ textDecoration: "none" }}
      >
        <img
          src={logo}
          alt="Company Logo"
          className="w-20 h-20 rounded-full object-cover"
        />
        <p
          className="text-[20px] font-bold text-black pt-3 tracking-[1px]"
          style={{ wordSpacing: "-7px", letterSpacing: "0px" }}
        >
          CHESS{" "}
          <span
            className="text-white font-[300] tracking-[-1px] pl-2 text-[20px]"
            style={{ letterSpacing: "-3px" }}
          >
            WORLD
          </span>
        </p>
      </Link>
    </div>

      <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
        <button className="bg-black text-white px-4 py-2 rounded" onClick={() => navigate("/tournament")}>
          ← Back
        </button>

        <h2 className="text-xl font-semibold text-white bg-black/20 px-2 py-1 rounded ml-[200px]">
          Over The Board (OTB)
        </h2>

        <div className="text-lg font-semibold text-center text-green-800">{result}</div>

        <div className="flex items-center gap-3">
          <button
            className="btn btn-success text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
            onClick={startGame}
            disabled={isGameStarted}
          >
            Start Game
          </button>
          <button
            className="btn btn-light"
            onClick={() => {
              // Optional: user can view instructions again on demand
              Swal.fire({
                icon: 'info',
                title: '🎯 Instructions',
                html: `
                  <ul style="text-align: left;">
                    <li>Click <strong>Start Game</strong> to begin.</li>
                    <li>Drag and drop pieces to make moves.</li>
                    <li>You play against an AI that makes random moves.</li>
                    <li>A timer is running—if it hits 0, you lose.</li>
                    <li>Use the <strong>Restart</strong> button to reset the game.</li>
                    <li>Chat with your opponent using the chat box.</li>
                    <li><strong>Enjoy classical chess gameplay!</strong></li>
                  </ul>
                `,
                confirmButtonText: 'Got it!',
              });
            }}
            title="Instructions"
          >
            ℹ️
          </button>
        </div>
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
            className="bg-dark text-white border px-4 py-2 rounded hover:bg-green-700 mt-4"
            onClick={restartGame}
          >
            Restart
          </button>
        </div>

        <div className="w-full lg:w-[330px] flex flex-col gap-4">
          <button
            className={`p-4 w-full rounded font-semibold border-b-4 ${
              currentTurn === "w"
                ? "bg-[#DCA06D] text-black border-yellow-500"
                : "bg-[#FCEFCB] text-black border-transparent"
            }`}
            onClick={() => isGameStarted && !game.isGameOver() && setCurrentTurn("b")}
          >
            <h4 className="text-lg font-bold">White</h4>
            <div>{Math.floor(whiteTime / 60)}:{String(whiteTime % 60).padStart(2, "0")}</div>
          </button>

          <button
            className={`p-4 w-full rounded font-semibold border-b-4 ${
              currentTurn === "b"
                ? "bg-[#DCA06D] text-black border-yellow-500"
                : "bg-[#FCEFCB] text-black border-transparent"
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
