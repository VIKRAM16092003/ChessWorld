import React, { useState } from "react";
import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";
import { toast } from "sonner";

const defaultPGN = `[Event "Casual Game"]
[Site "Local"]
[Date "2025.05.20"]
[Round "-"]
[White "Player1"]
[Black "Player2"]
[Result "*"]

1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 *`;

const Analyse = () => {
  const [game, setGame] = useState(new Chess());
  const [moveIndex, setMoveIndex] = useState(0);
  const [moves, setMoves] = useState([]);
  const [pgnInput, setPgnInput] = useState(defaultPGN);

  const handleLoadPGN = () => {
    const newGame = new Chess();
    const loadSuccess = newGame.loadPgn(pgnInput.trim());

    if (!loadSuccess) {
      toast.error("Invalid PGN!");
      return;
    }

    const allMoves = newGame.history();
    newGame.reset();

    setGame(newGame);
    setMoveIndex(0);
    setMoves(allMoves);
    toast.success("PGN loaded successfully!");
  };

  const handleNextMove = () => {
    if (moveIndex < moves.length) {
      game.move(moves[moveIndex]);
      setGame(new Chess(game.fen()));
      setMoveIndex(moveIndex + 1);
    }
  };

  const handlePrevMove = () => {
    if (moveIndex > 0) {
      game.reset();
      for (let i = 0; i < moveIndex - 1; i++) {
        game.move(moves[i]);
      }
      setGame(new Chess(game.fen()));
      setMoveIndex(moveIndex - 1);
    }
  };

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h2>Game Analysis</h2>

      <textarea
        value={pgnInput}
        onChange={(e) => setPgnInput(e.target.value)}
        placeholder="Paste PGN here..."
        rows={10}
        style={{
          width: "100%",
          marginBottom: "1rem",
          padding: "1rem",
          borderRadius: "8px",
          fontFamily: "monospace",
          whiteSpace: "pre-wrap",
        }}
      />

      <button onClick={handleLoadPGN} className="btn btn-primary mb-3">
        Load PGN
      </button>

      <div style={{ display: "flex", justifyContent: "center", marginBottom: "1rem" }}>
        <button className="btn btn-secondary me-2" onClick={handlePrevMove} disabled={moveIndex === 0}>
          ← Previous
        </button>
        <button className="btn btn-secondary" onClick={handleNextMove} disabled={moveIndex >= moves.length}>
          Next →
        </button>
      </div>

      <Chessboard
        position={game.fen()}
        arePiecesDraggable={false}
        boardWidth={500}
        customBoardStyle={{
          boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
          borderRadius: "8px",
        }}
      />

      <p style={{ marginTop: "1rem" }}>
        Move {moveIndex} of {moves.length}
      </p>
    </div>
  );
};

export default Analyse;
