import feature from "../assets/features.png";
import opponent from "../assets/opponent.jpg";
import training from "../assets/training.png";
import tournaments from "../assets/tournaments.png";
import replay from "../assets/replay.jpg";
import ai from "../assets/ai.jpeg";
import { Link } from "react-router-dom";
import chesshomeimg from "../assets/chessbgimg.jpg";

export const PremiumPlan = () => (
  <div
    className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 relative text-gray-900 bg-cover bg-center bg-no-repeat"
    style={{
      backgroundImage: `url(${chesshomeimg})`,
      backgroundAttachment: "fixed",
    }}
  >
    {/* Dark overlay to match other plans */}
    <div className="absolute inset-0 bg-black/60 pointer-events-none"></div>

    {/* Back Button */}
    <div className="absolute top-4 right-4 z-20">
      <Link to="/pricing">
        <button className="bg-black text-white px-4 py-2 rounded hover:bg-red-800 transition">
          Back
        </button>
      </Link>
    </div><br/>

    <div className="relative z-10 max-w-6xl mx-auto">
      <center>
        <h2 className="text-4xl font-extrabold text-center mb-4 rounded text-white w-[260px] pt-[2px] pb-[2px]">
          PREMIUM PLAN
        </h2>
      </center>
      <p className="text-center text-lg mb-10 max-w-2xl mx-auto text-white/80">
        Perfect for competitive players seeking maximum insight, tools, and support.
      </p>

      <div className="bg-white/10 shadow-lg rounded-lg p-6 overflow-x-auto backdrop-blur-sm border border-gray-300">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-200 text-black text-lg">
              <th className="p-4 border border-gray-300 text-center">Feature Image</th>
              <th className="p-4 border border-gray-300 text-center">Feature Title</th>
              <th className="p-4 border border-gray-300 text-center">Description</th>
            </tr>
          </thead>
          <tbody className="text-black text-sm">
            {[
              {
                img: feature,
                title: "All Basic Features",
                desc: "Includes every feature from the Free and Basic plans, offering a complete foundation for players at all levels."
              },
              {
                img: ai,
                title: "AI-powered Coach Suggestions",
                desc: "Get personalized training tips and insights from an AI coach that analyzes your games and recommends areas to improve."
              },
              {
                img: replay,
                title: "Game Replay with Commentary",
                desc: "Rewatch your games with expert-style commentary highlighting tactical mistakes, brilliant moves, and learning opportunities."
              },
              {
                img: training,
                title: "Custom Training Routines",
                desc: "Build daily or weekly routines tailored to your weaknesses and goals, with practice puzzles, openings, and endgames."
              },
              {
                img: tournaments,
                title: "Premium-only Tournaments",
                desc: "Compete in exclusive tournaments with other Premium users, earn rewards, and track your competitive growth."
              },
              {
                img: opponent,
                title: "Personalized Opponent Prep",
                desc: "Study your next opponent's playing style and history with detailed analysis tools, helping you prepare strategically."
              },
            ].map(({ img, title, desc }, index) => (
              <tr key={index} className="">
                <td className="p-4 border border-gray-300">
                  <img src={img} alt={title} className="w-40 h-28 object-cover rounded" />
                </td>
                <td className="p-4 border border-gray-300 font-bold text-base text-white">{title}</td>
                <td className="p-4 border border-gray-300 text-white text-base">{desc}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-10 text-center">
          <button className="bg-white text-black px-6 py-2 rounded hover:bg-yellow-600 transition">
            Choose Premium Plan
          </button>
        </div>
      </div>
    </div>
  </div>
);
