import React from "react";
import { useNavigate } from "react-router-dom";

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
    <div
      className="min-h-screen px-6 py-5 bg-cover bg-center"
      style={{ backgroundImage: `url('src/assets/chessbgimg.jpg')` }} // Replace with your actual image path
    >
      <div className="max-w-7xl mx-3">
        {/* Back Button */}
        <button
          className="btn btn-dark flex items-center gap-2 text-white bg-black/70 hover:bg-black/90 px-4 py-2 rounded"
          onClick={() => navigate("/play")}
        >
          ← Back to Play
        </button>

        {/* Header */}
        <div className="ps-5 ms-5">
          <center>
             <div className="flex items-center justify-center gap-4"><div className="flex-1 h-px bg-white opacity-50"></div>  
            <h2 className="mb-4 text-4xl fw-bold  text-dark drop-shadow-lg">
              ♟️ Chess Lessons
            </h2>
            <div className="flex-1 h-px bg-white opacity-50"></div> 
            </div>

            {/* Lesson Cards Grid */}
            <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
              {lessons.map((lesson) => (
                <div
                  key={lesson.id}
                  className="bg-white/60 backdrop-blur-md rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 p-6 flex flex-col justify-between border border-white/40"
                >
                  <div>
                    <h3 className="text-xl fw-bold text-indigo-900 mb-2">{lesson.title}</h3>
                    <p className="text-shadow text-dark fw-bold">{lesson.description}</p>
                  </div>
                  <button
                    onClick={() => handleStartLesson(lesson.id)}
                    className="mt-6 font-bold   btn btn-dark py-2 px-4 rounded-lg transition duration-300"
                  >
                    Start Lesson
                  </button>
                </div>
              ))}
            </div>
          </center>
        </div>
      </div>
    </div>
  );
}

export default Lesson;
