import { Link } from "react-router-dom";

function Pricing() {
  return (
    <section className="text-center px-4 py-12 text-black">
      <h2 className="text-3xl font-bold mb-12">PRICING PLANS</h2>

      <div className="flex flex-col md:flex-row justify-center items-center gap-8">
        {/* Free Plan */}
        <Link to="/freePlan"  style={{ textDecoration: "none" }}>
          <div className="w-64 border border-black rounded-xl p-6 bg-blue-100 shadow-lg hover:bg-blue-200 hover:shadow-xl transition duration-300 cursor-pointer" >
           <h3 className="mb-4 bg-black text-white rounded" >Free</h3>
            <p className="text-sm text-gray-700 mb-4 font-bold">Basic access to features</p>
            <button className="text-black w-full bg-white border border-black py-2 rounded hover:bg-black hover:text-black transition duration-300">
              <b>Select</b>
            </button>
          </div>
        </Link>

        {/* Basic Plan */}
        <Link to="/basicPlan"  style={{ textDecoration: "none" }}>
          <div className="w-64 border border-black rounded-xl p-6 bg-indigo-700 text-white shadow-lg hover:bg-indigo-600 hover:shadow-xl transition duration-300 cursor-pointer">
            <h3 className="text-xl font-semibold mb-4 bg-black rounded">Basic</h3>
            <p className="text-sm font-bold mb-4">More puzzles & progress tracking</p>
            <button className=" text-black w-full bg-white text-indigo-700 border border-black py-2 rounded hover:bg-black hover:text-black transition duration-300">
              <b>Select</b>
            </button>
          </div>
        </Link>

        {/* Premium Plan */}
        <Link to="/premiumPlan"  style={{ textDecoration: "none" }}>
          <div className="w-64 border border-black rounded-xl p-6 bg-yellow-300 shadow-lg hover:bg-yellow-400 hover:shadow-xl transition duration-300 cursor-pointer">
            <h3 className="text-xl font-semibold mb-4 text-white bg-black rounded">Premium</h3>
            <p className="text-sm font-bold text-gray-800 mb-4">All features unlocked</p>
            <button className="text-black w-full bg-white border border-black py-2 rounded hover:bg-black hover:text-black transition duration-300">
              <b>Select</b>
            </button>
          </div>
        </Link>
      </div>
    </section>
  );
}

export default Pricing;
