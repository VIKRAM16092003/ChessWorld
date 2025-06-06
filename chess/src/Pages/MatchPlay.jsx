import React, { useState, useEffect, useRef } from "react";
import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";
import chessbgimg from "../assets/chessbgimg.jpg";
import logo from "../assets/logo.jpg";
import { Link, useNavigate } from "react-router-dom";

const Matchplay = () => {
  const chess = useRef(new Chess());
  const navigate = useNavigate();

  const [gameFen, setGameFen] = useState(chess.current.fen());
  const [gameOver, setGameOver] = useState(false);
  const [turn, setTurn] = useState("w");
  const [winner, setWinner] = useState(null);

  const initialTime = 300; // 5 minutes
  const [whiteTime, setWhiteTime] = useState(initialTime);
  const [blackTime, setBlackTime] = useState(initialTime);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    setShowPopup(true);
  }, []);

  const closePopup = () => {
    setShowPopup(false);
  };
  
  
  
  
  
  const timerRef = useRef(null);

  useEffect(() => {
    if (gameOver || winner) return;

    timerRef.current = setInterval(() => {
      if (turn === "w") {
        setWhiteTime((prev) => {
          if (prev <= 1) {
            setWinner("Black (Time Out)");
            setGameOver(true);
            clearInterval(timerRef.current);
            return 0;
          }
          return prev - 1;
        });
      } else {
        setBlackTime((prev) => {
          if (prev <= 1) {
            setWinner("White (Time Out)");
            setGameOver(true);
            clearInterval(timerRef.current);
            return 0;
          }
          return prev - 1;
        });
      }
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [turn, gameOver]);

  function onDrop(sourceSquare, targetSquare) {
    if (gameOver || winner) return false;

    const move = chess.current.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: "q",
    });

    if (move === null) return false;

    setGameFen(chess.current.fen());
    setTurn(chess.current.turn());

    if (chess.current.isGameOver()) {
      setGameOver(true);
      if (chess.current.isCheckmate()) {
        setWinner(turn === "w" ? "Black" : "White");
      } else {
        setWinner("Draw");
      }
    }

    return true;
  }

  function resetGame() {
    chess.current.reset();
    setGameFen(chess.current.fen());
    setGameOver(false);
    setWinner(null);
    setTurn("w");
    setWhiteTime(initialTime);
    setBlackTime(initialTime);
  }

  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const sec = (seconds % 60).toString().padStart(2, "0");
    return `${min}:${sec}`;
  };

  return (
    <div className="relative min-h-screen w-full font-sans overflow-hidden">
      {/* Blurred background image */}
      <div
        className="absolute inset-0 bg-cover bg-center blur-md"
        style={{ backgroundImage: `url(${chessbgimg})` }}
      />
      {/* Optional overlay to dim the background */}
      <div className="absolute inset-0 bg-white/20" />

      {/* Foreground content */}
      <div className="relative z-10 pb-[50px]">
        <div className="flex flex-row justify-between mb-2 px-[30px]">
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
            <p className="text-[20px] font-bold text-black pt-3 tracking-[1px]">
              CHESS{" "}
              <span className="text-white font-[300] tracking-[-1px] pl-2 text-[20px]">
                WORLD
              </span>
            </p>
          </Link>
          <button
            className="w-[130px] rounded-[10px] bg-green-700 hover:bg-green-800 text-[#F2F2F2] font-[500] mb-3 h-[45px] mt-[30px]"
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
            MATCH PLAY
          </p>
        </div>

        {/* popup/ */}

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

        <div className="flex">
          <div className="bg-white/40 shadow-lg w-[90vw] pt-3 flex h-[740px] ml-[5vw] border-[#fff] border-[px] rounded-[20px]">
            <div
              className="ml-[60px]"
              style={{
                width: "800px",
                marginLeft: "80px",
                textAlign: "center",
              }}
            >
              <div className="flex text-center w-[1000px] flex-row justify-center"></div>
              <div className="flex flex-row justify-evenly mt-4">
                <Chessboard
                  position={gameFen}
                  onPieceDrop={onDrop}
                  arePiecesDraggable={!gameOver}
                  boardWidth={600}
                />
                <div className="ml-4 text-left my-auto">
                  <p className="text-[20px] bg-white/60  text-center rounded-[10px] p-2 text-grey-300 font-[700] mb-[30px]">
                    Turn : {turn === "w" ? "White" : "Black"}
                  </p>
                  <center><h3>Timer</h3></center>
                  <div className="flex flex-row mt-[30px] justify-evenly">
                    
                    <div className="bg-white/60 mr-4 shadow-md h-[120px] w-[170px] rounded-[10px]">
                    
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
                        White
                      </h4>
                      <div
                        style={{
                          fontSize: "28px",
                          marginTop: "10px",
                          fontWeight: "700",
                          color: "#6B7280",
                        }}
                        className="text-[28px] font-bold ml-[50px] mt-[23px]"
                      >
                        {formatTime(whiteTime)}
                      </div>
                    </div>

                    <div className="bg-white/60 shadow-md h-[120px] w-[170px] rounded-[10px]">
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
                        Black
                      </h4>
                      <div
                        style={{
                          fontSize: "28px",
                          marginTop: "10px",
                          fontWeight: "700",
                          color: "#6B7280",
                        }}
                        className="text-[28px] font-bold ml-[50px] mt-[23px]"
                      >
                        {formatTime(blackTime)}
                      </div>
                    </div>
                  </div>
                  {gameOver && (
                    <p className="font-bold text-[18px] text-red-600 mt-2">
                      {winner ? `Winner: ${winner}` : "Game Over"}
                    </p>
                  )}
                  <div className="mt-4">
                    <button
                      className="w-[130px] ml-3 bg-green-700 hover:bg-green-800 p-2 rounded-2 text-white font-semibold hover:bg-[#3e5470] transition duration-200 mr-[70px] mt-[10px]"
                      onClick={resetGame}
                      style={{ marginLeft: "20px" }}
                    >
                      Start Game
                    </button>
                    <button
                      className="ml-3 w-[130px] bg-green-700 hover:bg-green-800 p-2 mt-2 rounded-2 text-white font-semibold hover:bg-[#3e5470] transition duration-200"
                      onClick={resetGame}
                      style={{ marginLeft: "60px" }}
                    >
                      Reset Game
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
};

export default Matchplay;