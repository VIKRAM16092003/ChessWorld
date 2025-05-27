import React, { useState } from "react";
import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function Analyse() {
  const navigate = useNavigate();
  const [chess] = useState(new Chess());
  const [fen, setFen] = useState(chess.fen());
  const [history, setHistory] = useState([]);
  const [currentMoveIndex, setCurrentMoveIndex] = useState(0);

  const onDrop = (sourceSquare, targetSquare) => {
    const move = chess.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: "q",
    });

    if (move === null) return false;

    const newHistory = chess.history();
    setHistory(newHistory);
    setCurrentMoveIndex(newHistory.length);
    setFen(chess.fen());
    return true;
  };

  const resetBoard = () => {
    chess.reset();
    setFen(chess.fen());
    setHistory([]);
    setCurrentMoveIndex(0);
  };

  const goBack = () => {
    if (currentMoveIndex > 0) {
      const newIndex = currentMoveIndex - 1;
      const temp = new Chess();
      for (let i = 0; i < newIndex; i++) {
        temp.move(history[i]);
      }
      chess.load(temp.fen());
      setFen(temp.fen());
      setCurrentMoveIndex(newIndex);
    }
  };

  const goForward = () => {
    if (currentMoveIndex < history.length) {
      const newIndex = currentMoveIndex + 1;
      const temp = new Chess();
      for (let i = 0; i < newIndex; i++) {
        temp.move(history[i]);
      }
      chess.load(temp.fen());
      setFen(chess.fen());
      setCurrentMoveIndex(newIndex);
    }
  };

  return (
    <>
      <style>{`
       .analyse-container {
  background-image: url('/src/assets/chessbgimg.jpg'); /* Make sure this path is correct */
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  padding: 2rem 1rem;
  min-height: 100vh;
  font-family: 'Inter', sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.back-button-wrapper {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  margin-bottom: 1rem;
}

.analyse-title {
  font-size: 2.75rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 2rem;
  text-align: center;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
}

.move-history {
  background-color: rgba(255, 255, 255, 0.2); /* Transparent white */
  padding: 1.25rem 1rem;
  border-radius: 1rem;
  backdrop-filter: blur(10px); /* Glassmorphism effect */
  -webkit-backdrop-filter: blur(10px);
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);
  max-width: 640px;
  width: 100%;
  margin-bottom: 1.75rem;
}

.move-history h3 {
  margin-bottom: 1rem;
  color: blue;
  font-size: 1.25rem;
  font-weight: 600;
  text-align: center;
}

.move-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(60px, 1fr));
  gap: 0.6rem;
}

.move-item {
  background: rgba(255, 255, 255, 0.5);
  padding: 0.5rem;
  border-radius: 8px;
  font-weight: 500;
  text-align: center;
  transition: all 0.3s ease;
}

.move-item.active {
  background-color: #facc15;
  color: #1f2937;
}

.controls {
  margin-bottom: 2rem;
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
}

.board-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}


@media (max-width: 600px) {
  .analyse-title {
    font-size: 2rem;
  }
}

      `}</style>

      <motion.div
        className="analyse-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="back-button-wrapper">
          <button className="btn btn-dark" onClick={() => navigate("/play")}>
            ← Back to Play
          </button>
        </div>

        <h1 className="analyse-title">Chess Game Analysis</h1>

        <div className="move-history">
  <h3>Move History</h3>
  <div className="move-list">
    {history.map((move, idx) => (
      <div
        key={idx}
        className={`move-item ${idx === currentMoveIndex - 1 ? "active" : ""}`}
      >
        {move}
      </div>
    ))}
  </div>
</div>


        <div className="controls">
          <button className="btn btn-success" onClick={goBack}>
            Previous
          </button>
          <button className="btn btn-success" onClick={goForward}>
            Next
          </button>
          <button className="btn btn-danger" onClick={resetBoard}>
            Reset
          </button>
        </div>

        <div className="board-wrapper bg-transparent">
          <div className="board-card">
            <Chessboard
              position={fen}
              onPieceDrop={onDrop}
              boardWidth={600}
              customDarkSquareStyle={{
  backgroundColor: "#b58863", // Brown
}}
customLightSquareStyle={{
  backgroundColor: "#f0d9b5", // Beige
}}

            />
          </div>
        </div>
      </motion.div>
    </>
  );
}

export default Analyse;
