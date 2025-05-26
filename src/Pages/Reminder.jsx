import { Link } from "react-router-dom";
import reminderImg from "../assets/puzzle.jpg"; // Replace if needed

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
    <section className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-10 px-4 sm:px-6">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-2">Opening Reminder</h1>
        <p className="text-md text-gray-600 font-medium">
          Performance insights and personalized suggestions
        </p>
      </div>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 max-w-6xl mx-auto">
        {reminders.map(({ title, description }, index) => (
          <div
            key={index}
            className="group bg-white rounded-2xl overflow-hidden shadow hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 flex flex-col sm:flex-row h-[180px]"
          >
            <div className="w-full sm:w-1/3 h-[180px]">
              <img
                src={reminderImg}
                alt="Reminder Visual"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-4 flex flex-col justify-center sm:w-2/3 text-left">
              <h2 className="text-lg font-bold text-indigo-700 mb-1">{title}</h2>
              <p className="text-sm text-gray-700 leading-snug">{description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-10">
        <Link to="/">
          <button className="px-5 py-2 bg-red-700 hover:bg-red-600 text-white font-semibold rounded-md transition">
            ← Back
          </button>
        </Link>
      </div>
    </section>
  );
};

export default Opreminder;
