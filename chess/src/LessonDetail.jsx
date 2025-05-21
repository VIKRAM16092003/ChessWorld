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
      <div className="bg-indigo-100 p-5">
        <h2>Lesson not found</h2>
        <button className="btn btn-outline-dark" onClick={() => navigate("/lesson")}>
          Back to Lessons
        </button>
      </div>
    );
  }

  return (
    <motion.div
      className="bg-indigo-100 p-5 min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <button className="btn btn-outline-dark mb-3" onClick={() => navigate("/lesson")}>
        ← Back to Lessons
      </button>

      <motion.h2 className="text-shadow-2xs" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
        {lesson.title}
      </motion.h2>

      <div className="flex flex-col lg:flex-row mt-4 gap-6">
        {/* Left content */}
        <motion.pre
          className="bg-gray-100 p-4 rounded-lg lg:w-1/2 w-full h5"
          style={{ whiteSpace: "pre-wrap" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          {lesson.content}
           {lesson.moves && lesson.moves.length > 0 && (
  <div>
    <h3 className="font-semibold mb-3">Moves</h3>
    <ol className="list-decimal list-inside">
      {lesson.moves.map((move, index) => (
        <li
  key={index}
  className="mb-2 p-2 border border-gray-300 rounded bg-white shadow-sm"
>
  {move}
</li>

      ))}
    </ol>
  </div>
)}
        </motion.pre>
        
        

        {/* Right chessboard */}
        <motion.div
          className="lg:w-1/2 w-full flex justify-center items-start"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          
          <div className="mb-5">
            <h4 className="text-center pt-3 text-shadow-lg">Visual Movements</h4>
            <Chessboard position={fen} arePiecesDraggable={false} boardWidth={400} />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default LessonDetail;
