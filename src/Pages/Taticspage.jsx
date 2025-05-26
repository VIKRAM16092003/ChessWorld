import React, { useState } from "react";
import Chessboardpagefortatics from "./Chessboardpagefortactics";
import chessbgimg from "../assets/chessbgimg.jpg";
import logo from "../assets/logo.jpg";
import { Link, useNavigate } from "react-router-dom";

import wRook from "../assets/white_coins/w_rook.png";
import wKnight from "../assets/white_coins/w_knight.png";
import wBishop from "../assets/white_coins/w_bishop.png";
import wQueen from "../assets/white_coins/w_queen.png";
import wKing from "../assets/white_coins/w_king.png";
import wPawn from "../assets/white_coins/w_pawn.png";

import bRook from "../assets/black_coins/b_rook.png";
import bKnight from "../assets/black_coins/b_knight.png";
import bBishop from "../assets/black_coins/b_bishop.png";
import bQueen from "../assets/black_coins/b_queen.png";
import bKing from "../assets/black_coins/b_king.png";
import bPawn from "../assets/black_coins/b_pawn.png";

// Example boards
const board1 = [
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", bQueen, "", bKing, ""],
  ["", "", "", bRook, "", bPawn, "", bRook],
  ["", "", "", "", "", wKnight, bPawn, ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", wPawn],
  ["", "", wQueen, "", "", wPawn, wPawn, ""],
  ["", "", "", "", "", wRook, wKing, ""],
];

const board2 = [
  ["", bRook, bKing, "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", bKnight, "", "", ""],
  ["", "", "", "", "", wBishop, "", ""],
  ["", wKnight, "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", wQueen, "", wKing, "", "", "", ""],
];

const board3 = [
  ["", bKing, "", "", "", "", bRook, ""],
  [bPawn, bPawn, bPawn, "", "", bQueen, "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  [wPawn, "", wQueen, wBishop, "", "", wPawn, ""],
  ["", "", wPawn, wPawn, "", "", "", wPawn],
  ["", "", wKing, "", "", "", "", ""],
];
const board4 = [
  ["", wKing, "", "", "", "", "", ""],
  [wPawn, wPawn, wPawn, "", "", "", wPawn, wPawn],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", wQueen, "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", bBishop, "", "", ""],
  [bPawn, bPawn, bPawn, "", "", "", bPawn, bPawn],
  ["", bKing, "", "", bRook, "", "", ""],
];
const board5 = [
  ["", "", "", "", "", "", bRook, bKing],
  ["", "", "", "", "", bPawn, bPawn, bPawn],
  ["", "", bQueen, bPawn, "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", wPawn, "", "", "", "", ""],
  ["", "", "", "", bKnight, "", bQueen, ""],
  ["", "", "", "", "", wPawn, wPawn, wPawn],
  ["", "", "", "", "", "", wKing, ""],
];
const board6 = [
  ["", "", "", "", "", "", "", ""],
  ["", "", "", bKing, "", "", "", ""],
  ["", wKing, "", bPawn, "", "", "", ""],
  ["", "", "", "", wPawn, "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
];
// Add more boards if needed...

const highlight1 = [
  [1, 4],
  [1, 6],
  [2, 3],
  [2, 7],
];
const highlight2 = [[2, 4]];
const highlight3 = [[1, 2]];
const highlight4 = [[5, 4]];
const highlight5 = [
  [1, 6],
  [2, 3],
];
const highlight6 = [[2, 3]];

const highlights = [
  highlight1,
  highlight2,
  highlight3,
  highlight4,
  highlight5,
  highlight6,
];

const highlightPieces = [
  [3, 5],
  [3, 5],
  [5, 2],
  [3, 4],
  [5, 6],
  [3, 4],
];

const tacticgHeading = [
  "FORK",
  "PIN",
  "SKEWER",
  "DISCOVERED ATTACK",
  "DOUBLE CHECK",
  "OPPOSITION",
];

const Tacticspage = () => {
  const navigate = useNavigate();
  const [selectedBoardIndex, setSelectedBoardIndex] = useState(null);

  const boards = [board1, board2, board3, board4, board5, board6];
  // about content
  const content1 = [
    [
      "A single piece attacks two or more enemy pieces simultaneously. Knights are especially effective at executing forks.",
    ],
    [
      "Knights are great at forking because of their L-shaped jump. They often fork the king and queen or king and rook.",
    ],
    [
      "A successful fork usually threatens high-value pieces (like a queen or rook) or creates check.",
    ],
  ];
  const content2 = [
    [
      "An attacked piece cannot move without exposing a more valuable piece behind it. For example, a bishop pinning a knight to the queen.",
    ],
    [
      "A pin involves your piece (attacker), the pinned piece, and a more valuable piece behind it.",
    ],
    [
      "Bishops, rooks, and queens can deliver pins because they move in straight lines.",
    ],
  ];
  const content3 = [
    [
      "Similar to a pin, but the more valuable piece is in front and must move, exposing a less valuable piece behind it",
    ],
    [
      "Most effective skewers attack the king or queen, forcing them to move and leave a less valuable piece behind (like a rook or bishop).",
    ],
    [
      "Skewers force the opponent to respond to a direct threat, often allowing you to gain material.",
    ],
  ];
  const content4 = [
    [
      "A discovered attack occurs when one piece moves, revealing an attack by another piece behind it. The opponent often cannot defend against both the moving piece and the revealed threat.",
    ],
    [
      "The tactic is especially dangerous when the moving piece also delivers a threat (e.g., a check or capture), making it hard for the opponent to defend against both threats simultaneously.",
    ],
  ];
  const content5 = [
    [
      "A double check occurs when a single move results in two pieces simultaneously checking the king—usually by uncovering a discovered check while the moving piece also gives check.",
    ],
    [
      "In a double check, the only legal response is for the king to move. Capturing or blocking one of the checking pieces isn’t enough, since two separate threats are being delivered at once.",
    ],
  ];
  const content6 = [
    [
      "Opposition occurs when two kings face each other on the same rank, file, or diagonal with one square in between. The player not having to move holds the opposition, controlling key squares.",
    ],
    [
      "Opposition is crucial in king and pawn endgames. Gaining the opposition can force the opposing king to give ground, allowing your king to advance and support pawn promotion.",
    ],
  ];
  const content = [content1, content2, content3, content4, content5, content6];

  return (
    <div
      className="bg-black/50  bg-cover bg-center h-[250vh]"
      style={{ backgroundImage: `url(${chessbgimg})` }}
    >
      <div className="bg-[#5b646d]/50 h-[250vh]">
        {/* header */}
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
            className="w-[130px]  rounded-[10px] bg-[#096B68] text-[#F2F2F2] font-[500]   mb-3 h-[45px] right"
            style={{ borderRadius: "10px",marginTop:"30px" }}
            onClick={() => navigate("/")}
          >
            Back to Home
          </button>
        </div>

        <div class="flex flex-row mt-[20px] items-center justify-center gap-4">
          {/* <hr class="w-[28vw] border-[#EAE4D5]" style={{ color: "#fff" }} /> */}
          <p class="whitespace-nowrap text-justify text-[#F2F2F2] font-[800] text-[30px]"
          style={{fontFamily:"Anton sans-serif"}}>
            {" "}
            Know More About Some Chess Tactics Here
          </p>
          {/* <hr class="w-[28vw]  " style={{ color: "#fff" }} /> */}
        </div>

       

        {/* boardcontainer */}
        <div className="h-[1550px] border-[1px] border-[#EAE4D5] rounded-[10px] pt-5 ml-[5vw] pl-[10px] pt-2 mr-[5vw] bg-[#dae2e6]/20 p-1 mt-4 flex flex-wrap justify-evenly ">
          {boards.map((board, index) => (
            <div
              key={index}
              onClick={() => setSelectedBoardIndex(index)} // set clicked board index here
              className="cursor-pointer"
            >
              <Chessboardpagefortatics
                boardData={board}
                contentData={content[index]}
                highlightSquares={highlights[index]}
                highlightPiece={highlightPieces[index]}
                tacticgHeading={tacticgHeading[index]}
                hideLineAfter={(index + 1) % 3 === 0}
              />
            </div>
          ))}

          {selectedBoardIndex !== null && (
            <div
              className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedBoardIndex(null)} // clicking outside closes popup
            >
              <div
                className="bg-white/20 rounded-lg shadow-lg max-w-[90vw] max-h-[90vh] overflow-auto p-6 relative"
                onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside popup
              >
                <button
                  className="absolute top-3 border-0 rounded-[10px] right-3 text-black bg-white w-[90px] h-[30px] font-bold text-2xl"
                  onClick={() => setSelectedBoardIndex(null)}
                  style={{borderRadius:"10px"}}
                  aria-label="Close"
                >
                  Close
                </button>
                <Chessboardpagefortatics
                  boardData={boards[selectedBoardIndex]}
                   contentData={content[selectedBoardIndex]}
                  highlightSquares={highlights[selectedBoardIndex]}
                  highlightPiece={highlightPieces[selectedBoardIndex]}
                  tacticgHeading={tacticgHeading[selectedBoardIndex]}
                  hideLineAfter={true}
                />

                <div className="flex justify-between w-full mt-6">
                  <button
                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded disabled:opacity-50"
                    onClick={() => setSelectedBoardIndex((prev) => prev - 1)}
                   disabled={selectedBoardIndex === 0}
                  >
                  Previous
                  </button>

                  <button
                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded disabled:opacity-50"
                    onClick={() => setSelectedBoardIndex((prev) => prev + 1)}
                    disabled={selectedBoardIndex === boards.length - 1}
                  >
                    Next 
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Tacticspage;
