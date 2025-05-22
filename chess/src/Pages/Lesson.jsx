import React from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const lessons = [
  {
    id: 1,
    title: "Basic Opening Principles",
    description: "Learn how to control the center, develop your pieces, and protect your king.",
  },
  {
    id: 3,
    title: "Forks and Pins",
    description: "Understand key tactical ideas to win material using forks and pins.",
  },
  { id: 4, title: "Opening Principles", description: "Learn the fundamentals of chess openings." },
  { id: 5, title: "Middle Game Tactics", description: "Improve your tactical skills in the middle game." },
  { id: 8, title: "Pawn Structures", description: "Understand how pawn formations impact the game." },
  { id: 9, title: "Attacking the King", description: "Learn how to launch a successful attack." },
];

function Lesson() {
  const navigate = useNavigate();

  const handleStartLesson = (lessonId) => {
    navigate(`/lesson/${lessonId}`);
  };

  return (
    <div className="bg-gradient-to-br from-indigo-100 via-white to-indigo-200 min-h-screen px-6 py-5">
      <div className="max-w-7xl mx-3 ">
        {/* Back Button */}
        <button
          className="btn flex items-center gap-2 text-white btn-dark"
          onClick={() => navigate("/play")}
        >
           ← Back to Play
        </button>

        {/* Header */}
        <h2 className="mb-4 text-4xl font-extrabold text-center text-indigo-800 drop-shadow-md">
          ♟️ Chess Lessons
        </h2>

        {/* Lesson Cards Grid */}
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {lessons.map((lesson) => (
            <div
              key={lesson.id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 p-6 flex flex-col justify-between border border-gray-200"
            >
              <div>
                <h3 className="text-xl font-semibold text-indigo-700 mb-2">{lesson.title}</h3>
                <p className="text-gray-600">{lesson.description}</p>
              </div>
              <button
                onClick={() => handleStartLesson(lesson.id)}
                className="mt-6 bg-indigo-600 hover:bg-indigo-800 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
              >
                Start Lesson
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Lesson;
