import React, { useState, useEffect, useRef } from "react";
import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";
import { toast } from "sonner";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import bg from '../assets/chessbgimg.jpg';

function MultiplayerGame() {
  const location = useLocation();
  const navigate = useNavigate();
  const { socket, roomId, timer } = location.state || {};

  const [game, setGame] = useState(new Chess());
  const [highlightSquares, setHighlightSquares] = useState({});
  const [whiteTime, setWhiteTime] = useState(timer);
  const [blackTime, setBlackTime] = useState(timer);
  const [currentTurn, setCurrentTurn] = useState("w");
  const [result, setResult] = useState(null);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [chat, setChat] = useState("");
  const [chatLog, setChatLog] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [playerSide, setPlayerSide] = useState(null);
  const timerRef = useRef();

  // Set dark mode from localStorage
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
      updateGame(game);
      setCurrentTurn(game.turn());
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
          if (t <= 1) {
            socket.emit("timeout", { roomId, loser: "w" });
            return 0;
          }
          return t - 1;
        });
      } else {
        setBlackTime((t) => {
          if (t <= 1) {
            socket.emit("timeout", { roomId, loser: "b" });
            return 0;
          }
          return t - 1;
        });
      }
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [currentTurn, isGameStarted, result]);

  const updateGame = (updatedGame) => {
    setGame(Object.assign(Object.create(Object.getPrototypeOf(updatedGame)), updatedGame));
  };

  const onDrop = (source, target) => {
    if (!isGameStarted || result || game.turn() !== playerSide) return false;
    const move = game.move({ from: source, to: target, promotion: "q" });
    if (!move) return false;

    updateGame(game);
    setCurrentTurn(game.turn());
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
    <div className="p-5 min-h-screen" style={{ background: `url(${bg})`, backgroundSize: "cover" }}>
      <div className="d-flex justify-content-between mb-3">
        <button className="btn btn-dark" onClick={() => navigate("/tournament")}>← Back</button>
        {!isGameStarted && (
          <button className="btn btn-light" onClick={showInstructions}>ℹ️</button>
        )}
      </div>

      <div className="start-game-wrapper">
        <div className="d-flex flex-wrap justify-content-center gap-4">
          <div>
            <Chessboard
              position={game.fen()}
              onPieceDrop={onDrop}
              onMouseOverSquare={onMouseOverSquare}
              onMouseOutSquare={() => setHighlightSquares({})}
              customSquareStyles={highlightSquares}
              boardWidth={500}
            />
            <h5 className="text-center mt-2">
              You are: {playerSide === "w" ? "White" : "Black"}
            </h5>
          </div>

          <div style={{ minWidth: "280px" }}>
            <div className="bg-dark text-white p-2 mb-2 rounded">
              <div>White: {Math.floor(whiteTime / 60)}:{String(whiteTime % 60).padStart(2, "0")}</div>
              <div>Black: {Math.floor(blackTime / 60)}:{String(blackTime % 60).padStart(2, "0")}</div>
            </div>

            <div className="border p-2 rounded" style={{ height: "150px", overflowY: "scroll" }}>
              {chatLog.length === 0 ? "No messages yet." : chatLog.map((m, i) => <div key={i}>{m}</div>)}
            </div>

            <input
              type="text"
              className="form-control mt-2"
              value={chat}
              onChange={(e) => setChat(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendChat()}
              disabled={!isGameStarted}
            />
            <button className="btn btn-primary w-100 mt-2" onClick={handleSendChat} disabled={!chat.trim()}>Send</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MultiplayerGame;
