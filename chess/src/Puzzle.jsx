import { Link } from "react-router-dom";

const Puzzle = () => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-6 bg-white">
      <div className="bg-gray-100 border border-gray-300 rounded-xl max-w-4xl w-full max-h-[85vh] flex flex-col shadow-lg">
        
        {/* Header */}
        <header className="px-8 py-6 border-b border-gray-300 bg-white rounded-t-xl">
          <h1 className="text-3xl font-bold text-gray-800 text-center">Suggested Puzzle</h1>
        </header>

        {/* Content */}
        <main className="overflow-y-auto px-8 py-6 text-gray-700 font-medium space-y-6 leading-relaxed flex-1">
          <section>
            <h2 className="font-semibold text-blue-600 mb-1">Opening Strength:</h2>
            <p>
              You've shown strong consistency in your opening repertoire. Your win rate with 1.e4 as White is significantly higher than average.
              Consider expanding your responses as Black to handle aggressive openings more confidently.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-blue-600 mb-1">Tactical Skills:</h2>
            <p>
              Your recent puzzle performance suggests a good understanding of forks and pins, but you often miss skewers and discovered attacks.
              Focused tactical training can help sharpen your pattern recognition.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-blue-600 mb-1">Blunder Frequency:</h2>
            <p>
              On average, you make 1.8 blunders per game, usually in the middlegame under time pressure.
              Try to slow down during critical positions and double-check for undefended pieces.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-blue-600 mb-1">Endgame Proficiency:</h2>
            <p>
              You perform well in king and pawn endgames but struggle with rook endgames.
              Practicing basic rook and king vs king endgames can help convert winning positions more reliably.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-blue-600 mb-1">Time Management:</h2>
            <p>
              Your blitz games often end in time trouble. You spend too much time on opening moves and not enough in complex middlegame positions.
              Try practicing with faster time controls to improve decision-making speed.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-blue-600 mb-1">Progress Over Time:</h2>
            <p>
              Your rating has steadily improved over the last 30 days, showing consistent effort and growth.
              Keep up your daily practice streak to maintain momentum.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-blue-600 mb-1">Recommended Focus Area:</h2>
            <p>
              Based on your recent games and puzzle history, you should prioritize tactical drills and rook endgames for the next week.
              These areas will give you the biggest performance boost.
            </p>
          </section>
        </main>

        {/* Footer */}
        <footer className="px-8 py-4 border-t border-gray-300 bg-white rounded-b-xl flex justify-end">
          <Link to="/">
            <button className="bg-red-700 text-white font-semibold rounded px-6 py-2 hover:bg-red-600 transition">
              Back
            </button>
          </Link>
        </footer>
      </div>
    </div>
  );
};

export default Puzzle;
