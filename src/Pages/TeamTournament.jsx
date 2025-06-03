import React, { useState, useEffect } from "react";
import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import chessbgimg from "../assets/chessbgimg.jpg";
import logo from "../assets/logo.jpg";
import { IoArrowBackCircleSharp } from "react-icons/io5";

const TeamTournament = () => {
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
  const [teams, setTeams] = useState([]);
  const [teamName, setTeamName] = useState("");
  const [teamPlayers, setTeamPlayers] = useState(["", ""]);
  const [pairedTeams, setPairedTeams] = useState([]);
  const [matchstart, setMatchstart] = useState(false);

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

  // const makeAIMove = () => {
  //   if (gameMode !== "ai") return;
  //   const possibleMoves = game.moves();
  //   if (game.isGameOver() || possibleMoves.length === 0) return;

  //   const randomIndex = Math.floor(Math.random() * possibleMoves.length);
  //   game.move(possibleMoves[randomIndex]);
  //   updateGame(game);
  //   setCurrentTurn(game.turn());
  // };

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
  const togoredisterpage = () =>{
    setMatchstart(false)
  }

  const registerTeam = () => {
    if (!teamName.trim() || teamPlayers.some((p) => !p.trim())) {
      alert("Please fill all fields!");
      return;
    }
    const newTeam = {
      name: teamName.trim(),
      players: teamPlayers.map((p) => p.trim()),
    };
    setTeams([...teams, newTeam]);
    setTeamName("");
    setTeamPlayers(["", ""]);
  };

  const handlePlayerChange = (index, value) => {
    const updated = [...teamPlayers];
    updated[index] = value;
    setTeamPlayers(updated);
  };

  const pairTeams = () => {
    const shuffled = [...teams].sort(() => Math.random() - 0.5);
    const pairs = [];
    for (let i = 0; i < shuffled.length; i += 2) {
      if (shuffled[i + 1]) {
        pairs.push([shuffled[i], shuffled[i + 1]]);
      }
    }
    setPairedTeams(pairs);
    setMatchstart(true);
  };

  return (
    <>
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
              className="w-[130px]  rounded-[10px] bg-green-700 hover:bg-green-800 text-[#F2F2F2] font-[500]   mb-3 h-[45px] right"
              style={{ borderRadius: "10px", marginTop: "30px" }}
              onClick={() => navigate("/")}
            >
              Back to Home
            </button>
          </div>
          {matchstart ? (
            <div
              className={`bg-white/50 border-[px] mt-3 border-[]  pb-[70px] w-[80vw] ml-[10vw] shadow-md rounded-[10px] start-game-wrapper ${
                isDarkMode ? "dark-mode" : " "
              }`}
            >
              <div className="flex flex-row justify-center">
                <h1
                  style={{
                    fontSize: "30px",
                    color: "#374151",
                    textAlign: "center",
                    paddingTop: "10px",
                    fontFamily: "sans-serif",
                    fontWeight: "600",
                    width: "600px",

                    borderRadius: "10px",
                    marginTop: "10px",
                  }}
                >
                  <ul className="flex flex-col items-center">
                    {teams.map((team, index) => {
                      if (index % 2 === 0 && index + 1 < teams.length) {
                        return (
                          <li key={index}>
                            <strong>{team.name}</strong> vs{" "}
                            <strong>{teams[index + 1].name}</strong>
                          </li>
                        );
                      }
                      return null;
                    })}
                  </ul>
                </h1>
                <div className="h-[40px] w-[60px]">
                  <IoArrowBackCircleSharp
                    style={{
                      width: "40px",
                      height: "40px",
                      marginTop: "28px",
                      marginLeft: "302px",
                    }}
                    onClick={togoredisterpage}
                  />
                </div>
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
                    // background: isDarkMode
                    //   ? "#1e1e1e"
                    //   : "linear-gradient(135deg, #f5f7fa, #c3cfe2)",

                    borderRadius: "12px",
                    // boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
                    // padding: "20px",
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
                        <div className="border-[0px] bg-white/60 shadow-md h-[120px] w-[170px] border-[#fff] rounded-[10px]">
                          <h4
                            className="text-center text-[#fff] mt-2 mb-3 pb-1 border-b-[2px] border-[#fff]"
                            style={{
                              fontWeight: "600",
                              borderColor: "grey",
                              fontSize: "19px",
                              color: "#374151",
                              paddingTop: "10px",
                              paddingBottom: "10px",
                            }}
                          >
                            Timer for White
                          </h4>
                          <div
                            style={{
                              fontSize: "28px",
                              marginTop: "23px",
                              fontWeight: "700",
                              color: "#6B7280",
                            }}
                          >
                            {Math.floor(whiteTime / 60)}:
                            {String(whiteTime % 60).padStart(2, "0")}
                          </div>
                        </div>

                        <div className="player-box">
                          <div className="border-[0px] bg-white/60 shadow-md h-[120px] w-[170px] border-[#fff] rounded-[10px]">
                            <h4
                              className="text-center  border-b-[2px]  pt-3 pb-1  border-[#fff]"
                              style={{
                                color: "#374151",
                                fontWeight: "600",
                                borderColor: "gray",
                                fontSize: "19px",
                                paddingTop: "10px",
                                paddingBottom: "10px",
                              }}
                            >
                              Timer for Black
                            </h4>
                            <div
                              style={{
                                fontSize: "28px",
                                marginTop: "23px",
                                fontWeight: "700",
                                color: "#6B7280",
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
                                  <strong>Select Team Mode:</strong>
                                </label>
                                <select
                                  className="form-select mt-2 "
                                  style={{ width: "180px" }}
                                  value={gameMode}
                                  onChange={(e) => setGameMode(e.target.value)}
                                >
                                  <option value="twoPlayer">Ai mode </option>
                                  <option value="twoPlayer">
                                    Two player mode{" "}
                                  </option>
                                </select>
                              </div>

                              {gameMode === "ai" && (
                                <div className="mt-2">
                                  <label>
                                    <strong>Select Side:</strong>
                                  </label>
                                  <select
                                    className="form-select mt-2"
                                    style={{
                                      width: "180px",
                                      marginLeft: "10px",
                                    }}
                                    value={playerSide}
                                    onChange={(e) =>
                                      setPlayerSide(e.target.value)
                                    }
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
                            className="w-[130px]  rounded-[10px] bg-green-700 hover:bg-[#065f46] text-[#F2F2F2] font-[500]   mb-3 h-[45px] right"
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
                          className="w-[130px]  rounded-[10px] bg-green-700 hover:bg-[#065f46] text-[#F2F2F2] font-[500]   mb-3 h-[45px] right"
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
          ) : (
            <div className="min-h-screen bg-black/30 rounded-[10px] px-[100px] py-[40px] w-[60vw] ml-[20vw] text-white p-6">
              <h1
                className="text-3xl font-bold mb-6 text-center"
                style={{ fontSize: "25px", marginBottom: "30px" }}
              >
                TEAM TOURNAMENT REGISTRATION
              </h1>

              {/* Team Registration Form */}
              <div className="shadow-lg p-4 bg-white/60 rounded shadow mb-6">
                <h2
                  className="text-xl font-semibold mb-3 "
                  style={{ fontSize: "20px", color: "#4B5563" }}
                >
                  Register a Team
                </h2>
                <input
                  type="text"
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  placeholder="Team Name"
                  className="w-full p-2 pl-5 rounded text-black font-[500] border-[#fff]  placeholder:text-gray-600 placeholder:font-[500] mb-2 border-2 "
                />
                {teamPlayers.map((player, index) => (
                  <input
                    key={index}
                    type="text"
                    value={player}
                    onChange={(e) => handlePlayerChange(index, e.target.value)}
                    placeholder={`Player ${index + 1}`}
                    className="w-full p-2 rounded text-black font-[500] border-[#fff] placeholder:text-gray-600 hover:border-white hover:border-[3px] placeholder:font-[500]  mb-2 border-2 "
                  />
                ))}
                <button
                  onClick={registerTeam}
                  className="bg-green-700 mt-2 hover:bg-green-800 text-white px-4 py-2 rounded"
                >
                  Register Team
                </button>
              </div>

              {/* Registered Teams List */}
              <div className="shadow-lg p-4 bg-white/60  rounded shadow mb-6">
                <h2
                  className="text-xl font-semibold mb-3"
                  style={{
                    fontSize: "20px",
                    color: "#4B5563",
                    fontWeight: "600",
                  }}
                >
                  Registered Teams
                </h2>
                {teams.length === 0 ? (
                  <p className="text-gray-600 border-b-1 font-[400] text-[18px]">
                    No teams registered yet.
                  </p>
                ) : (
                  <ul className="space-y-2">
                    {teams.map((team, index) => (
                      <li key={index} className="border-b text-gray-600 pb-2">
                        <strong>{team.name}</strong> - Players:{" "}
                        {team.players.join(", ")}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Pair Teams */}
              <div className="shadow-lg p-4 bg-white/60 rounded shadow mb-6">
                <h2
                  className="text-xl font-semibold mb-3"
                  style={{ fontSize: "20px", color: "#4B5563" }}
                >
                  Team Pairing
                </h2>
                <button
                  onClick={pairTeams}
                  disabled={teams.length < 2}
                  className="bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Pair Teams
                </button>

                {pairedTeams.length > 0 && (
                  <div className="mt-4">
                    <h3
                      className="text-lg font-semibold mb-2"
                      style={{ fontSize: "20px", color: "#4B5563" }}
                    >
                      Matchups:
                    </h3>
                    <ul className="space-y-2">
                      {pairedTeams.map(([teamA, teamB], index) => (
                        <li
                          key={index}
                          className="border-b border-gray-600 text-gray-500 pb-2"
                        >
                          <strong>{teamA.name}</strong> vs{" "}
                          <strong>{teamB.name}</strong>
                          <br />
                          Players: {teamA.players.join(", ")} vs{" "}
                          {teamB.players.join(", ")}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default TeamTournament;
