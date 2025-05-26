import { Link } from "react-router-dom";
import puzzleImg from "../assets/puzzle.jpg";
import chesshomeimg from "../assets/chessbgimg.jpg";

const puzzles = [
  {
    id: 1,
    title: "Fork Tactics",
    description: "Learn how to use forks effectively to win material.",
    img: puzzleImg,
    link: "/puzzles/fork-tactics",
  },
  {
    id: 2,
    title: "Pin and Skewer",
    description: "Practice pins and skewers to immobilize your opponent's pieces.",
    img: puzzleImg,
    link: "/puzzles/pin-skewer",
  },
  {
    id: 3,
    title: "Discovered Attacks",
    description: "Master the art of discovered attacks to surprise your opponent.",
    img: puzzleImg,
    link: "/puzzles/discovered-attacks",
  },
  {
    id: 4,
    title: "Checkmate Patterns",
    description: "Recognize common checkmate patterns to finish games quickly.",
    img: puzzleImg,
    link: "/puzzles/checkmate-patterns",
  },
];

const SuggestedPuzzles = () => {
  return (
    <section
      className="min-h-screen bg-cover bg-center bg-no-repeat py-14 px-6"
      style={{
        backgroundImage: `url(${chesshomeimg})`,
        backgroundAttachment: "fixed",
      }}
    >
      {/* Optional Back Button */}
      <div className="flex justify-start mb-10">
        <Link to="/">
          <button className="bg-white/10 border border-white text-white px-5 py-2 rounded w-[150px] hover:bg-red-800 transition">
            ← Back
          </button>
        </Link>
      </div>

      {/* Title Section */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-extrabold text-white mb-3">Suggested Puzzles</h1>
        
      </div>

      {/* Puzzle Cards Grid */}
      <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 max-w-7xl mx-auto">
        {puzzles.map(({ id, title, description, img, link }) => (
          <Link
            key={id}
            to={link}
            className="relative group rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition duration-300"
          >
            <img
              src={img}
              alt={title}
              className="w-full h-60 object-cover transform group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-all duration-300 flex flex-col justify-end p-5">
              <h2 className="text-2xl font-bold text-white mb-1">{title}</h2>
              <p className="text-gray-200 text-sm">{description}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default SuggestedPuzzles;
