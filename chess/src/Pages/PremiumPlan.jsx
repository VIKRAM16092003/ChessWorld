import feature from "../assets/features.png";
import opponent from "../assets/opponent.jpg";
import training from "../assets/training.png";
import tournaments from "../assets/tournaments.png";
import replay from "../assets/replay.jpg";
import ai from "../assets/ai.jpeg";
import { Link } from "react-router-dom";

export const PremiumPlan = () => (
  <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 text-gray-900 relative">
    
    {/* Back Button */}
    <div className="absolute top-4 right-4">
      <Link to="/pricing">
        <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-800 transition">
          Back
        </button>
      </Link>
    </div><br/>

    <div className="max-w-6xl mx-auto">
      <h2 className="text-4xl font-extrabold text-center mb-4 bg-black rounded text-white">PREMIUM PLAN</h2>
      <p className="text-center text-lg mb-10 max-w-2xl mx-auto text-gray-600">
        Perfect for competitive players seeking maximum insight, tools, and support.
      </p>

      <div className="bg-white/10 shadow-lg rounded-lg p-6 overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-200 text-black">
              <th className="p-4 border border-gray-300">Feature Image</th>
              <th className="p-4 border border-gray-300">Feature Title</th>
              <th className="p-4 border border-gray-300">Description</th>
            </tr>
          </thead>
          <tbody className="text-sm text-black">
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
              <tr key={index} className="hover:bg-gray-100 transition">
                <td className="p-4 border border-gray-300">
                  <img src={img} alt={title} className="w-40 h-28 object-cover rounded" />
                </td>
                <td className="p-4 border border-gray-300 font-semibold text-base">{title}</td>
                <td className="p-4 border border-gray-300 text-green-600 text-base">{desc}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-10 text-center">
          <button className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-yellow-600 transition">
            Choose Premium Plan
          </button>
        </div>
      </div>
    </div>
  </div>
);
