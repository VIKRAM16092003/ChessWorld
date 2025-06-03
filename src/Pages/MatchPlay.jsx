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
        <div className="flex">
          <div className="bg-white/40 shadow-lg w-[70vw] pt-3 flex h-[740px] ml-[15vw] border-[#fff] border-[px] rounded-[20px]">
            <div
              className="ml-[60px]"
              style={{
                width: "800px",
                marginLeft: "80px",
                textAlign: "center",
              }}
            >
              <div className="flex text-center w-[1000px] flex-row justify-center">
                {/* <h2 className="text-white font-semibold text-[18px] pt-2 mb-[30px]">
                  Matchplay Chess
                </h2> */}
              </div>
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
                        Timer for White
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
                        Timer for Black
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
