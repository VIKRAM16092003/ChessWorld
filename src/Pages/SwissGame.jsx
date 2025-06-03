import React, { useState, useEffect, useRef } from "react";
import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import chessbgimg from "../assets/chessbgimg.jpg";
import { IoArrowBackCircleSharp } from "react-icons/io5";

import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/logo.jpg";

const SwissGame = () => {
  const [players, setPlayers] = useState([
    { id: 1, name: "PLAYER 1", score: 0 },
    { id: 2, name: "PLAYER 2", score: 0 },
    { id: 3, name: "PLAYER 3", score: 0 },
    { id: 4, name: "PLAYER 4", score: 0 },
  ]);

  const [currentRound, setCurrentRound] = useState(1);
  const [maxRounds, setMaxRounds] = useState(3);
  const [highlightSquares, setHighlightSquares] = useState({});
  const [pairings, setPairings] = useState([]);
  const [playedPairs, setPlayedPairs] = useState([]);
  const [activeGame, setActiveGame] = useState(null);
  const timer = location.state?.timer || 600;
  const [whiteTime, setWhiteTime] = useState(timer);
  const [blackTime, setBlackTime] = useState(timer);

  const [game, setGame] = useState(new Chess());
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [playerstandings, setPlayerstandings] = useState(false);
  const [playerSide, setPlayerSide] = useState("w");
  const [history, setHistory] = useState([]);
  const [result, setResult] = useState(null);
  const boardRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    if (pairings.length === 0 && currentRound <= maxRounds) {
      generatePairings();
    }
  }, [currentRound]);

  const generatePairings = () => {
    const sortedPlayers = [...players].sort((a, b) => b.score - a.score);
    const newPairings = [];

    for (let i = 0; i < sortedPlayers.length; i += 2) {
      const p1 = sortedPlayers[i];
      const p2 = sortedPlayers[i + 1];

      if (!p2) continue;

      const alreadyPlayed = playedPairs.some(
        ([a, b]) => (a === p1.id && b === p2.id) || (a === p2.id && b === p1.id)
      );

      if (alreadyPlayed) continue;

      newPairings.push([p1, p2]);
      setPlayedPairs((prev) => [...prev, [p1.id, p2.id]]);
    }

    setPairings(newPairings);
    setActiveGame(0);
    setIsGameStarted(false);
    setGame(new Chess());
    setHistory([]);
    setResult(null);
  };

  const startMatch = (pairIndex) => {
    setActiveGame(pairIndex);
    setGame(new Chess());
    setHistory([]);
    setResult(null);
    setIsGameStarted(true);
    setPlayerstandings(true);
  };

  // const updateGame = (move) => {
  //   const gameInstance = { ...game };
  //   const result = gameInstance.move(move);

  //   if (result) {
  //     setGame(gameInstance);
  //     setHistory([...gameInstance.history()]);

  //     if (gameInstance.isCheckmate()) {
  //       const winner = gameInstance.turn() === "w" ? "Black" : "White";
  //       toast.success(`Checkmate! ${winner} wins!`);
  //       setResult(`Checkmate! ${winner} wins!`);

  //       const pair = pairings[activeGame];
  //       const winnerId = winner === "White" ? pair[0].id : pair[1].id;

  //       setPlayers((prev) =>
  //         prev.map((p) =>
  //           p.id === winnerId ? { ...p, score: p.score + 1 } : p
  //         )
  //       );
  //     } else if (gameInstance.isDraw()) {
  //       toast.info("Game Draw!");
  //       setResult("Draw");
  //     }
  //   }
  // };

  const nextGameOrRound = () => {
    if (activeGame < pairings.length - 1) {
      startMatch(activeGame + 1);
    } else if (currentRound < maxRounds) {
      setCurrentRound(currentRound + 1);
    } else {
      toast.success("🏆 Tournament Over!");
    }
  };

  const updateGame = (updatedGame) => {
    const pair = pairings[activeGame];
    const currentFen = updatedGame.fen();

    setGame(updatedGame);
    setHistory([...updatedGame.history()]);

    if (updatedGame.isCheckmate()) {
      const winner = updatedGame.turn() === "w" ? "Black" : "White";
      toast.success(`Checkmate! ${winner} wins!`);
      setResult(`Checkmate! ${winner} wins!`);

      const winnerId = winner === "White" ? pair[0].id : pair[1].id;

      setPlayers((prev) =>
        prev.map((p) => (p.id === winnerId ? { ...p, score: p.score + 1 } : p))
      );

      setTimeout(() => {
        nextGameOrRound();
      }, 3000);
    } else if (updatedGame.isDraw()) {
      toast.info("Game Draw!");
      setResult("Draw");

      setPlayers((prev) =>
        prev.map((p) =>
          p.id === pair[0].id || p.id === pair[1].id
            ? { ...p, score: p.score + 0.5 }
            : p
        )
      );

      setTimeout(() => {
        nextGameOrRound();
      }, 3000);
    }
  };

  const handleRestart = () => {
    restartTournament();
    navigate("/swissgame");
  };

  const restartTournament = () => {
    const startingPosition = new Chess();
    const currentPosition = new Chess(game.fen());

    const newGame = new Chess();

    const squares = [...Array(8).keys()].flatMap((r) =>
      [...Array(8).keys()].map((f) => String.fromCharCode(97 + f) + (8 - r))
    );

    for (const square of squares) {
      const startPiece = startingPosition.get(square);
      const currentPiece = currentPosition.get(square);

      if (
        JSON.stringify(startPiece) !== JSON.stringify(currentPiece) &&
        startPiece
      ) {
        newGame.put(startPiece, square);
      } else if (!startPiece && currentPiece) {
        newGame.remove(square);
      }
    }

    setGame(newGame);
    setActiveGame((prev) => ({
      ...prev,
      fen: newGame.fen(),
    }));
    setResult(null);
    setIsGameStarted(false);
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

  return (
    <div>
      <div className="relative min-h-screen w-full h-[180vh]">
        {/* Blurred Background Image */}
        <img
          src={chessbgimg}
          alt="background"
          className="absolute inset-0 w-full h-full object-cover filter blur-sm"
          style={{ zIndex: 0 }}
        />

        {/* Optional dark  */}
        <div
          className="absolute inset-0 bg-white/20"
          style={{ zIndex: 1 }}
        ></div>

        <div className="relative z-10 min-h-screen w-full">
          <div className=" h-[180vh]">
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
                className="text-center bg-white/30  text-shadow-lg top-12 shadow-lg h3 px-4 rounded-[20px] mb-3 py-3 w-[500px] gap-2"
                style={{
                  fontFamily: "Anton sans-serif",
                  fontWeight: "700",
                }}
              >
                SWISS GAME
              </p>
            </div>
            <div className="flex rounded-[10px] flex flex-row justify-evenly w-[90vw] bg-white/60 ml-[5vw] p-4 flex-row pl-[0px]">
              <div
                className="flex  flex-col justify-between h-[330px]  mt-[19px] mb-2"
                style={{ marginBottom: "20px" }}
              >
                {pairings.map(([p1, p2], index) => (
                  <div
                    key={index}
                    className="flex text-center hover:bg-green-900  hover:shadow-xl flex-col  w-[200px] bg-white/60 p-3 rounded-[10px] shadow-lg mr-6"
                  >
                    <p className="text-gray-800 font-[600] hover:text-[#fff] text-[18px]">
                      {p1.name} vs {p2.name} (Score: {p1.score}-{p2.score})
                    </p>
                    {!isGameStarted && (
                      <button
                        className="bg-green-600 p-2 w-[130px] hover:bg-white hover:text-green-900 ml-5 rounded-3 text-[#fff] font-[600]"
                        onClick={() => startMatch(index)}
                        style={{ marginLeft: "21px" }}
                      >
                        Start Match
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <div className=" bg-white/40 shadow-lg rounded-[20px] mt-[10px] h-[800px] w-[67vw] ml-[vw] ">
                <div className="flex flex-row  justify-evenly ">
                  <div className="w-[40vw] h-[700px] mt-[10px]">
                    {isGameStarted && pairings[activeGame] ? (
                      <>
                        <h3
                          style={{
                            textAlign: "center",
                            color: "gray",
                            fontWeight: "600",
                            marginBottom: "20px",
                            fontSize: "20px",
                            marginTop: "40px",
                          }}
                        >
                          {pairings[activeGame][0].name} (White) vs{" "}
                          {pairings[activeGame][1].name} (Black)
                        </h3>
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
                              backgroundColor: "#C38154", // Silver
                            }}
                            customLightSquareStyle={{
                              backgroundColor: "#F9E0BB", // White
                            }}
                            arePiecesDraggable={
                              isGameStarted && !game.isGameOver() && !result
                            }
                          />
                          {isGameStarted && (
                            <h5
                              style={{
                                marginTop: "10px",
                                color: "gray",
                                fontWeight: "700",
                                marginTop: "20px",
                                textShadow: "10px",
                              }}
                            >
                              You are playing as:{" "}
                              {playerSide === "w" ? "White" : "Black"}
                            </h5>
                          )}
                        </div>

                        {result && <p>{result}</p>}
                      </>
                    ) : (
                      <div className="flex pt-[50px] mb-[30px] rounded-[20px] border-[#fff] flex-col align-center justify-center mr-[10vw] w-[40vw]">
                        <h1
                          style={{
                            fontSize: "34px",
                            color: "green",
                            marginTop: "0px",
                            fontFamily: "Anto sans-serif",
                            fontWeight: "700",
                            textAlign: "center",
                          }}
                        >
                          INSTRUCTION:
                        </h1>
                        <ul className="text-[#fff]">
                          <li
                            className="text-[#fff] pl-3 text-gray-600 mb-[30px] font-[700] text-[16px] tracking-[1px] text-justify"
                            style={{
                              marginBottom: "10px",
                              lineHeight: "30px",
                              listStyleType: "disc",
                            }}
                          >
                            In a Swiss-system chess tournament, each player
                            competes in a fixed number of rounds (usually 4 to
                            9), but not in a full round-robin format.
                          </li>{" "}
                          <li
                            className="text-[#fff] pl-3 text-gray-600  mb-[50px] font-[700] text-[16px] tracking-[1px] text-justify"
                            style={{
                              marginBottom: "10px",
                              lineHeight: "30px",
                              listStyleType: "disc",
                            }}
                          >
                            In the first round, pairings are made randomly or
                            based on rating. From the second round onwards,
                            players are paired with others who have similar
                            scores.{" "}
                          </li>
                          <li
                            className="text-[#fff] text-gray-600  pl-3  mb-[50px] font-[700] text-[16px] tracking-[1px] text-justify"
                            style={{
                              marginBottom: "10px",
                              lineHeight: "30px",
                              listStyleType: "disc",
                            }}
                          >
                            A player never plays the same opponent twice, and
                            colors (white/black) are balanced as much as
                            possible.
                          </li>{" "}
                          <li
                            className="text-[#fff] text-gray-600  pl-3  mb-[50px] font-[700] text-[16px] tracking-[1px] text-justify"
                            style={{
                              marginBottom: "10px",
                              lineHeight: "30px",
                              listStyleType: "disc",
                            }}
                          >
                            {" "}
                            After each round, players receive points: 1 point
                            After each round, players receive points: 1 point
                            for a win, 0.5 for a draw, and 0 for a loss.
                          </li>{" "}
                          <li
                            className="text-[#fff] text-gray-600  pl-3  mb-[50px] font-[700] text-[16px] tracking-[1px] text-justify"
                            style={{
                              marginBottom: "10px",
                              lineHeight: "30px",
                              listStyleType: "disc",
                            }}
                          >
                            The player with the highest total score at the end
                            of all rounds is declared the winner.
                          </li>
                          <li
                            className="text-[#fff] text-gray-600  pl-3  mb-[50px] font-[700] text-[16px] tracking-[1px] text-justify"
                            style={{
                              marginBottom: "10px",
                              lineHeight: "30px",
                              paddingLeft: "20px",
                              listStyleType: "disc",
                            }}
                          >
                            {" "}
                            The Swiss system ensures fair matchups, even in
                            large tournaments, and gives everyone a chance to
                            play multiple games regardless of wins or losses.
                          </li>
                        </ul>
                        <p
                          className="text-[#609966] text-[22px] font-[600]"
                          style={{
                            marginBottom: "50px",
                            marginTop: "20px",
                            textAlign: "center",
                          }}
                        >
                          "Read and Click Start Game to play swiss mode type
                          chessgame"
                        </p>
                      </div>
                    )}
                  </div>

                  {playerstandings ? (
                    <div className="my-auto px-6">
                      <h3
                        style={{
                          color: "gray",
                          fontWeight: "700",
                          textAlign: "center",
                          fontSize: "20px",
                          marginBottom: "20px",
                        }}
                      >
                        PLAYER STANDINGS
                      </h3>
                      <table className="min-w-full text-left border-collapse text-[#fff]">
                        <thead>
                          <tr className="bg-green-700 text-white">
                            <th className="px-4 py-2 border border-black">
                              RANK
                            </th>
                            <th className="px-4 py-2 border border-black">
                              PLAYER
                            </th>
                            <th className="px-4 py-2 border border-black">
                              SCORE
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {[...players]
                            .sort((a, b) => b.score - a.score)
                            .map((player, index) => (
                              <tr
                                key={player.id}
                                className="bg-white/60 shadow-lg"
                              >
                                <td className="px-4 text-gray-800 py-2 border border-black">
                                  {index + 1}
                                </td>
                                <td className="px-4 text-gray-800 py-2 border border-black">
                                  {player.name}
                                </td>
                                <td className="px-4 text-gray-800 py-2 border border-black">
                                  {player.score}
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>

                      <div className="flex justify-center mt-6">
                        <button
                          className="bg-green-700 hover:bg-green-800 p-2 w-[130px] rounded-2 text-white font-semibold hover:bg-[#3e5470] transition duration-200"
                          onClick={nextGameOrRound}
                        >
                          Next
                        </button>
                      </div>
                      <div className="flex justify-center mt-6">
                        <button
                          className="bg-green-700 hover:bg-green-800  p-2 w-[130px] rounded-2 text-white font-semibold hover:bg-[#3e5470] transition duration-200"
                          onClick={handleRestart}
                        >
                          Restart
                        </button>
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SwissGame;
