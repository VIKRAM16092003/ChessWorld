import { Link } from "react-router-dom";

const Progress = () => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-6 bg-white">
      <div className="bg-gray-100 border border-gray-300 rounded-xl max-w-4xl w-full max-h-[85vh] overflow-y-auto p-8 shadow-lg">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Personalized Report
        </h1>

        <ul className="text-gray-700 font-medium space-y-6 leading-relaxed list-disc list-inside">
          <li>
            <span className="font-semibold text-blue-600">Opening Strength:</span> You've shown strong consistency in your opening repertoire. Your win rate with 1.e4 as White is significantly higher than average. Consider expanding your responses as Black to handle aggressive openings more confidently.
          </li>
          <li>
            <span className="font-semibold text-blue-600">Tactical Skills:</span> Your recent puzzle performance suggests a good understanding of forks and pins, but you often miss skewers and discovered attacks. Focused tactical training can help sharpen your pattern recognition.
          </li>
          <li>
            <span className="font-semibold text-blue-600">Blunder Frequency:</span> On average, you make 1.8 blunders per game, usually in the middlegame under time pressure. Try to slow down during critical positions and double-check for undefended pieces.
          </li>
          <li>
            <span className="font-semibold text-blue-600">Endgame Proficiency:</span> You perform well in king and pawn endgames but struggle with rook endgames. Practicing basic rook and king vs king endgames can help convert winning positions more reliably.
          </li>
          <li>
            <span className="font-semibold text-blue-600">Time Management:</span> Your blitz games often end in time trouble. You spend too much time on opening moves and not enough in complex middlegame positions. Try practicing with faster time controls to improve decision-making speed.
          </li>
          <li>
            <span className="font-semibold text-blue-600">Progress Over Time:</span> Your rating has steadily improved over the last 30 days, showing consistent effort and growth. Keep up your daily practice streak to maintain momentum.
          </li>
          <li>
            <span className="font-semibold text-blue-600">Recommended Focus Area:</span> Based on your recent games and puzzle history, you should prioritize tactical drills and rook endgames for the next week. These areas will give you the biggest performance boost.
          </li>
        </ul>
      </div>

      <Link to="/">
        <button className="mt-6 w-[120px] border border-red-700 rounded-lg font-semibold text-white py-2 bg-red-700 hover:bg-red-600 transition">
          Back
        </button>
      </Link>
    </div>
  );
};

export default Progress;
