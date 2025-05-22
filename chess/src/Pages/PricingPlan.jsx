import { Link, useNavigate } from "react-router-dom";
import { FaCrown, FaStar, FaPuzzlePiece } from "react-icons/fa";

function Pricing() {
  const navigate=useNavigate()
  return (
    <section className="min-h-screen bg-indigo-100 from-gray-100 via-white to-gray-200 py-4 px-6 text-black">
      <button className="btn btn-dark" onClick={() => navigate("/")}>
           ←  Back to home
        </button>
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="fw-bold text-shadow-lg text-5xl font-extrabold mb-6 text-gray-800">Pricing Plans</h2>
        <p className="text-lg text-primary h4 fw-bold mb-12 pb-4 mt-5">Choose a plan that fits your goals and level</p>

        <div className="mt-5 grid gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {/* Free Plan */}
          <Link to="/freePlan" className="no-underline shadow-emerald-500 rounded" style={{ textDecoration: 'none' }}>
            <div className="bg-success border border-gray-300 rounded-3xl p-8 shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
              <div className="flex justify-center items-center mb-4">
                <div className="bg-black text-white rounded-full px-4 py-1 text-sm inline-block">Free</div>
              </div>
              <FaPuzzlePiece className="text-4xl text-blue-400 mx-auto mb-4" />
              <p className="text-white mb-6 font-medium text-sm">Basic access to core features</p>
              <button className="w-full bg-white text-black font-semibold py-2 px-4 border border-black rounded hover:bg-black hover:text-white transition duration-300">
                Select
              </button>
            </div>
          </Link>

          {/* Basic Plan */}
          <Link to="/basicPlan" className="no-underline" style={{ textDecoration: 'none' }}>
            <div className="bg-indigo-700 text-white border border-indigo-800 rounded-3xl p-8 shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 relative">
              <div className="flex justify-center items-center mb-4">
                <div className="bg-black text-white rounded-full px-4 py-1 text-sm inline-block">Basic</div>
              </div>
              <FaStar className="text-4xl text-yellow-300 mx-auto mb-4" />
              <p className="mb-6 font-medium text-sm">More puzzles & progress tracking</p>
              <button className="w-full bg-white text-black font-semibold py-2 px-4 border border-white rounded hover:bg-black hover:text-white transition duration-300">
                Select
              </button>
              <span className="absolute -top-3 right-4 bg-yellow-500 text-xs text-white px-2 py-1 rounded-full shadow">Popular</span>
            </div>
          </Link>

          {/* Premium Plan */}
          <Link to="/premiumPlan" className="no-underline" style={{ textDecoration: 'none' }}>
            <div className="bg-gradient-to-br from-yellow-300 to-yellow-400 text-black border-2 border-yellow-500 rounded-3xl p-8 shadow-2xl hover:shadow-yellow-500/50 transform hover:-translate-y-1 transition-all duration-300 relative">
              <div className="flex justify-center items-center mb-4">
                <div className="bg-black text-white rounded-full px-4 py-1 text-sm inline-block">Premium</div>
              </div>
              <FaCrown className="text-4xl text-yellow-800 mx-auto mb-4" />
              <p className="mb-6 font-medium text-dark text-sm">All features unlocked + exclusive content</p>
              <button className="w-full bg-black text-white font-semibold py-2 px-4 border border-black rounded hover:bg-white hover:text-black transition duration-300">
                Select
              </button>
              <span className="absolute -top-3 right-4 bg-red-600 text-xs text-white px-2 py-1 rounded-full shadow">Best Value</span>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Pricing;
