import React, { useState, useEffect } from "react";
import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";
import { toast } from "sonner";
import { useLocation, useNavigate } from "react-router-dom"; // <-- Added useNavigate
import "./StartGame.css";

function StartGame() {
  const location = useLocation();
  const navigate = useNavigate(); // <-- Initialize navigate
  const timer = location.state?.timer || 600;

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
    setGame(new Chess(gameInstance.fen()));
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
    if (
      !isGameStarted ||
      game.isGameOver() ||
      result ||
      whiteTime === 0 ||
      blackTime === 0
    )
      return false;

    const piece = game.get(source);
    if (!piece) return false;

    if (gameMode === "ai" && piece.color !== playerSide) return false;
    if (gameMode === "ai" && currentTurn !== playerSide) return false;

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

  return (
    <div className={`bg-indigo-100 start-game-wrapper ${isDarkMode ? "dark-mode" : ""}`}>
      <div style={{ fontFamily: "sans-serif", padding: 20, display: "flex", justifyContent: "center" }}>
        <div style={{
          width: "100%", maxWidth: "1400px", background: isDarkMode ? "#1e1e1e" : "linear-gradient(135deg, #f5f7fa, #c3cfe2)",
          border: "1px solid #ddd", borderRadius: "12px", boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
          padding: "20px", color: isDarkMode ? "white" : "black"
        }}>

          {/* Navigation */}
          <div style={{ display: "flex", justifyContent: "space-evenly", marginBottom: 20, flexWrap: "wrap", gap: "10px" }}>
            {["Play", "Puzzles", "Lessons", "Analysis", "Dark Mode"].map((btn) => (
              <button
                key={btn}
                className="btn btn-outline-dark"
                onClick={
                  btn === "Play"
                    ? startGame
                    : btn === "Dark Mode"
                    ? () => setIsDarkMode((prev) => !prev)
                    : () => {
                        const routeMap = {
                          Puzzles: "/puzzles",
                          Lessons: "/lesson",
                          Analysis: "/analyse",
                        };
                        const route = routeMap[btn];
                        if (route) navigate(route);
                      }
                }
                disabled={btn === "Play" && isGameStarted}
              >
                {btn}
              </button>
            ))}
          </div>

          {/* Main Layout */}
          <div style={{ display: "flex", justifyContent: "center", gap: "20px", flexWrap: "wrap" }}>
            {/* Left Column: Move History + Game Mode */}
            <div style={{ flex: "0.5", minWidth: "180px", textAlign: "center" }}>
              <h4>Moves</h4>
              <div style={{
                height: "200px", overflowY: "scroll", border: "1px solid gray", borderRadius: "8px",
                padding: "10px", marginBottom: "15px"
              }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead><tr><th>#</th><th>White</th><th>Black</th></tr></thead>
                  <tbody>
                    {history.reduce((rows, move, i) => {
                      if (i % 2 === 0) rows.push([Math.floor(i / 2) + 1, move, null]);
                      else rows[rows.length - 1][2] = move;
                      return rows;
                    }, []).map(([n, w, b]) => (
                      <tr key={n}><td><strong>{n}.</strong></td><td>{w}</td><td>{b || ""}</td></tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {!isGameStarted && (
                <>
                  <div className="mb-2">
                    <label><strong>Select Game Mode:</strong></label>
                    <select className="form-select"
                      value={gameMode}
                      onChange={(e) => setGameMode(e.target.value)}>
                      <option value="ai">Play with AI</option>
                      <option value="twoPlayer">Two Player</option>
                    </select>
                  </div>

                  {gameMode === "ai" && (
                    <div className="mb-2">
                      <label><strong>Select Side:</strong></label>
                      <select className="form-select"
                        value={playerSide}
                        onChange={(e) => setPlayerSide(e.target.value)}>
                        <option value="w">White (You play first)</option>
                        <option value="b">Black (AI plays first)</option>
                      </select>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Chessboard */}
            <div style={{ flex: "none", textAlign: "center" }}>
              <Chessboard
                position={game.fen()}
                onPieceDrop={onDrop}
                onMouseOverSquare={onMouseOverSquare}
                onMouseOutSquare={() => setHighlightSquares({})}
                customSquareStyles={highlightSquares}
                boardWidth={600}
                customBoardStyle={{
                  borderRadius: "4px",
                  boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
                }}
                customDarkSquareStyle={{
                  backgroundColor: isDarkMode ? "#444" : "grey",
                }}
                arePiecesDraggable={isGameStarted && !game.isGameOver() && !result}
              />
              {isGameStarted && gameMode === "ai" && (
                <h5 style={{ marginTop: "10px" }}>
                  You are playing as: {playerSide === "w" ? "White" : "Black"}
                </h5>
              )}
            </div>

            {/* Right Panel: Timers, Result, Chat */}
            <div style={{ flex: "1", minWidth: "250px", padding: "10px", textAlign: "center" }}>
              <div className="player-box">
                <h4>White</h4>
                <div style={{ fontSize: "28px" }}>
                  {Math.floor(whiteTime / 60)}:{String(whiteTime % 60).padStart(2, "0")}
                </div>
              </div>
              <div className="player-box">
                <h4>Black</h4>
                <div style={{ fontSize: "28px", marginBottom: "20px" }}>
                  {Math.floor(blackTime / 60)}:{String(blackTime % 60).padStart(2, "0")}
                </div>
              </div>

              {result && (
                <div style={{
                  backgroundColor: "red", color: "white", padding: "10px",
                  borderRadius: "8px", marginBottom: "20px"
                }}>
                  <strong>{result}</strong>
                </div>
              )}

              <button onClick={resetGame} className="btn btn-outline-dark" style={{ marginBottom: "10px" }}>
                Restart Game
              </button>

              <div style={{ marginTop: "20px", textAlign: "left" }}>
                <h5>Chat</h5>
                <div style={{
                  height: "150px", overflowY: "scroll", border: "1px solid #ccc",
                  borderRadius: "8px", padding: "10px",
                  backgroundColor: isDarkMode ? "#222" : "#f9f9f9",
                  color: isDarkMode ? "white" : "black",
                  marginBottom: "10px"
                }}>
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
                  style={{ width: "100%", padding: "8px", borderRadius: "8px", border: "1px solid #ccc" }}
                  disabled={!isGameStarted}
                />
                <button
                  onClick={handleSendChat}
                  disabled={!chat.trim() || !isGameStarted}
                  className="btn btn-primary"
                  style={{ marginTop: "5px", width: "100%" }}
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

export default StartGame;
