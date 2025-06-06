import React, { useState } from "react";
import Chessboardpagefortatics from "./Chessboardpagefortatics";
import chessbgimg from "../assets/chessbgimg.jpg";
import logo from "../assets/logo.jpg";
import { Link, useNavigate } from "react-router-dom";



const Tacticspage = () => {
  const navigate = useNavigate();
  const [selectedBoardIndex, setSelectedBoardIndex] = useState(null);

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed"
      style={{ backgroundImage: `url(${chessbgimg})` }}
    >
      <div className="bg-[#5b646d]/80 min-h-screen pb-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center px-4 md:px-8 py-4">
          <Link 
            to="/" 
            className="flex items-center space-x-3 text-white font-semibold mb-4 md:mb-0"
          >
            <img 
              src={logo} 
              alt="Logo" 
              className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover" 
            />
            <p className="text-xl md:text-2xl font-bold text-white">
              CHESS <span className="font-light">WORLD</span>
            </p>
          </Link>
          <button
            className="w-full md:w-auto px-6 py-2 rounded-lg bg-green-700 hover:bg-green-800 text-white font-medium transition-colors"
            onClick={() => navigate("/")}
          >
            Back to Home
          </button>
        </div>

        {/* Main Title */}
        <div className="flex justify-center my-6">
          <h1 className="text-center bg-white/30 backdrop-blur-sm shadow-lg rounded-xl px-8 py-3 max-w-md md:max-w-lg text-xl md:text-2xl font-bold text-white">
            CHESS TACTICS TRAINER
          </h1>
        </div>

        {/* Boards Grid */}
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {boards.map((board, index) => (
              <div 
                key={index} 
                onClick={() => setSelectedBoardIndex(index)}
                className="cursor-pointer transition-transform hover:scale-105"
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
          </div>
        </div>

        {/* Modal */}
        {selectedBoardIndex !== null && (
          <div
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedBoardIndex(null)}
          >
            <div
              className="bg-white/20 backdrop-blur-sm rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-auto p-6 relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-4 right-4 bg-white/90 hover:bg-white text-black font-bold px-4 py-2 rounded-lg transition-colors"
                onClick={() => setSelectedBoardIndex(null)}
              >
                ✕ Close
              </button>
              
              <Chessboardpagefortatics
                boardData={boards[selectedBoardIndex]}
                contentData={content[selectedBoardIndex]}
                highlightSquares={highlights[selectedBoardIndex]}
                highlightPiece={highlightPieces[selectedBoardIndex]}
                tacticgHeading={tacticgHeading[selectedBoardIndex]}
                hideLineAfter={true}
                isModal={true}
              />
              
              <div className="flex justify-between mt-6 space-x-4">
                <button
                  className={`flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-lg font-medium transition-colors ${
                    selectedBoardIndex === 0 ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  onClick={() => setSelectedBoardIndex((prev) => Math.max(0, prev - 1))}
                  disabled={selectedBoardIndex === 0}
                >
                  ← Previous
                </button>
                <button
                  className={`flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-lg font-medium transition-colors ${
                    selectedBoardIndex === boards.length - 1 ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  onClick={() => setSelectedBoardIndex((prev) => Math.min(boards.length - 1, prev + 1))}
                  disabled={selectedBoardIndex === boards.length - 1}
                >
                  Next →
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Tacticspage;