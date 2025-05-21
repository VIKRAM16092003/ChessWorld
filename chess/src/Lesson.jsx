import React from "react";
import { useNavigate } from "react-router-dom";
// import "./Lesson.css"; // optional for styling

const lessons = [
  {
    id: 1,
    title: "Basic Opening Principles",
    description: "Learn how to control the center, develop your pieces, and protect your king.",
  },
  {
    id: 2,
    title: "Checkmates in One",
    description: "Identify positions where you can checkmate in a single move.",
  },
  {
    id: 3,
    title: "Forks and Pins",
    description: "Understand key tactical ideas to win material using forks and pins.",
  },
  { id: 4, title: "Opening Principles", description: "Learn the fundamentals of chess openings." },
  { id: 5, title: "Middle Game Tactics", description: "Improve your tactical skills in the middle game." },
  { id: 6, title: "Endgame Strategies", description: "Master the essential endgame techniques." },
  { id: 7, title: "Checkmate Patterns", description: "Common patterns to finish the game effectively." },
  { id: 8, title: "Pawn Structures", description: "Understand how pawn formations impact the game." },
  { id: 9, title: "Attacking the King", description: "Learn how to launch a successful attack." },
];

function Lesson() {
  const navigate = useNavigate();

  const handleStartLesson = (lessonId) => {
    // For now, this could navigate to a static lesson page or open a modal
    navigate(`/lesson/${lessonId}`);
  };

  return (
    <div className="lesson-page" style={{ padding: "2rem" }}>
      <h2 style={{ textAlign: "center", marginBottom: "2rem" }}>Chess Lessons</h2>
      <div className="lesson-grid" style={{ display: "flex", flexWrap: "wrap", gap: "20px", justifyContent: "center" }}>
        {lessons.map((lesson) => (
          <div
            key={lesson.id}
            className="lesson-card"
            style={{
              border: "1px solid #ccc",
              borderRadius: "12px",
              padding: "20px",
              width: "300px",
              background: "#fff",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)"
            }}
          >
            <h4>{lesson.title}</h4>
            <p>{lesson.description}</p>
            <button className="btn btn-primary" onClick={() => handleStartLesson(lesson.id)}>
              Start Lesson
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Lesson;
