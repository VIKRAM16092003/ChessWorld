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
    } else if (lesson.fen) {
      chess.load(lesson.fen);
      setFen(chess.fen());
    } else {
      chess.reset();
      setFen(chess.fen());
    }
  }, [lesson, chess]);

  if (!lesson) {
    return (
      <div className="lesson-container ">
        <h2 className="not-found-title">Lesson not found</h2>
        <button className="back-button" onClick={() => navigate("/lesson")}>
          ← Back to Lessons
        </button>
      </div>
    );
  }

  return (
    <>
      <style>
        {`
          .lesson-container {
            background-color: #eef2ff;
            padding: 2rem;
            min-height: 100vh;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          }

          .lesson-title {
            font-size: 2rem;
            font-weight: 700;
            color: #1e3a8a;
            margin-bottom: 1rem;
            text-shadow: 1px 1px 2px #ccc;
          }

          .lesson-content {
            background-color: #f9fafb;
            border-radius: 0.75rem;
            padding: 1.5rem;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            color: #065f46;
            font-size: 1rem;
            line-height: 1.6;
            white-space: pre-wrap;
          }

          .lesson-content h3 {
            font-size: 1.2rem;
            color: #dc2626;
            margin-bottom: 0.75rem;
            text-shadow: 1px 1px 2px #f5d0d0;
          }

          .moves-list {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
            gap: 0.5rem;
            list-style: decimal inside;
          }

          .moves-list li {
            background-color: #f3f4f6;
            padding: 0.5rem;
            border-radius: 0.5rem;
            transition: background 0.3s;
          }

          .moves-list li:hover {
            background-color: #e0e7ff;
            cursor: default;
          }

          .chessboard-container {
            display: flex;
            justify-content: center;
            align-items: flex-start;
            margin-top: 2rem;
            padding: 1rem;
          }

          .chessboard-title {
            color: #dc2626;
            text-align: center;
            font-size: 1.5rem;
            margin-bottom: 1rem;
            text-shadow: 1px 1px 2px #fcd5ce;
          }

          

          .not-found-title {
            font-size: 1.5rem;
            color: #dc2626;
            margin-bottom: 1rem;
          }
        `}
      </style>

      <motion.div
        className="lesson-container pt-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <button className="btn btn-dark" onClick={() => navigate("/lesson")}>
          ← Back to Lessons
        </button>

        <motion.h2
          className="lesson-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {lesson.title}
        </motion.h2>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left content */}
          <motion.pre
            className="lesson-content lg:w-1/2 w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <h3>CONTENT</h3>
            {lesson.content}

            {lesson.moves && lesson.moves.length > 0 && (
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

          {/* Right chessboard */}
          <motion.div
            className="chessboard-container lg:w-1/2 w-full"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <div>
              <h1 className="chessboard-title">Visual Movements</h1>
              <Chessboard
                position={fen}
                arePiecesDraggable={false}
                boardWidth={600}
                customBoardStyle={{
                  borderRadius: "8px",
                  boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
                }}
              />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
}

export default LessonDetail;
