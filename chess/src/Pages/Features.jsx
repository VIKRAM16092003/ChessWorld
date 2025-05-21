import { Link } from "react-router-dom";
import report from "../assets/report2.jpg";
import puzzle from "../assets/puzzle.jpg";
import opening from "../assets/recommender.jpeg";
import tracker from "../assets/tracker1.png";

function Features() {
  const features = [
    {
      img: report,
      alt: "Report",
      ref:"Progress",
      title: "Personalized Reports",
      desc: "Get detailed game analysis and insights to improve your play."
    },
    {
      img: puzzle,
      alt: "Puzzles",
      ref:"Puzzle",
      title: "Suggested Puzzles",
      desc: "Practice with curated chess puzzles tailored for your skill level."
    },
    {
      img: opening,
      alt: "Opening",
      ref:"Reminder",
      title: "Recommender",
      desc: "Receive opening strategies suggestions based on your games."
    },
    {
      img: tracker,
      alt: "Tracker",
      ref:"Tracker",
      title: "Progress Tracker",
      desc: "Monitor your improvement over time with intuitive charts."
    }
  ];

  return (
    <section className="text-center px-6 py-12 text-black bg-gray-50 min-h-screen">
      <div className="flex justify-end mb-8 mt-[-35px]">
        <Link to="/">
          <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-800 transition">
            Back
          </button>
        </Link>
      </div>

      <h2 className="bg-black text-white rounded inline-block mb-12 w-[15%] font-bold">
        FEATURES
      </h2>

      <div className="flex flex-wrap justify-center gap-10 ">
        {features.map(({ ref,alt, title, desc }, idx) => (
          <Link to={`/${ref}`} style={{ textDecoration: "none" }}>
          <div
            key={idx}
            className="bg-white rounded-xl shadow-lg p-6 w-72 flex flex-col items-center hover:shadow-xl hover:scale-105 transform transition duration-300"
          >
            <h3 className="text-xl font-semibold mb-2">{title}</h3>
            <p className="text-gray-700 text-center">{desc}</p>
          </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default Features;
