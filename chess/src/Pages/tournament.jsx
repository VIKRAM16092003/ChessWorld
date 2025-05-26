import React from 'react';
import { Link } from 'react-router-dom';
import bg from '../assets/chessbgimg.jpg';

function ChessTournaments() {
  const formats = [
    { name: 'Round Robin', desc: 'Every player plays against every other player' },
    { name: 'Swiss System', desc: 'Players paired each round based on score' },
    { name: 'Match Play', desc: 'Two players face off over multiple games' },
    { name: 'Team Tournaments', desc: 'Teams (schools, clubs, countries) compete' },
  ];

  const timeControls = [
    { name: 'Classical', desc: 'Long games (90+ minutes per player)' },
    { name: 'Blitz', desc: '3–5 minutes per player' },
    { name: 'Bullet', desc: '1 minute or less per player' },
    { name: 'Armageddon', desc: 'White gets more time, Black wins with a draw' },
  ];

  const modes = [
    { name: 'Over-the-Board (OTB)', desc: 'Physical presence at a venue' },
    { name: 'Online', desc: 'Played through platforms like Chess.com' },
    { name: 'Armageddon', desc: 'Same rule: White gets more time, Black wins with a draw' },
  ];

  const Card = ({ title, desc }) => (
    <div className="p-6 rounded-2xl bg-white/80 shadow-md backdrop-blur-md hover:scale-105 transition-transform duration-300">
      <h3 className="text-xl font-bold text-gray-800 mb-2 text-center">{title}</h3>
      <p className="text-sm text-gray-600 text-center">{desc}</p>
    </div>
  );

  const Section = ({ title, items }) => (
    <section className="mb-16">
      <h2 className="text-2xl sm:text-3xl font-semibold text-center text-white bg-black/60 py-2 px-6 mx-auto rounded-xl w-max mb-10 shadow-lg">
        {title}
      </h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {items.map((item, i) => (
          <Card key={i} title={item.name} desc={item.desc} />
        ))}
      </div>
    </section>
  );

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center px-6 py-20"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-60 z-0"></div>

      <div className="relative z-10 max-w-7xl w-full bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-10 shadow-xl">
        <h1 className="text-4xl font-extrabold text-white text-center mb-16 tracking-wide drop-shadow">
          Explore Chess Tournament Types
        </h1>

        <Section title="By Format" items={formats} />
        <Section title="By Time Control" items={timeControls} />
        <Section title="By Mode of Play" items={modes} />

        <div className="flex justify-center mt-12">
          <Link to="/register">
            <button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-lg font-semibold px-8 py-3 rounded-full shadow hover:scale-105 transition">
              Join a Tournament
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ChessTournaments;
