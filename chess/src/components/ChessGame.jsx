import React, { useState, useEffect, useRef } from "react";
import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";
import { toast } from "sonner";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import bg from "../assets/chessbgimg.jpg";

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
      {/* Top navigation bar */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <button className="btn btn-dark" onClick={() => navigate("/tournament")}>
          ← Back
        </button>
        <h3 className="absolute text-shadow-lg top-12 shadow-lg h3 right-120 z-20 text-white px-4 py-2 rounded flex items-center gap-2">
          You are: {playerSide === "w" ? "White" : "Black"}
        </h3>
        <button className="btn btn-light" onClick={showInstructions}>
          ℹ️
        </button>
      </div>

      {/* Main game container */}
      <div className="bg-white/20 p-4 rounded-lg">
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
            <div className="mb-3 bg-white/30 p-2 rounded" style={{ height: "200px", overflowY: "auto" }}>
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
                  {Array.from({ length: Math.ceil(moveHistory.length / 2) }).map((_, i) => (
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
              <div className="border p-2 rounded bg-white" style={{ height: "150px", overflowY: "auto" }}>
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
