import React from 'react';
import { Users, TrendingUp, Target } from 'lucide-react';
import chesshomeimg from "../assets/chessbgimg.jpg";

const About = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-fixed bg-center py-16 px-6 text-white"
      style={{ backgroundImage: `url(${chesshomeimg})` }}
    >
      <div className="max-w-5xl mx-auto bg-gradient-to-br from-black/70 via-gray-900/80 to-gray-800/70 rounded-3xl shadow-2xl p-10">
        <h2 className="text-5xl font-extrabold text-center mb-10 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-white">
          About ChessWorld
        </h2>

        <div className="bg-white/10 backdrop-blur-lg p-6 rounded-xl shadow-md mb-10 text-lg leading-relaxed space-y-6 text-white text-justify">
          <p>
            <strong className="text-yellow-300">ChessWorld</strong> is a cutting-edge platform tailored for chess enthusiasts of all levels. Whether you're just starting out or preparing for competitive tournaments, ChessWorld offers a robust suite of tools designed to take your game to the next level.
          </p>
          <p>
            With a focus on interactive learning and intelligent recommendations, we combine technology with chess expertise to help you understand your strengths, work on your weaknesses, and enjoy the journey of improvement.
          </p>
          <p>
            Join a global community of players and start your journey today with <strong className="text-yellow-400">ChessWorld</strong> — where strategy meets innovation.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="bg-gradient-to-br from-gray-800 to-black/80 rounded-xl p-6 shadow hover:shadow-2xl transition duration-300">
            <Users className="mx-auto text-yellow-400 w-10 h-10 mb-3" />
            <h4 className="text-xl font-semibold mb-2 text-white">Community Driven</h4>
            <p className="text-white/80">
              Connect with players worldwide, share insights, and grow together.
            </p>
          </div>
          <div className="bg-gradient-to-br from-gray-800 to-black/80 rounded-xl p-6 shadow hover:shadow-2xl transition duration-300">
            <TrendingUp className="mx-auto text-green-400 w-10 h-10 mb-3" />
            <h4 className="text-xl font-semibold mb-2 text-white">Personal Growth</h4>
            <p className="text-white/80">
              Improve with targeted reports, training modules, and puzzle challenges.
            </p>
          </div>
          <div className="bg-gradient-to-br from-gray-800 to-black/80 rounded-xl p-6 shadow hover:shadow-2xl transition duration-300">
            <Target className="mx-auto text-red-400 w-10 h-10 mb-3" />
            <h4 className="text-xl font-semibold mb-2 text-white">Goal Oriented</h4>
            <p className="text-white/80">
              Set your objectives, track your rating, and achieve mastery over time.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
