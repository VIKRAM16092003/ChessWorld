import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";

const lessons = [
  {
    id: 1,
    title: "Basic Opening Principles",
    content: `
- Control the center with pawns (e4, d4).
- Develop knights and bishops early.
- Castle early to safeguard your king.
- Avoid moving the same piece multiple times in the opening.
    `,
    moves: ["e4", "e5", "Nf3", "Nc6", "Bc4", "Bc5", "c3", "Nf6", "d4", "exd4", "cxd4", "Bb4+", "Nc3", "O-O"]
  },
  {
    id: 3,
    title: "Forks and Pins",
    content: `
- Forks: Using one piece to attack two.
- Pins: A piece can’t move without exposing a higher-value piece or the king.
    `,
    moves: ["e4", "e5", "Nf3", "Nc6", "d4", "exd4", "Nxd4", "Nf6", "Nc3", "Bb4", "e5", "Nxe5", "Qe2"]
  },
  {
    id: 4,
    title: "Opening Principles",
    content: `
The opening is the first stage of a chess game.
Key principles include:
- Control the center (especially with pawns like e4 and d4)
- Develop minor pieces (knights and bishops) early
- Don’t move the same piece twice unnecessarily
- Don’t bring out your queen too early
- Castle early to safeguard your king
    `,
    moves: ["e4", "e5", "Nf3", "Nc6", "Bc4", "Nf6", "O-O", "Be7"]
  },
  {
    id: 5,
    title: "Middle Game Tactics",
    content: `
The middle game begins once development is complete.
Focus on:
- Tactical patterns: forks, pins, skewers, discoveries
- Piece coordination and activity
- Attacking weak pawns or king positions
- Sacrifices to gain positional or tactical advantage
    `,
    moves: ["e4", "e5", "Nf3", "Nc6", "Bc4", "Bc5", "c3", "Nf6", "d4", "exd4", "cxd4", "Bb4+", "Nc3", "Nxe4"]
  },
  {
    id: 8,
    title: "Pawn Structures",
    content: `
Pawn structure defines the strategic landscape.
Important ideas include:
- Isolated pawns can be weak or strong
- Doubled pawns may limit mobility
- Passed pawns are powerful in endgames
- Pawn breaks can open lines or destroy the opponent's structure
    `,
    moves: ["d4", "d5", "c4", "e6", "Nc3", "Nf6", "cxd5", "exd5", "Bg5"]
  },
  {
    id: 9,
    title: "Attacking the King",
    content: `
A successful attack requires preparation and precision:
- Open lines (files, diagonals) toward the enemy king
- Coordinate major and minor pieces
- Exploit weaknesses in the pawn shield
- Use sacrifices to open the king’s position

Calculated aggression often leads to decisive victories.
    `,
    moves: ["e4", "e5", "Nf3", "Nc6", "Bc4", "Bc5", "b4", "Bxb4", "c3", "Ba5", "d4", "exd4", "O-O", "dxc3", "Qb3"]
  }
];

function LessonDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const lesson = lessons.find((l) => l.id === parseInt(id));
  const [fen, setFen] = useState("start");
  const [chess] = useState(new Chess());

  useEffect(() => {
    if (!lesson) return;
    chess.reset();
    if (lesson.moves) {
      let i = 0;
      const interval = setInterval(() => {
        if (i < lesson.moves.length) {
          chess.move(lesson.moves[i]);
          setFen(chess.fen());
          i++;
        } else {
          clearInterval(interval);
        }
      }, 1500);
      return () => clearInterval(interval);
    } else {
      chess.reset();
      setFen(chess.fen());
    }
  }, [lesson, chess]);

  if (!lesson) {
    return (
      <div className="lesson-container">
        <h2 className="not-found-title">Lesson not found</h2>
        <button className="btn" onClick={() => navigate("/lesson")}>
          ← Back to Lessons
        </button>
      </div>
    );
  }

  return (
    <>
      <style>{`
        .lesson-container {
          background: url('../src/assets/chessbgimg.jpg') no-repeat center center;
          background-size: cover;
          padding: 2rem;
          min-height: 100vh;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        .lesson-title {
          font-size: 2.5rem;
          font-weight: 800;
          color: #fff;
          margin-bottom: 1.5rem;
          text-shadow: 2px 2px 5px #000;
        }

        .lesson-content {
          background: rgba(255, 255, 255, 0.85);
          border-radius: 1rem;
          padding: 2rem;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
          color: #1e293b;
          font-size: 1.1rem;
          line-height: 1.75;
          white-space: pre-wrap;
        }

        .lesson-content h3 {
          font-size: 1.4rem;
          color: #1d4ed8;
          margin-bottom: 1rem;
        }

        .moves-list {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(110px, 1fr));
          gap: 0.5rem;
          margin-top: 1rem;
          padding-left: 1rem;
        }

        .moves-list li {
          background: #f1f5f9;
          padding: 0.4rem 0.75rem;
          border-radius: 0.5rem;
          font-weight: 500;
          color: #0f172a;
        }

        .chessboard-container {
          background: rgba(255, 255, 255, 0.85);
          border-radius: 1rem;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
          padding: 2rem;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .chessboard-title {
          color: #7c3aed;
          font-size: 1.75rem;
          font-weight: 700;
          margin-bottom: 1rem;
          text-shadow: 1px 1px 2px #e9d5ff;
        }

        
        .lesson-section {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        @media (min-width: 1024px) {
          .lesson-section {
            flex-direction: row;
          }
        }
      `}</style>

      <motion.div
        className="lesson-container bg-transparent"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <button className="btn btn-dark mb-4" onClick={() => navigate("/lesson")}>
          ← Back to Lessons
        </button>
        <div className="flex items-center bg-transparent justify-center gap-4"><div className="flex-1 h-px bg-transparent opacity-50"></div>  
        <motion.h2
          className="lesson-title mb-5 "
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {lesson.title}
        </motion.h2>
        <div className="flex-1 h-px bg-transparent opacity-50"></div>  </div>
        

        <div className="lesson-section bg-transparent">
          <motion.pre
            className="lesson-content bg-transparent"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h3>CONTENT</h3>
            <div className="text-white">
            {lesson.content}</div>

            {lesson.moves && (
              <>
                <h3>MOVES</h3>
                <ol className="moves-list">
                  {lesson.moves.map((move, index) => (
                    <li key={index}>{move}</li>
                  ))}
                </ol>
              </>
            )}
          </motion.pre>

          <motion.div
            className="chessboard-container bg-transparent"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <h1 className="chessboard-title">Visual Movements</h1>
            <Chessboard 
              position={fen}
              arePiecesDraggable={false}
              boardWidth={600}
              customBoardStyle={{
                borderRadius: "10px",
                boxShadow: "0 4px 16px rgba(0,0,0,0.25)"
              }}
              customDarkSquareStyle={{
  backgroundColor: "#b58863", // Brown
}}
customLightSquareStyle={{
  backgroundColor: "#f0d9b5", // Beige
}}

            />
          </motion.div>
        </div>
      </motion.div>
    </>
  );
}

export default LessonDetail;
