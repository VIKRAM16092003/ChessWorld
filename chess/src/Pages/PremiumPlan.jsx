import feature from "../assets/features.png";
import opponent from "../assets/opponent.jpg";
import training from "../assets/training.png";
import tournaments from "../assets/tournaments.png";
import replay from "../assets/replay.jpg";
import ai from "../assets/ai.jpeg";
import { Link } from "react-router-dom";

export const PremiumPlan = () => (
  <div className="min-h-screen bg-black py-12 px-4 sm:px-6 lg:px-8 text-gray-900 relative">
    
    {/* Back Button */}
    <div className="absolute top-4 right-4">
      <Link to="/">
      <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-800 transition">
        Back
      </button>
      </Link>
    </div>

    <div className="max-w-4xl mx-auto">
      <h2 className="text-4xl font-extrabold text-center mb-4" style={{ color: '#FFD700' }}>PREMIUM PLAN</h2>
      <p className="text-center text-lg mb-10 max-w-2xl mx-auto" style={{ color: 'grey' }}>
        Perfect for competitive players seeking maximum insight, tools, and support.
      </p>
      <div className="bg-white/10 shadow-lg rounded-lg p-8">
        <ul className="space-y-4 text-lg text-white">

          <li className="flex items-center space-x-6 mb-1px border-b">
            <img src={feature} alt="All Basic features" className="w-70 h-32 rounded-lg" />
            <p className="ml-[50px]"> All Basic features</p><br />
            <p className="text-green-600 ml-[20px]">
              Includes every feature from the Free and Basic plans, offering a complete foundation for players at all levels.
            </p>
          </li>

          <li className="flex items-center space-x-6 mb-1px border-b">
            <img src={ai} alt="AI-powered coach" className="w-70 h-32 rounded-lg" />
            <p className="ml-[50px]"> AI-powered coach suggestions</p><br />
            <p className="text-green-600 ml-[-30px]">
              Get personalized training tips and insights from an AI coach that analyzes your games and recommends areas to improve.
            </p>
          </li>

          <li className="flex items-center space-x-6 mb-1px border-b">
            <img src={replay} alt="Game replay" className="w-70 h-32 rounded-lg" />
            <p className="ml-[50px]"> Game replay with commentary</p><br />
            <p className="text-green-600 ml-[-30px]">
              Rewatch your games with expert-style commentary highlighting tactical mistakes, brilliant moves, and learning opportunities.
            </p>
          </li>

          <li className="flex items-center space-x-6 mb-1px border-b">
            <img src={training} alt="Custom training" className="w-70 h-32 rounded-lg" />
            <p className="ml-[60px]"> Custom training routines</p><br />
            <p className="text-green-600 ml-[-10px]">
              Build daily or weekly routines tailored to your weaknesses and goals, with practice puzzles, openings, and endgames.
            </p>
          </li>

          <li className="flex items-center space-x-6 mb-1px border-b">
            <img src={tournaments} alt="Premium tournaments" className="w-70 h-32 rounded-lg" />
            <p className="ml-[50px]"> Premium-only tournaments</p><br />
            <p className="text-green-600 ml-[-10px]">
              Compete in exclusive tournaments with other Premium users, earn rewards, and track your competitive growth.
            </p>
          </li>

          <li className="flex items-center space-x-6 mb-1px border-b">
            <img src={opponent} alt="Opponent prep" className="w-70 h-32 rounded-lg" />
            <p className="ml-[90px]"> Personalized opponent prep</p><br />
            <p className="text-green-600 ml-[-10px]">
              Study your next opponent's playing style and history with detailed analysis tools, helping you prepare strategically.
            </p>
          </li>

        </ul>
        <div className="mt-10 text-center">
          <button className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-yellow-600 transition">
            Choose Premium Plan
          </button>
        </div>
      </div>
    </div>
  </div>
);
