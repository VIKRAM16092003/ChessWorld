import React from "react";
import { useParams, useNavigate } from "react-router-dom";

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
  },
  {
    id: 2,
    title: "Checkmates in One",
    content: `
      - Look for loose kings.
      - Practice common patterns: back-rank mate, queen + support, and knight forks.
    `,
  },
  {
    id: 3,
    title: "Forks and Pins",
    content: `
      - Forks: Using one piece to attack two.
      - Pins: A piece can’t move without exposing a higher-value piece or the king.
    `,
  },
  {id:4,
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
  },
    {id:5,

    title: "Middle Game Tactics",
    content: `
      The middle game begins once development is complete.
      Focus on:
      - Tactical patterns: forks, pins, skewers, discoveries
      - Piece coordination and activity
      - Attacking weak pawns or king positions
      - Sacrifices to gain positional or tactical advantage
    `,
  },
   {id:6,

    title: "Endgame Strategies",
    content: `
      Endgames are where few pieces remain. Essential concepts:
      - King activity is crucial: bring your king into the fight
      - Master basic mates (king + queen/rook vs king)
      - Understand opposition in king-pawn endings
      - Use passed pawns effectively
    `,
  },
    {id:7,

    title: "Checkmate Patterns",
    content: `
      Learn and recognize common checkmate techniques:
      - Back rank mate: rook/queen mates king trapped by its own pawns
      - Smothered mate: knight mates king trapped by own pieces
      - Anastasia's Mate, Arabian Mate, and more
      Practicing these will help finish games more confidently.
    `,
  },
   {id:8,

    title: "Pawn Structures",
    content: `
      Pawn structure defines the strategic landscape.
      Important ideas include:
      - Isolated pawns can be weak or strong
      - Doubled pawns may limit mobility
      - Passed pawns are powerful in endgames
      - Pawn breaks can open lines or destroy the opponent's structure
    `,
  },
    {id:9,

    title: "Attacking the King",
    content: `
      A successful attack requires preparation and precision:
      - Open lines (files, diagonals) toward the enemy king
      - Coordinate major and minor pieces
      - Exploit weaknesses in the pawn shield
      - Use sacrifices to open the king’s position
      Calculated aggression often leads to decisive victories.
    `,
  },
];

function LessonDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const lesson = lessons.find((l) => l.id === parseInt(id));

  if (!lesson) {
    return (
      <div style={{ padding: "2rem" }}>
        <h2>Lesson not found</h2>
        <button className="btn btn-outline-dark" onClick={() => navigate("/lesson")}>
          Back to Lessons
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: "2rem" }}>
      <button className="btn btn-outline-dark mb-3" onClick={() => navigate("/lesson")}>
        ← Back to Lessons
      </button>
      <h2>{lesson.title}</h2>
      <pre style={{
        whiteSpace: "pre-wrap",
        background: "#f4f4f4",
        padding: "1rem",
        borderRadius: "8px",
        marginTop: "1rem"
      }}>
        {lesson.content}
      </pre>
    </div>
  );
}

export default LessonDetail;
