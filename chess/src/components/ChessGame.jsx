import React, { useState, useEffect, useRef } from "react";
import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";
import { toast } from "sonner";
import { useLocation, useNavigate ,Link} from "react-router-dom";
import Swal from "sweetalert2";
import bg from "../assets/chessbgimg.jpg";
import logo from '../assets/logo.jpg'

function MultiplayerGame() {
  const location = useLocation();
  const navigate = useNavigate();
  const { socket, roomId, timer: initialTimer } = location.state || {};

  const [game, setGame] = useState(new Chess());
  const [highlightSquares, setHighlightSquares] = useState({});
  const [whiteTime, setWhiteTime] = useState(Number(initialTimer) || 600);
  const [blackTime, setBlackTime] = useState(Number(initialTimer) || 600);
  const [currentTurn, setCurrentTurn] = useState("w");
  const [result, setResult] = useState(null);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [chat, setChat] = useState("");
  const [chatLog, setChatLog] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [playerSide, setPlayerSide] = useState(null);
  const [moveHistory, setMoveHistory] = useState([]);
  const timerRef = useRef();
  const [showPopup, setShowPopup] = useState(true);
  
    const closePopup = () => setShowPopup(false);

  const formatTime = (seconds) => {
    if (isNaN(seconds)) return "0:00";
    const mins = Math.floor(Math.abs(seconds) / 60);
    const secs = Math.floor(Math.abs(seconds) % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    const storedMode = localStorage.getItem("isDarkMode");
    if (storedMode) setIsDarkMode(storedMode === "true");
  }, []);

  useEffect(() => {
    localStorage.setItem("isDarkMode", isDarkMode);
  }, [isDarkMode]);

  useEffect(() => {
    if (!socket || !roomId) return;

    socket.emit("join-game", roomId);

    socket.on("start-game", ({ color }) => {
      setPlayerSide(color);
      setIsGameStarted(true);
      toast.success(`You are playing as ${color === "w" ? "White" : "Black"}`);
    });

    socket.on("opponent-move", ({ from, to, promotion }) => {
      const move = game.move({ from, to, promotion });
      if (move) {
        updateGame(game);
        setCurrentTurn(game.turn());
        setMoveHistory((prev) => [
          ...prev,
          { player: move.color === "w" ? "White" : "Black", move: move.san },
        ]);
      }
    });

    socket.on("chat", (msg) => {
      setChatLog((prev) => [...prev, msg]);
    });

    socket.on("result", (msg) => {
      setResult(msg);
      toast(msg);
    });

    return () => {
      socket.off("start-game");
      socket.off("opponent-move");
      socket.off("chat");
      socket.off("result");
    };
  }, [socket, roomId, game]);

  useEffect(() => {
    if (!isGameStarted || result) return;

    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      if (currentTurn === "w") {
        setWhiteTime((t) => {
          const newTime = Number(t) - 1;
          if (newTime <= 0) {
            socket.emit("timeout", { roomId, loser: "w" });
            return 0;
          }
          return newTime;
        });
      } else {
        setBlackTime((t) => {
          const newTime = Number(t) - 1;
          if (newTime <= 0) {
            socket.emit("timeout", { roomId, loser: "b" });
            return 0;
          }
          return newTime;
        });
      }
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [currentTurn, isGameStarted, result]);

  const updateGame = (updatedGame) => {
    setGame(
      Object.assign(Object.create(Object.getPrototypeOf(updatedGame)), updatedGame)
    );
  };

  const onDrop = (source, target) => {
    if (!isGameStarted || result || game.turn() !== playerSide) return false;
    const move = game.move({ from: source, to: target, promotion: "q" });
    if (!move) return false;

    updateGame(game);
    setCurrentTurn(game.turn());
    setMoveHistory((prev) => [
      ...prev,
      { player: move.color === "w" ? "White" : "Black", move: move.san },
    ]);
    socket.emit("move", { roomId, ...move });

    if (game.isCheckmate()) {
      socket.emit("game-over", { roomId, winner: playerSide });
    }
    return true;
  };

  const onMouseOverSquare = (square) => {
    const moves = game.moves({ square, verbose: true });
    const highlights = {};
    moves.forEach((m) => {
      highlights[m.to] = {
        background: game.get(m.to)
          ? "radial-gradient(circle, red 36%, transparent 40%)"
          : "radial-gradient(circle, #00FF00 36%, transparent 40%)",
        borderRadius: "50%",
      };
    });
    setHighlightSquares(highlights);
  };

  const handleSendChat = () => {
    if (chat.trim()) {
      socket.emit("chat", { roomId, msg: chat });
      setChat("");
    }
  };

  const showInstructions = () => {
    Swal.fire({
      icon: "info",
      title: "🎯 Instructions",
      html: `
        <ul style="text-align: left;">
          <li>Wait for opponent to join and click Start Game.</li>
          <li>Each player is assigned White or Black.</li>
          <li>Timer runs for each turn. If it hits 0, you lose.</li>
          <li>Drag and drop pieces to move. Game ends on checkmate, draw, or timeout.</li>
          <li>Use chat to message your opponent.</li>
        </ul>
      `,
      confirmButtonText: "Got it!",
    });
  };

  return (
  <div
    className="p-5 min-h-screen"
    style={{ background: `url(${bg})`, backgroundSize: "cover" }}
  >
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
              className=" text-shadow-lg rounded-[10px] shadow-lg p-2 w-[200px] font-semibold flex justify-center"
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
            <ul
              className="text-justify text-[15px] text-[#596E79] font-[600] ml-3 list-disc"
              style={{ width: "368px" }}
            >
              <li>
                You’ll play multiple games against the same opponent,
                alternating between white and black pieces.
              </li>
              <li>
                For every win, you’ll earn 1 point. No points are awarded
                for losses
              </li>
              <li>
                The player with the most wins at the end of all rounds is
                declared the Match Winner.
              </li>
              <li>
                Play smart, plan your moves carefully, and use your time
                wisely.
              </li>
              <li>A timer will keep the game fair and fast-paced.</li>
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

    {/* Top navigation bar with centered player info */}
    <div className="flex items-center justify-between mb-4">
      {/* Back Button */}
      <button className="btn btn-dark" onClick={() => navigate("/tournament")}>
        ← Back
      </button>

      {/* Centered "You are" Text */}
      

      {/* Info Button */}
      <button className="btn btn-light" onClick={showInstructions}>
        ℹ️
      </button>
    </div>

    {/* Main game container */}
    <div className="bg-white/20 p-4 rounded-lg">
    <h3
        className="text-white text-lg font-bold text-center mb-4"
        style={{ flexGrow: 1 }}
      >
        You are: {playerSide === "w" ? "White" : "Black"}
      </h3>
      <div className="d-flex flex-wrap justify-content-center gap-[10%]">
        {/* Chessboard section */}
        <div>
          <Chessboard
            position={game.fen()}
            onPieceDrop={onDrop}
            onMouseOverSquare={onMouseOverSquare}
            onMouseOutSquare={() => setHighlightSquares({})}
            customSquareStyles={highlightSquares}
            boardWidth={500}
          />
        </div>

        {/* Game info section */}
        <div style={{ minWidth: "280px" }}>
          {/* Timer section */}
          <div className="d-flex justify-content-between mb-4 gap-2">
            <div className="bg-dark text-center p-2 rounded flex-fill">
              <h4 className="text-white">White</h4>
              <div className="text-white">{formatTime(whiteTime)}</div>
            </div>
            <div className="bg-dark text-center p-2 rounded flex-fill">
              <h4 className="text-white">Black</h4>
              <div className="text-white">{formatTime(blackTime)}</div>
            </div>
          </div>

          {/* Move history table */}
          <div
            className="mb-3 bg-white/30 p-2 rounded"
            style={{ height: "200px", overflowY: "auto" }}
          >
            <h5 className="text-center">Move History</h5>
            <table className="table table-bordered table-sm text-center mb-0">
              <thead>
                <tr>
                  <th>No</th>
                  <th>White</th>
                  <th>Black</th>
                </tr>
              </thead>
              <tbody>
                {Array.from({
                  length: Math.ceil(moveHistory.length / 2),
                }).map((_, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{moveHistory[i * 2]?.move || ""}</td>
                    <td>{moveHistory[i * 2 + 1]?.move || ""}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Chat section */}
          <div className="mb-3">
            <div
              className="border p-2 rounded bg-white"
              style={{ height: "150px", overflowY: "auto" }}
            >
              {chatLog.length === 0 ? (
                <div className="text-center text-muted">No messages yet</div>
              ) : (
                chatLog.map((m, i) => <div key={i}>{m}</div>)
              )}
            </div>
          </div>

          {/* Chat input */}
          <div className="d-flex gap-2">
            <input
              type="text"
              className="form-control"
              value={chat}
              onChange={(e) => setChat(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendChat()}
              disabled={!isGameStarted}
              placeholder="Type your message..."
            />
            <button
              className="btn btn-primary"
              onClick={handleSendChat}
              disabled={!chat.trim()}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

}

export default MultiplayerGame;
