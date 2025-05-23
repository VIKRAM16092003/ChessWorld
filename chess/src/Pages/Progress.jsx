import { Link } from "react-router-dom";
import featureImg from "../assets/puzzle.jpg"; // Use a more relevant image if available

const features = [
  {
    ref: "Progress",
    title: "Personalized Reports",
    desc: "Get detailed game analysis and insights to improve your play.",
  },
  {
    ref: "SuggestedPuzzles",
    title: "Suggested Puzzles",
    desc: "Practice with curated chess puzzles tailored for your skill level.",
  },
  {
    ref: "Reminder",
    title: "Opening Recommender",
    desc: "Receive opening strategy suggestions based on your games.",
  },
  {
    ref: "Tracker",
    title: "Progress Tracker",
    desc: "Monitor your improvement over time with intuitive charts.",
  },
];

function Features() {
  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-8">
      <div className="flex justify-end mb-10">
        <Link to="/">
          <button className="bg-black text-white px-5 py-2 rounded w-[150px] hover:bg-red-800 transition">
            ← Back
          </button>
        </Link>
      </div>

      <div className="text-center mb-12">
        <h2 className="text-5xl font-extrabold text-white bg-black/80 inline-block px-6 py-2 rounded mb-2">
          Features
        </h2>
        <p className="text-lg text-gray-700 font-medium">
          Tools to help you grow as a chess player
        </p>
      </div>

      <div className="grid gap-10 grid-cols-1 md:grid-cols-2 max-w-6xl mx-auto">
        {features.map(({ ref, title, desc }, idx) => (
          <Link
            to={`/${ref}`}
            key={idx}
            className="group bg-white rounded-3xl overflow-hidden shadow hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 flex flex-col sm:flex-row"
          >
            <div className="w-full sm:w-1/3 h-44 sm:h-auto">
              <img
                src={featureImg}
                alt={title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-6 flex flex-col justify-center sm:w-2/3 text-left">
              <h3 className="text-2xl font-bold text-indigo-800 mb-2">{title}</h3>
              <p className="text-gray-700">{desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default Features;
