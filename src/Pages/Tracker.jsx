import { Link } from "react-router-dom";
import bgImage from "../assets/bg.jpg"; // Replace with your image

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
    <div className="min-h-screen bg-white flex flex-col lg:flex-row">
      {/* Left image side */}
      <div
        className="hidden lg:block lg:w-1/2 bg-cover bg-center"
        style={{ backgroundImage: `url(${bgImage})` }}
      ></div>

      {/* Right content side */}
      <div className="w-full lg:w-1/2 p-8 sm:p-10 md:p-14 overflow-y-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">Personalized Report</h1>

        <div className="space-y-6 text-gray-700 font-medium leading-relaxed">
          {reports.map(({ title, text }, index) => (
            <div key={index}>
              <span className="block">
                <strong className="text-blue-600">{title}:</strong> {text}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-10 flex justify-center lg:justify-end">
          <Link to="/">
            <button className="bg-red-600 hover:bg-red-700 text-white font-semibold rounded px-6 py-2 transition">
              Back
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Progress;

