import React from 'react';
import { Link } from 'react-router-dom';
import bg from '../assets/chessbgimg.jpg'; // Correct import

function ChessTournaments() {
  const formats = [
    { name: 'Round Robin', desc: 'Every player plays against every other player', icon: '🔁' },
    { name: 'Swiss System', desc: 'Players paired each round based on score', icon: '🔀' },
    { name: 'Match Play', desc: 'Two players face off over multiple games', icon: '⚔️' },
    { name: 'Team Tournaments', desc: 'Teams (schools, clubs, countries) compete', icon: '👥' },
  ];

  const timeControls = [
    { name: 'Classical', desc: 'Long games (90+ minutes per player)', icon: '⏱️' },
    { name: 'Blitz', desc: '3–5 minutes per player', icon: '⚡' },
    { name: 'Bullet', desc: '1 minute or less per player', icon: '🔥' },
    { name: 'Armageddon', desc: 'Tie-breaker: White gets more time, Black wins with a draw', icon: '🎯' },
  ];

  const modes = [
    { name: 'Over-the-Board (OTB)', desc: 'Physical presence at a venue', icon: '📍' },
    { name: 'Online', desc: 'Played through platforms like Chess.com', icon: '💻' },
    { name: 'Armageddon', desc: 'Same rule: White gets more time, Black wins with a draw', icon: '🎯' },
  ];

  const Card = ({ title, desc, icon, color}) => (
   
      <div
        className={`p-5 rounded-xl shadow border-l-4 ${color} bg-white/70 bg-opacity-90 hover:bg-opacity-100 transition cursor-pointer`}
      >
        <h3 className="text-lg font-semibold mb-1">
          {icon} {title}
        </h3>
        <p className="text-sm text-gray-600">{desc}</p>
      </div>
  
  );
  ;

  return (
    <div
      className="relative min-h-screen bg-cover bg-center flex items-center justify-center px-6 py-12"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      <div
        className="relative max-w-6xl w-full bg-white bg-opacity-25 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20 p-10"
        style={{ boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)" }}
      >
        <h1 className="text-4xl font-extrabold text-center mb-12 text-white tracking-wider drop-shadow-lg">
          Types of Chess Tournaments
        </h1>

        {/* By Format */}
        <section className="mb-12">
          <center>
            <h2 className="text-3xl font-semibold mb-[20px] text-center drop-shadow-md text-white bg-black/60 w-[180px] rounded pt-[3px] pb-[5px]">
              By Format
            </h2>
          </center>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 mt-[50px]">
            {formats.map((f, i) => (
              <Card
                key={i}
                title={f.name}
                desc={f.desc}
                icon={f.icon}
                color="border-blue-400"
            
              />
            ))}
          </div>
        </section>

        {/* By Time Control */}
        <section className="mb-12">
          <center>
            <h2 className="text-3xl font-semibold text-green-300 mb-8 text-center drop-shadow-md text-white bg-black/60 w-[280px] rounded pt-[3px] pb-[5px]">
              By Time Control
            </h2>
          </center>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 mt-[50px]">
            {timeControls.map((t, i) => (
              <Card
                key={i}
                title={t.name}
                desc={t.desc}
                icon={t.icon}
                color="border-green-400"
               
              />
            ))}
          </div>
        </section>

        {/* By Mode of Play */}
        <section className="mb-8">
          <center>
            <h2 className="text-3xl font-semibold text-purple-300 mb-8 text-center drop-shadow-md text-white bg-black/60 w-[280px] rounded pt-[3px] pb-[5px]">
              By Mode of Play
            </h2>
          </center>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 mt-[50px]">
            {modes.map((m, i) => (
              <Card
                key={i}
                title={m.name}
                desc={m.desc}
                icon={m.icon}
                color="border-purple-400"
                
              />
            ))}
          </div>
        </section>

        <div className="flex justify-center mt-10">
          <Link to="/register">
            <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-full text-xl font-semibold shadow-lg hover:from-purple-700 hover:to-blue-700 transition">
              Join a Tournament
            </button>
          </Link>
        </div>
      </div>
    </div>
  );

}

export default ChessTournaments;