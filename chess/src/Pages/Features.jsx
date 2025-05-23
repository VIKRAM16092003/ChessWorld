import { Link } from "react-router-dom";
import chesshomeimg from "../assets/chessbgimg.jpg";

function Features() {
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
      desc: "Receive opening strategies suggestions based on your games.",
    },
    {
      ref: "Tracker",
      title: "Progress Tracker",
      desc: "Monitor your improvement over time with intuitive charts.",
    },
  ];

  return (
    <section
      className="min-h-screen py-12 px-6 text-black bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${chesshomeimg})`,
        backgroundAttachment: "fixed", 
      }}
    >
      {/* Back button */}
      <div className="flex justify-start mb-10">
        <Link to="/">
          <button className="bg-black/40 backdrop-blur-md text-white px-5 py-2 rounded w-[150px] hover:bg-black/60 transition">
  ← Back
</button>

        </Link>
      </div>

      {/* Heading with horizontal lines */}
      <div className="flex items-center justify-center mb-6">
        <div className="flex-grow h-px bg-gray-300"></div>
        <h2 className="mx-6 text-5xl font-extrabold text-white   px-6 py-1 rounded">
          <strong>Features</strong>
        </h2>
        <div className="flex-grow h-px bg-gray-300"></div>
      </div>

  

      {/* Transparent Card Grid */}
      <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 max-w-7xl mx-auto">
        {features.map(({ ref, title, desc }, idx) => (
  <Link
    to={`/${ref}`}
    key={idx}
    className="no-underline"
    style={{ textDecoration: "none" }}
  >
    <div className="bg-white/30 backdrop-blur-md border border-gray-300 rounded-3xl p-8 shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 min-h-[220px] flex flex-col justify-center items-center text-center">
      <h3 className="text-2xl font-bold text-white mb-3">{title}</h3>
      <p className="text-black/80 text-l">{desc}</p>
    </div>
  </Link>
))}

      </div>
    </section>
  );
}

export default Features;
