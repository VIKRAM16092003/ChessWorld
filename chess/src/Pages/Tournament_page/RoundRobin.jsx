import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "../../assets/logo.jpg";
import chessbgimg from "../../assets/chessbgimg.jpg";
import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";

 
const RoundRobin = () => {
  const [players, setPlayers] = useState(["player1", "player2", "player3", "player4"]);
  const [matches, setMatches] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const timer = location.state?.timer || 1800;

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
  const [playersforround, setPlayersforrounds]= useState("Player1 vs Player4")
  const [playersindex, setPlayersIndex] = useState(0)


 const toaddPlayers =() =>{
  const round1 = [
    "Player1 vs Player4",
    "Player2 vs Player3",
    "Player1 vs Player3",
    "Player4 vs Player2",
    "Player1 vs Player2",
    "Player3 vs Player4",
  ];
  setPlayersforrounds(round1[playersindex])
  setPlayersIndex((prev)=> prev +1)
 }

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
            toast.success("⏱ Time's up! Black wins!");
            setResult("⏱ Time's up! Black wins!");
            return 0;
          }
          return time - 1;
        });
      } else {
        setBlackTime((time) => {
          if (time <= 1) {
            toast.success("⏱ Time's up! White wins!");
            setResult("⏱ Time's up! White wins!");
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







  useEffect(() => {
    generateRoundRobinMatches(players);
  }, [players]);

  const generateRoundRobinMatches = (players) => {
    const rounds = [];
    const totalRounds = players.length - 1;
    const totalPlayers = players.length;

    let rotatedPlayers = [...players];

    if (totalPlayers % 2 !== 0) {
      rotatedPlayers.push("BYE"); 
    }

    for (let round = 0; round < totalPlayers - 1; round++) {
      const roundMatches = [];

      for (let i = 0; i < rotatedPlayers.length / 2; i++) {
        const player1 = rotatedPlayers[i];
        const player2 = rotatedPlayers[rotatedPlayers.length - 1 - i];
        if (player1 !== "BYE" && player2 !== "BYE") {
          roundMatches.push({ player1, player2 });
        }
      }

      rounds.push(roundMatches);

  
      const fixed = rotatedPlayers[0];
      const rest = rotatedPlayers.slice(1);
      rest.unshift(rest.pop());
      rotatedPlayers = [fixed, ...rest];
    }

    setMatches(rounds);
  };





  return (
    <div className="bg-[#5b646d]/10 h-[190vh]">
      <div
        className="min-h-screen w-full h-[190vh]  bg-cover bg-center pb-[50px] bg-[#EFEEEA] font-sans"
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
              className="w-[130px]  rounded-[10px] bg-green-700 hover:bg-green-800 text-[#F2F2F2] font-[500]   mb-3 h-[45px] right"
              style={{ borderRadius: "10px", marginTop: "30px" }}
              onClick={() => navigate("/")}
            >
              Back to Home
            </button>
          </div>


          <div className="flex flex-row justify-center">
            <p
              className="text-center bg-white/30  text-shadow-lg top-12 shadow-lg h3 px-4 rounded-[20px] mb-3 py-3 w-[500px] gap-2 "
              style={{
                fontFamily: "Anton sans-serif",
                fontWeight: "700",
              }}
            >
              ROUND ROBIN MATCH
            </p>
          </div>
          <div className="flex border-2 border-[#fff] w-[95vw] ml-[20px] bg-white/60 rounded-[20px] flex-row justify-evenly">
            <div className="flex flex-col justify-evenly bg-white/50 mt-[45px] pt-[20px] shadow-lg rounded-[10px] h-[596px] w-[250px] mb-[50px] px-4">
              {matches.map((round, index) => (
                <div
                  key={index}
                  className="ml-[0vw] bg-white/70 mb-[0px] hover:translate-x-1 hover:bg-green-600   rounded-[15px]  shadow-lg mr-[0px] flex p-4 flex-col"
                  onClick={toaddPlayers}
                >
                  <h3 style={{ textAlign: "center", color: "#52734D",fontSize:"20px" }}>
                    ROUND {index + 1}
                  </h3>
                  {round.map((match, i) => (
                    <div
                      key={i}
                      className="text-[#52616B]  hover:text-[#fff] font-[600]"
                    >
                      {match.player1} vs {match.player2}
                    </div>
                  ))}
                </div>
              ))}
            </div>

           
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
                      flexDirection:"row",
                      justifyContent: "space-between",
                      flexWrap: "wrap",
                      width:"827px"
                    }}
                  >
                    {/* Chessboard */}
                    <div style={{ flex: "none", textAlign: "center",marginTop:"25px" }}>
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

                      <div className="flex flex-row justify-evenly mt-[30px]">
                        {["Play"].map((btn) => (
                          <button
                            key={btn}
                            className="w-[130px]  rounded-[10px] bg-green-700  hover:bg-green-800 text-[#F2F2F2] font-[500]   mb-3 h-[45px] right"
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
                          className="w-[130px]  rounded-[10px] bg-green-700 hover:bg-green-800 text-[#F2F2F2] font-[500]   mb-3 h-[45px] right"
                          style={{ borderRadius: "10px" }}
                        >
                          Restart Game
                        </button>
                      
                    </div>

                    {/* Timer and Chat Panel */}
                    
                  </div>
                  <div
                      style={{
                        minWidth: "120px",
                        
                        textAlign: "center",
                       
                        marginBottom: "auto",
                      }}
                    >
                      <h4
                            style={{
                              marginTop: "20px",
                              color: "#1F2937",
                              fontWeight: "600",
                            }}
                          >
                            TIMER
                          </h4>
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

                      <div style={{ marginTop: "20px", textAlign: "left",width:"260px" }}>
                        {/* Move History Panel */}
                        <div
                          style={{
                            flex: "0.5",
                            minWidth: "100px",
                            textAlign: "center",
                          }}
                        >
                          <h4
                            style={{
                              marginTop: "20px",
                              color: "#1F2937",
                              fontWeight: "600",
                            }}
                          >
                            MOVES
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

                          <div className="border- border-[#fff] mt-[30px] rounded-[10px] bg-white/40 p-3">
                            {!isGameStarted && (
                              <div className="flex flex-col mt-[0px] justify-evenly">
                                <div className="flex flex-col">
                                  <div className="mt-2 text-gray-800 ">
                                    <label>
                                      <strong className="text-[21px]">
                                        SELECT ROUND:
                                      </strong>
                                    </label>
                                    <select
                                      className=" ml-2 form-select mt-2 "
                                      style={{
                                        width: "225px",
                                        marginLeft: "1px",
                                      }}
                                      value={gameMode}
                                      onChange={(e) =>
                                        setGameMode(e.target.value)
                                      }
                                    >
                                      <option value="player1">Ai-skip</option>
                                      <option value="twoPlayer">Round1</option>
                                      <option value="twoPlayer">Round2</option>
                                      <option value="twoPlayer">Round3</option>
                                    </select>
                                  </div>
                                  <div className="mt-2 text-gray-800">
                                    <label>
                                      <strong className="text-[21px]">
                                        PLAYER VS MODE:
                                      </strong>
                                    </label>
                                    <select
                                      className="form-select mt-2 "
                                      style={{
                                        width: "225px",
                                        marginLeft: "1px",
                                      }}
                                      value={gameMode}
                                      onChange={(e) =>
                                        setGameMode(e.target.value)
                                      }
                                    >
                                      <option value="player1">
                                        {playersforround}
                                      </option>
                                    </select>
                                  </div>
                                </div>

                                {gameMode === "ai" && (
                                  <div className="text-gray-800 mt-2">
                                    <label>
                                      <strong className="text-[21px]">
                                        SELECT SIDE:
                                      </strong>
                                    </label>
                                    <select
                                      className="ml-[0px] form-select mt-2"
                                      style={{
                                        width: "225x",
                                        marginLeft: "1px",
                                      }}
                                      value={playerSide}
                                      onChange={(e) =>
                                        setPlayerSide(e.target.value)
                                      }
                                    >
                                      <option value="player1">Black</option>
                                      <option value="twoPlayer">White</option>
                                    </select>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoundRobin;