import { Link } from "react-router-dom";

const Opreminder = () => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-6 bg-white">
      <div className="bg-gray-100 border border-gray-300 rounded-xl max-w-4xl w-full max-h-[85vh] overflow-y-auto flex flex-col shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Opening Reminder
        </h1>

        <ul className="text-gray-700 font-medium space-y-6 leading-relaxed">
          <li>
            <strong className="text-blue-600 font-semibold">Opening Strength:</strong> You've shown strong consistency in your opening repertoire. Your win rate with 1.e4 as White is significantly higher than average. Consider expanding your responses as Black to handle aggressive openings more confidently.
          </li>
          <li>
            <strong className="text-blue-600 font-semibold">Tactical Skills:</strong> Your recent puzzle performance suggests a good understanding of forks and pins, but you often miss skewers and discovered attacks. Focused tactical training can help sharpen your pattern recognition.
          </li>
          <li>
            <strong className="text-blue-600 font-semibold">Blunder Frequency:</strong> On average, you make 1.8 blunders per game, usually in the middlegame under time pressure. Try to slow down during critical positions and double-check for undefended pieces.
          </li>
          <li>
            <strong className="text-blue-600 font-semibold">Endgame Proficiency:</strong> You perform well in king and pawn endgames but struggle with rook endgames. Practicing basic rook and king vs king endgames can help convert winning positions more reliably.
          </li>
          <li>
            <strong className="text-blue-600 font-semibold">Time Management:</strong> Your blitz games often end in time trouble. You spend too much time on opening moves and not enough in complex middlegame positions. Try practicing with faster time controls to improve decision-making speed.
          </li>
          <li>
            <strong className="text-blue-600 font-semibold">Progress Over Time:</strong> Your rating has steadily improved over the last 30 days, showing consistent effort and growth. Keep up your daily practice streak to maintain momentum.
          </li>
          <li>
            <strong className="text-blue-600 font-semibold">Recommended Focus Area:</strong> Based on your recent games and puzzle history, you should prioritize tactical drills and rook endgames for the next week. These areas will give you the biggest performance boost.
          </li>
        </ul>
      </div>

      <Link to="/">
        <button className="mt-6 w-[100px] border-2 border-red-700 bg-red-700 text-white rounded font-semibold py-2 hover:bg-red-600 transition">
          Back
        </button>
      </Link>
    </div>
  );
};

export default Opreminder;
