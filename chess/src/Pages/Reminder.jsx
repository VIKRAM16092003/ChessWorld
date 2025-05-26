import { Link } from "react-router-dom";
import bgImage from "../assets/chessbgimg.jpg";

const reminders = [
  {
    title: "Opening Strength",
    description:
      "You've shown strong consistency in your opening repertoire. Your win rate with 1.e4 as White is significantly higher than average. Consider expanding your responses as Black to handle aggressive openings more confidently.",
  },
  {
    title: "Tactical Skills",
    description:
      "Your recent puzzle performance suggests a good understanding of forks and pins, but you often miss skewers and discovered attacks. Focused tactical training can help sharpen your pattern recognition.",
  },
  {
    title: "Blunder Frequency",
    description:
      "On average, you make 1.8 blunders per game, usually in the middlegame under time pressure. Try to slow down during critical positions and double-check for undefended pieces.",
  },
  {
    title: "Endgame Proficiency",
    description:
      "You perform well in king and pawn endgames but struggle with rook endgames. Practicing basic rook and king vs king endgames can help convert winning positions more reliably.",
  },
  {
    title: "Time Management",
    description:
      "Your blitz games often end in time trouble. You spend too much time on opening moves and not enough in complex middlegame positions. Try practicing with faster time controls to improve decision-making speed.",
  },
  {
    title: "Progress Over Time",
    description:
      "Your rating has steadily improved over the last 30 days, showing consistent effort and growth. Keep up your daily practice streak to maintain momentum.",
  },
  {
    title: "Recommended Focus Area",
    description:
      "Based on your recent games and puzzle history, you should prioritize tactical drills and rook endgames for the next week. These areas will give you the biggest performance boost.",
  },
];

const Opreminder = () => {
  return (
    <section
      className="min-h-screen bg-cover bg-center py-12 px-4"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="max-w-5xl mx-auto bg-black/60 rounded-xl p-10 text-white shadow-xl">
        <div className="text-center mb-10">
          <h1 className="text-5xl font-bold mb-2 text-white">Opening Reminder</h1>
          <p className="text-lg text-white/90">Performance insights and personalized suggestions</p>
        </div>

        <div className="space-y-10">
          {reminders.map(({ title, description }, index) => (
            <div key={index}>
              <h5 className="text-2xl font-semibold text-yellow-300 mb-1">{title}</h5>
              <p className="text-white/90 text-base leading-relaxed">{description}</p>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <Link to="/">
            <button className="px-6 py-2 bg-white hover:bg-white text-black font-semibold rounded transition">
              ← Back
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Opreminder;
