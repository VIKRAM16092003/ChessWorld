import React from 'react';
import { Users, TrendingUp, Target } from 'lucide-react';

const About = () => {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12 mt-10 bg-gradient-to-br from-white via-slate-50 to-gray-100 shadow-2xl rounded-3xl text-gray-800">
      <h2 className="text-5xl font-extrabold text-center mb-10 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-blue-600">
        About ChessWorld
      </h2>

      <div className="bg-white p-6 rounded-xl shadow-md mb-10 text-lg leading-relaxed space-y-6 text-justify">
        <p>
          <strong className="text-blue-600">ChessWorld</strong> is a cutting-edge platform tailored for chess enthusiasts of all levels. Whether you're just starting out or preparing for competitive tournaments, ChessWorld offers a robust suite of tools designed to take your game to the next level.
        </p>
        <p>
          With a focus on interactive learning and intelligent recommendations, we combine technology with chess expertise to help you understand your strengths, work on your weaknesses, and enjoy the journey of improvement.
        </p>
        <p>
          Join a global community of players and start your journey today with <strong className="text-purple-600">ChessWorld</strong> — where strategy meets innovation.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 text-center">
        <div className="bg-white rounded-xl p-6 shadow hover:shadow-lg transition duration-300">
          <Users className="mx-auto text-blue-600 w-10 h-10 mb-3" />
          <h4 className="text-xl font-semibold mb-2">Community Driven</h4>
          <p className="text-gray-600">
            Connect with players worldwide, share insights, and grow together.
          </p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow hover:shadow-lg transition duration-300">
          <TrendingUp className="mx-auto text-green-600 w-10 h-10 mb-3" />
          <h4 className="text-xl font-semibold mb-2">Personal Growth</h4>
          <p className="text-gray-600">
            Improve with targeted reports, training modules, and puzzle challenges.
          </p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow hover:shadow-lg transition duration-300">
          <Target className="mx-auto text-red-600 w-10 h-10 mb-3" />
          <h4 className="text-xl font-semibold mb-2">Goal Oriented</h4>
          <p className="text-gray-600">
            Set your objectives, track your rating, and achieve mastery over time.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
