import React, { useState, useEffect } from "react";
import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";
import { toast } from "sonner";
import { useLocation, useNavigate } from "react-router-dom";
import "./StartGame.css";
import Swal from 'sweetalert2';
import bg from '../../assets/chessbgimg.jpg';

function BulletGame() {
  const location = useLocation();
  const navigate = useNavigate();
  const timer = location.state?.timer || 60;

  const [game, setGame] = useState(new Chess());
  const [history, setHistory] = useState([]);
  const [highlightSquares, setHighlightSquares] = useState({});
  const [whiteTime, setWhiteTime] = useState(timer);
  const [blackTime, setBlackTime] = useState(timer);
  const [currentTurn, setCurrentTurn] = useState("w");
  const [result, setResult] = useState(null);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [chat, setChat] = useState("");
  const [chatLog, setChatLog] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [playerSide, setPlayerSide] = useState("w");
  const [gameMode, setGameMode] = useState("ai");

  useEffect(() => {
    const storedMode = localStorage.getItem("isDarkMode");
    if (storedMode) setIsDarkMode(storedMode === "true");
  }, []);

  useEffect(() => {
    localStorage.setItem("isDarkMode", isDarkMode);
  }, [isDarkMode]);

  useEffect(() => {
    if (!isGameStarted || game.isGameOver() || result) return;
    const interval = setInterval(() => {
      if (currentTurn === "w") {
        setWhiteTime((time) => {
          if (time <= 1) {
            toast.success("⏱️ Time's up! Black wins!");
            setResult("⏱️ Time's up! Black wins!");
            return 0;
          }
          return time - 1;
        });
      } else {
        setBlackTime((time) => {
          if (time <= 1) {
            toast.success("⏱️ Time's up! White wins!");
            setResult("⏱️ Time's up! White wins!");
            return 0;
          }
          return time - 1;
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [currentTurn, game, result, isGameStarted]);

  const makeAIMove = () => {
    if (gameMode !== "ai") return;
    const possibleMoves = game.moves();
    if (game.isGameOver() || possibleMoves.length === 0) return;

    const randomIndex = Math.floor(Math.random() * possibleMoves.length);
    game.move(possibleMoves[randomIndex]);
    updateGame(game);
    setCurrentTurn(game.turn());
  };

  const updateGame = (gameInstance) => {
    setGame(Object.assign(Object.create(Object.getPrototypeOf(gameInstance)), gameInstance));
    setHistory(gameInstance.history());

    if (gameInstance.isCheckmate()) {
      toast.success(`Checkmate! ${currentTurn === "w" ? "White" : "Black"} wins!`);
      setResult(`Checkmate! ${currentTurn === "w" ? "White" : "Black"} wins!`);
    } else if (gameInstance.isStalemate()) {
      toast.success("Stalemate! It's a draw.");
      setResult("Stalemate! It's a draw.");
    } else if (gameInstance.isDraw()) {
      toast.success("Draw! No legal moves.");
      setResult("Draw! No legal moves.");
    }
  };

  const onDrop = (source, target) => {
    if (!isGameStarted || game.isGameOver() || result || whiteTime === 0 || blackTime === 0)
      return false;

    const piece = game.get(source);
    if (!piece) return false;
    if (gameMode === "ai" && (piece.color !== playerSide || currentTurn !== playerSide))
      return false;

    const move = game.move({ from: source, to: target, promotion: "q" });
    if (!move) return false;

    updateGame(game);
    setHighlightSquares({});
    setCurrentTurn(game.turn());

    if (gameMode === "ai") {
      setTimeout(() => {
        if (game.turn() !== playerSide && !game.isGameOver()) {
          makeAIMove();
        }
      }, 500);
    }

    return true;
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

  const resetGame = () => {
    const newGame = new Chess();
    setGame(newGame);
    setHistory([]);
    setWhiteTime(timer);
    setBlackTime(timer);
    setCurrentTurn("w");
    setHighlightSquares({});
    setResult(null);
    setIsGameStarted(false);
    toast.success("Game Restarted!");
  };

  const startGame = () => {
    setIsGameStarted(true);
    toast.success("Game Started!");
    if (gameMode === "ai" && playerSide === "b") {
      setTimeout(() => {
        makeAIMove();
      }, 500);
    }
  };

  const handleSendChat = () => {
    if (chat.trim()) {
      setChatLog((prev) => [...prev, chat]);
      setChat("");
    }
  };

  const showInstructions = () => {
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
      <div className="d-flex justify-content-between align-items-center mb-3">
        <button className="btn btn-dark" onClick={() => navigate("/tournament")}>
          ← Back
        </button>
        {!isGameStarted && (
          <div className="d-flex align-items-center gap-2">
            <button className="btn btn-success" onClick={startGame}>
              Start Game
            </button>
            <button className="btn btn-light" onClick={showInstructions} title="Instructions">
              ℹ️
            </button>
          </div>
        )}
      </div>

      <p className="absolute text-shadow-lg top-12 shadow-lg h3 right-120 z-20 text-black px-4 py-2 rounded flex items-center gap-2">Bullet Game</p>

      <div className={`start-game-wrapper ${isDarkMode ? "dark-mode" : ""}`}>
        <div
          style={{
            fontFamily: "sans-serif",
            padding: 20,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "1400px",
              border: "1px solid #ddd",
              borderRadius: "12px",
              boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
              padding: "20px",
              color: isDarkMode ? "white" : "black",
            }}
          >
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: "100px",
                flexDirection: "row-reverse",
              }}
            >
              {/* Chessboard on Right */}
              <div style={{ flex: "none", textAlign: "right" }}>
                <Chessboard
                  position={game.fen()}
                  onPieceDrop={onDrop}
                  onMouseOverSquare={onMouseOverSquare}
                  onMouseOutSquare={() => setHighlightSquares({})}
                  customSquareStyles={highlightSquares}
                  boardWidth={500}
                  customBoardStyle={{
                    borderRadius: "4px",
                    boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
                  }}
                  customDarkSquareStyle={{ backgroundColor: "#b58863" }}
                  customLightSquareStyle={{ backgroundColor: "#f0d9b5" }}
                  arePiecesDraggable={isGameStarted && !game.isGameOver() && !result}
                />
                <button onClick={resetGame} className="btn btn-dark mt-3" style={{ width: "100%" }}>
                  Restart Game
                </button>
                {isGameStarted && gameMode === "ai" && (
                  <h5 className="text-white fw-bold mt-2">
                    You are playing as: {playerSide === "w" ? "White" : "Black"}
                  </h5>
                )}
              </div>

              {/* Left Side: Timers + Moves + Chat */}
              <div style={{ flex: "0.6", minWidth: "200px" }}>
                <h4 className="text-center text-white">Timer</h4>
                <div className="d-flex justify-content-between mb-4 gap-2">
                  <div className="bg-dark text-center p-2 rounded flex-fill">
                    <h4 className="text-white">White</h4>
                    <div className="text-white">
                      {Math.floor(whiteTime / 60)}:{String(whiteTime % 60).padStart(2, "0")}
                    </div>
                  </div>
                  <div className="bg-dark text-center p-2 rounded flex-fill">
                    <h4 className="text-white">Black</h4>
                    <div className="text-white">
                      {Math.floor(blackTime / 60)}:{String(blackTime % 60).padStart(2, "0")}
                    </div>
                  </div>
                </div>

                <h4 className="text-center text-white">Moves</h4>
                <div style={{ maxHeight: "200px", overflowY: "auto", marginBottom: "1rem" }}>
                  <table className="table table-bordered text-center table-striped mb-0">
                    <thead className="table-dark">
                      <tr>
                        <th>#</th>
                        <th>White</th>
                        <th>Black</th>
                      </tr>
                    </thead>
                    <tbody>
                      {history.length === 0 ? (
                        <tr>
                          <td colSpan="3">No moves yet</td>
                        </tr>
                      ) : (
                        Array.from({ length: Math.ceil(history.length / 2) }, (_, i) => (
                          <tr key={i}>
                            <td>{i + 1}</td>
                            <td>{history[2 * i] || ""}</td>
                            <td>{history[2 * i + 1] || ""}</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>

                <h5 className="text-center text-white">Chat</h5>
                <div
                  style={{
                    height: "150px",
                    overflowY: "scroll",
                    border: "1px solid #ccc",
                    borderRadius: "8px",
                    padding: "10px",
                    backgroundColor: isDarkMode ? "#222" : "#f9f9f9",
                    color: isDarkMode ? "white" : "black",
                  }}
                >
                  {chatLog.length === 0 && <div>No messages yet.</div>}
                  {chatLog.map((msg, i) => (
                    <div key={i} style={{ marginBottom: "5px" }}>{msg}</div>
                  ))}
                </div>

                <input
                  type="text"
                  value={chat}
                  onChange={(e) => setChat(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSendChat()}
                  placeholder="Type your message"
                  className="form-control mt-2"
                  disabled={!isGameStarted}
                />
                <button
                  onClick={handleSendChat}
                  disabled={!chat.trim() || !isGameStarted}
                  className="btn btn-primary mt-2 w-100"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BulletGame;
