import React, { useState, useEffect } from "react";
import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import chessbgimg from "../assets/chessbgimg.jpg";
import logo from "../assets/logo.jpg";

function BlitzGame() {
  const location = useLocation();
  const navigate = useNavigate();
  const timer = location.state?.timer || 180;

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
      toast.success(
        `Checkmate! ${currentTurn === "w" ? "White" : "Black"} wins!`
      );
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
    <div
      className="min-h-screen w-full  bg-cover bg-center pb-[50px] bg-[#EFEEEA] font-sans"
      style={{ backgroundImage: `url(${chessbgimg})` }}
    >
      <div className="bg[#5b646d]/30">
        <div class="flex flex-row justify-between mb-2  px-[30px]">
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
                class="text-white font-[300] tracking-[-1px] pl-2 text-[20px]
                        "
                style={{ letterSpacing: "-3px" }}
              >
                WORLD{" "}
              </span>{" "}
            </p>
          </Link>
          <button
            className="w-[130px]  rounded-[10px] bg-[#047857] hover:bg-[#065f46] text-[#F2F2F2] font-[500]   mb-3 h-[45px] right"
            style={{ borderRadius: "10px", marginTop: "30px" }}
            onClick={() => navigate("/")}
          >
            Back to Home
          </button>
        </div>

        <div
          className={` bg-[#dae2e6]/20 border-[px] mt-3 border-[]  pb-[70px] w-[80vw] ml-[10vw] shadow-md rounded-[10px] start-game-wrapper ${
            isDarkMode ? "dark-mode" : ""
          }`}
        >
          <h1
            style={{
              fontSize: "28px",
              color: "#fff",
              textAlign: "center",
              paddingTop: "20px",
              fontFamily: "Anton sans-serif",
              fontWeight: "700",
            }}
          >
            Blitz Game
          </h1>
          <div
            style={{
              fontFamily: "sans-serif",

              display: "flex",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: "100%",
                maxWidth: "1400px",
               

                borderRadius: "12px",
          
                color: isDarkMode ? "white" : "black",
              }}
            >
              {/* Top Navigation */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-evenly",
                  marginBottom: 20,
                  flexWrap: "wrap",
                  gap: "10px",
                }}
              ></div>

              {/* Game Body */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-evenly",

                  gap: "20px",
                  flexWrap: "wrap",
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
                    boardWidth={600}
                    customBoardStyle={{
                      borderRadius: "4px",
                      boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
                    }}
                    customDarkSquareStyle={{
                      backgroundColor: "#b58863", // Silver
                    }}
                    customLightSquareStyle={{
                      backgroundColor: "#f0d9b5", // White
                    }}
                    arePiecesDraggable={
                      isGameStarted && !game.isGameOver() && !result
                    }
                  />
                  {isGameStarted && gameMode === "ai" && (
                    <h5 style={{ marginTop: "10px" }}>
                      You are playing as:{" "}
                      {playerSide === "w" ? "White" : "Black"}
                    </h5>
                  )}
                </div>

                {/* Timer and Chat Panel */}
                <div
                  style={{
                    minWidth: "250px",
                    padding: "10px",
                    textAlign: "center",
                    marginTop: "auto",
                    marginBottom: "auto",
                  }}
                >
                  <div className="player-box w-[368px] flex flex-row justify-between">
                    <div className="border-[0px] bg-white/20 shadow-md h-[120px] w-[170px] border-[#fff] rounded-[10px]">
                      <h4
                        className="text-center text-[#fff] mt-2 mb-3 pb-1 border-b-[2px] border-[#fff]"
                        style={{
                          color: "#fff",
                          fontWeight: "600",
                          borderColor: "grey",
                          fontSize: "19px",
                        }}
                      >
                        Timer for White
                      </h4>
                      <div
                        style={{
                          fontSize: "28px",
                          marginTop: "23px",
                          fontWeight: "700",
                        }}
                      >
                        {Math.floor(whiteTime / 60)}:
                        {String(whiteTime % 60).padStart(2, "0")}
                      </div>
                    </div>

                    <div className="player-box">
                      <div className="border-[0px] bg-white/20 shadow-md h-[120px] w-[170px] border-[#fff] rounded-[10px]">
                        <h4
                          className="text-center  border-b-[2px]  pt-1 pb-1  border-[#fff]"
                          style={{
                            color: "#fff",
                            fontWeight: "600",
                            borderColor: "grey",
                            fontSize: "19px",
                          }}
                        >
                          Timer for Black
                        </h4>
                        <div
                          style={{
                            fontSize: "28px",
                            marginTop: "23px",
                            fontWeight: "700",
                          }}
                        >
                          {Math.floor(blackTime / 60)}:
                          {String(blackTime % 60).padStart(2, "0")}
                        </div>
                      </div>
                    </div>
                  </div>

                  {result && (
                    <div
                      style={{
                        backgroundColor: "red",
                        color: "white",
                        padding: "10px",
                        borderRadius: "8px",
                        marginBottom: "20px",
                      }}
                    >
                      <strong>{result}</strong>
                    </div>
                  )}

                  <div style={{ marginTop: "20px", textAlign: "left" }}>
                    {/* Move History Panel */}
                    <div
                      style={{
                        flex: "0.5",
                        minWidth: "180px",
                        textAlign: "center",
                      }}
                    >
                      <h4
                        style={{
                          marginTop: "20px",
                          color: "#fff",
                          fontWeight: "600",
                        }}
                      >
                        Moves
                      </h4>
                      <div
                        style={{
                          maxHeight: "200px",
                          overflowY: "auto",
                          marginBottom: "1rem",
                        }}
                      >
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
                              Array.from(
                                { length: Math.ceil(history.length / 2) },
                                (_, i) => (
                                  <tr key={i}>
                                    <td>{i + 1}</td>
                                    <td>{history[2 * i] || ""}</td>
                                    <td>{history[2 * i + 1] || ""}</td>
                                  </tr>
                                )
                              )
                            )}
                          </tbody>
                        </table>
                      </div>

                      {!isGameStarted && (
                        <div className="flex flex-row mt-[20px] justify-evenly">
                          <div className="mt-2 ">
                            <label>
                              <strong>Select Game Mode:</strong>
                            </label>
                            <select
                              className="form-select mt-2 "
                              style={{ width: "180px" }}
                              value={gameMode}
                              onChange={(e) => setGameMode(e.target.value)}
                            >
                              <option value="ai">Play with AI</option>
                              <option value="twoPlayer">Two Player</option>
                            </select>
                          </div>

                          {gameMode === "ai" && (
                            <div className="mt-2">
                              <label>
                                <strong>Select Side:</strong>
                              </label>
                              <select
                                className="form-select mt-2"
                                style={{ width: "180px", marginLeft: "10px" }}
                                value={playerSide}
                                onChange={(e) => setPlayerSide(e.target.value)}
                              >
                                <option value="w">
                                  White (You play first)
                                </option>
                                <option value="b">
                                  Black (AI plays first)
                                </option>
                              </select>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-row justify-between mt-[30px]">
                    {["Play"].map((btn) => (
                      <button
                        key={btn}
                        className="w-[130px]  rounded-[10px] bg-[#047857] hover:bg-[#065f46] text-[#F2F2F2] font-[500]   mb-3 h-[45px] right"
                        style={{ borderRadius: "10px" }}
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
                    <button
                      onClick={resetGame}
                      className="w-[130px]  rounded-[10px] bg-[#047857] hover:bg-[#065f46] text-[#F2F2F2] font-[500]   mb-3 h-[45px] right"
                      style={{ borderRadius: "10px" }}
                    >
                      Restart Game
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlitzGame;
