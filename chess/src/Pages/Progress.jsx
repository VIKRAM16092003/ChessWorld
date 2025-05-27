import { Link } from "react-router-dom";
import {
  BarChart3,
  BrainCircuit,
  Puzzle,
  Compass
} from "lucide-react";
import chesshomeimg from "../assets/chessbgimg.jpg";

const features = [
  {
    icon: <BarChart3 className="text-yellow-300" size={36} />,
    title: "Personalized Reports",
    desc: "Receive tailored game reports that highlight your strengths and uncover areas for improvement using advanced analytics.",
  },
  {
    icon: <Puzzle className="text-purple-300" size={36} />,
    title: "Suggested Puzzles",
    desc: "Sharpen your tactical vision with chess puzzles curated based on your recent gameplay and skill level.",
  },
  {
    icon: <Compass className="text-blue-300" size={36} />,
    title: "Opening Recommender",
    desc: "Explore new chess openings suited to your style and past games, helping you start every match strong.",
  },
  {
    icon: <BrainCircuit className="text-pink-300" size={36} />,
    title: "Progress Tracker",
    desc: "Track your chess journey through detailed performance trends, match history, and personalized insights.",
  },
];

function Features() {
  return (
    <section
      className="min-h-screen bg-cover bg-center bg-no-repeat py-20 px-6 flex items-start justify-center"
      style={{ backgroundImage: `url(${chesshomeimg})` }}
    >
      <div className="w-full max-w-6xl bg-black/60 backdrop-blur-md rounded-3xl shadow-2xl p-10 space-y-16 text-white">
        {/* Header */}
        <div className="text-center space-y-4">
          <h2 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-pink-300 to-blue-300 underline decoration-yellow-400 underline-offset-8">
            ChessWorld Features
          </h2>
          <p className="text-lg text-gray-200">
            Master the game with tools built for every level of play.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid gap-10 sm:grid-cols-2">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 space-y-4"
            >
              <div className="flex items-center gap-4">
                <div className="bg-white/10 p-3 rounded-full">{feature.icon}</div>
                <h3 className="text-2xl font-semibold text-white">
                  {feature.title}
                </h3>
              </div>
              <p className="text-gray-200">{feature.desc}</p>
            </div>
          ))}
        </div>

        {/* Back Button */}
        <div className="flex justify-center">
          <Link to="/">
            <button className="bg-white text-black px-6 py-3 rounded-lg hover:bg-red-700 hover:text-white transition font-semibold shadow">
              ← Back to Home
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Features;
