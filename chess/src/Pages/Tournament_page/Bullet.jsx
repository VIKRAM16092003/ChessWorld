import React, { useState, useEffect } from "react";
import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";
import { toast } from "sonner";
import { useLocation, useNavigate,Link } from "react-router-dom";
import Swal from "sweetalert2";
import bg from "../../assets/chessbgimg.jpg";
import "./StartGame.css";
import logo from '../../assets/logo.jpg';

function Bullet() {
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
   const [showPopup, setShowPopup] = useState(true);
  
    const closePopup = () => setShowPopup(false);

  // Load and persist dark mode preference
  useEffect(() => {
    const storedMode = localStorage.getItem("isDarkMode");
    if (storedMode) setIsDarkMode(storedMode === "true");
  }, []);

  useEffect(() => {
    localStorage.setItem("isDarkMode", isDarkMode);
  }, [isDarkMode]);

  // Timer logic
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


  return (
  <div
    className=" bg-blue-100 min-h-screen"
    style={{
      background: `url(${bg}) no-repeat center center`,
      backgroundSize: "cover",
    }}
  >
    {/* Instruction Popup */}
    {showPopup && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
            <div className="bg-white/90 h-[510px] rounded-[20px] p-2 w-[420px]">
              <div className="flex flex-row justify-end">
                <button
                  onClick={closePopup}
                  className="px-4 py-2 w-[80px] rounded-4 h-[40px] bg-green-700 text-white  hover:bg-green-800 transition"
                >
                  Close
                </button>
              </div>

              <div className="flex flex-row justify-center ">
                <h2
                  className=" text-shadow-lg bg-white/10 rounded-[10px] shadow-lg p-2 w-[200px] font-semibold mb-4 flex justify-center"
                  style={{
                    color: "#30475E",
                    fontWeight: "700",
                    fontSize: "20px",
                    marginTop: "20px",

                    fontFamily: "Anton sans-serif",
                  }}
                >
                  INSTRUCTION
                </h2>
              </div>

              <div className="mt-[0px]">
                <p className="mb-4 text-[#30475E] text-[16px] font-[600] px-[20px] text-justify flex justify-center">
                  Welcome, players! <br />
                  
                  You're about to enter the exciting world of Match Play Chess,
                  where two players face off in multiple rounds to determine the
                  ultimate winner.
                </p>

                <ul className="text-justify text-[15px] text-[#596E79] font-[600] ml-3 list-disc "style={{width:"368px"}}>
                  <li className="m-[2px]">
                    {" "}
                    You’ll play multiple games against the same opponent,
                    alternating between white and black pieces.
                  </li>
                  <li className="m-[2px]">
                    {" "}
                    For every win, you’ll earn 1 point. No points are awarded
                    for losses.{" "}
                  </li>
                  <li className="m-[2px]">
                    The player with the most wins at the end of all rounds is
                    declared the Match Winner.
                  </li>
                  <li className="m-[2px]">
                    {" "}
                    Play smart, plan your moves carefully, and use your time
                    wisely.
                  </li>
                  <li className="m-[2px]">
                    A timer will keep the game fair and fast-paced.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

    {/* Header */}
    <div className="flex flex-row justify-between mb-2 ml-[10px]">
      <Link
        to="/"
        className="flex items-center space-x-3 text-white font-semibold p-4"
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

    {/* Controls and Title */}
    <div className="flex items-center justify-between mb-4 ml-3 mr-3">
      {/* Left - Back Button */}
      <button className="btn btn-dark" onClick={() => navigate("/tournament")}>
        ← Back
      </button>

      {/* Center - Title */}
      <div className="flex-grow text-center">
        <center>
        <p className="text-white font-bold text-lg tracking-wider text-shadow-lg bg-white/10 w-[220px] rounded py-2">BULLET GAME</p>
        </center>
      </div>

      {/* Right - Start + Info */}
      {!isGameStarted && (
        <div className="flex items-center gap-2">
          <button className="btn btn-success" onClick={startGame}>
            Start Game
          </button>
          <button
            className="btn btn-light"
            onClick={() => {
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
      )}
    </div>

    {/* Game Board and Sidebar */}
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
              gap: "20px",
            }}
          >
            {/* Chessboard */}
            <div style={{ flex: "none", textAlign: "center" }}>
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
              <button
                onClick={resetGame}
                className="mt-3 bg-dark text-white border font-bold rounded py-2"
                style={{ width: "30%" }}
              >
                Restart Game
              </button>
              {isGameStarted && gameMode === "ai" && (
                <h5 className="text-white fw-bold mt-2">
                  You are playing as: {playerSide === "w" ? "White" : "Black"}
                </h5>
              )}
            </div>

            {/* Timer + Moves + Chat */}
            <div className="bg-white/20 px-4 py-2 rounded" style={{ flex: "0.6", minWidth: "200px", marginLeft: "50px" }}>
              {/* Timer */}
              <h4 className="text-center">Timer</h4>
              <div className="d-flex justify-content-between mb-4 gap-2">
                <div className="bg-dark text-center p-2 rounded flex-fill">
                  <h4 className="text-white">White</h4>
                  <div className="h-[2px] bg-white mx-auto w-3/4 mb-2"></div>
                  <div className="text-white">
                    {Math.floor(whiteTime / 60)}:{String(whiteTime % 60).padStart(2, "0")}
                  </div>
                </div>
                <div className="bg-dark text-center p-2 rounded flex-fill">
                  <h4 className="text-white">Black</h4>
                  <div className="h-[2px] bg-white mx-auto w-3/4 mb-2"></div>
                  <div className="text-white">
                    {Math.floor(blackTime / 60)}:{String(blackTime % 60).padStart(2, "0")}
                  </div>
                </div>
              </div>

              {/* Move List */}
              <h4 className="text-center">Moves</h4>
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

              {/* Chat */}
              <h5 className="text-center">Chat</h5>
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
                  <div key={i} style={{ marginBottom: "5px" }}>
                    {msg}
                  </div>
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
              <center>
                <button
                  onClick={handleSendChat}
                  disabled={!chat.trim() || !isGameStarted}
                  className="bg-blue-500 py-2 rounded mt-2 w-40 font-bold"
                >
                  Send
                </button>
              </center>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

}

export default Bullet;
