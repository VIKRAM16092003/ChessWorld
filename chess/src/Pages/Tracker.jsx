import { Link } from "react-router-dom";
import bgImage from "../assets/chessbgimg.jpg";

const Progress = () => {
  const reports = [
    {
      title: "Opening Strength",
      text: "You've shown strong consistency in your opening repertoire. Your win rate with 1.e4 as White is significantly higher than average. Consider expanding your responses as Black to handle aggressive openings more confidently.",
    },
    {
      title: "Tactical Skills",
      text: "Your recent puzzle performance suggests a good understanding of forks and pins, but you often miss skewers and discovered attacks. Focused tactical training can help sharpen your pattern recognition.",
    },
    {
      title: "Blunder Frequency",
      text: "On average, you make 1.8 blunders per game, usually in the middlegame under time pressure. Try to slow down during critical positions and double-check for undefended pieces.",
    },
    {
      title: "Endgame Proficiency",
      text: "You perform well in king and pawn endgames but struggle with rook endgames. Practicing basic rook and king vs king endgames can help convert winning positions more reliably.",
    },
    {
      title: "Time Management",
      text: "Your blitz games often end in time trouble. You spend too much time on opening moves and not enough in complex middlegame positions. Try practicing with faster time controls to improve decision-making speed.",
    },
    {
      title: "Progress Over Time",
      text: "Your rating has steadily improved over the last 30 days, showing consistent effort and growth. Keep up your daily practice streak to maintain momentum.",
    },
    {
      title: "Recommended Focus Area",
      text: "Based on your recent games and puzzle history, you should prioritize tactical drills and rook endgames for the next week. These areas will give you the biggest performance boost.",
    },
  ];

  return (
    <div
      className="min-h-screen bg-cover bg-center px-6 py-12"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="max-w-4xl mx-auto bg-black/60 rounded-xl p-10 text-white shadow-lg">
        <h1 className="text-5xl font-bold mb-10 text-center">Personalized Report</h1>

        <div className="space-y-10 text-lg leading-relaxed">
          {reports.map(({ title, text }, index) => (
            <div key={index}>
              <h5 className="text-2xl font-semibold text-yellow-300 mb-2">{title}</h5>
              <p className="text-white/90">{text}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Link to="/">
            <button className="bg-white hover:bg-red-600 text-black px-6 py-2 rounded font-semibold transition">
              ← Back
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Progress;
