import { Link } from 'react-router-dom';
import bg from '../assets/chessbgimg.jpg';

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
    { name: 'Armageddon', desc: 'White gets more time, Black wins with a draw', icon: '🎯' },
  ];

  const modes = [
    { name: 'Over-the-Board (OTB)', desc: 'Physical presence at a venue', icon: '📍' },
    { name: 'Online', desc: 'Played through platforms like Chess.com', icon: '💻' },
    { name: 'Armageddon', desc: 'Same rule: White gets more time, Black wins with a draw', icon: '🎯' },
  ];

  const Card = ({ title, desc, icon }) => (
    <div className="p-6 rounded-xl bg-white/80 border-2 border-transparent hover:border-purple-400 shadow-lg hover:scale-105 transition duration-300 mt-[20px]">
      <div className="text-4xl text-center mb-4">{icon}</div>
      <h3 className="text-xl font-bold text-center mb-2">{title}</h3>
      <div className="bg-black/60 text-white text-base font-medium rounded-2xl px-6 py-4 text-center shadow-inner leading-relaxed">
        {desc}
      </div>
    </div>
  );

  const Section = ({ title, items }) => (
    <section className="mb-16">
      <h2 className="text-xl sm:text-2xl font-semibold text-center text-white bg-green/40 py-2 px-6 mx-auto rounded-xl w-max mb-10 shadow-lg">
        {title}
      </h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {items.map((item, i) => (
          <Card key={i} title={item.name} desc={item.desc} icon={item.icon} />
        ))}
      </div>
    </section>
  );

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center bg-[#EFEEEA] font-sans"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="absolute inset-0 bg-black"></div>

      <div className="relative z-10 max-w-7xl w-full bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-10 shadow-xl">
        <h1 className="text-4xl font-extrabold text-white text-center mb-16 tracking-wide drop-shadow">
          Explore Chess Tournament Types
        </h1>

        <Section title="By Format" items={formats}/>
        <Section title="By Time Control" items={timeControls} />
        <Section title="By Mode of Play" items={modes} />

        <div className="flex justify-center mt-12">
          <Link to="/register">
            <button className="bg-black/60 text-white text-lg font-semibold px-8 py-3 rounded-full shadow hover:scale-105 transition rounded">
              Join a Tournament
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ChessTournaments;
