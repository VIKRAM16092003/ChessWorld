import { Link } from "react-router-dom";
import image4 from "../../assets/chess.jpg";
const Home = () => {
  return (
    <>    <h1>haribabu</h1>
    <div className="min-h-screen w-full bg-black text-white font-sans pt-0.5">
      
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row bg-white/10 w-[90%] md:w-[70%] mx-auto mt-10 border-2 border-gray-500 rounded-2xl px-6 py-10 items-center justify-between space-y-8 md:space-y-0">
        
        {/* Text */}
        <div className="md:w-1/2">
          <h1 className="text-4xl md:text-6xl font-bold text-red-900 mb-6 leading-tight">
            PLAY SMARTER <br /> LEARN FASTER
          </h1>
          <button className="border border-[#afcf83] px-6 py-2 text-[#afcf83] rounded hover:bg-[#afcf83] hover:text-black transition">
            Get Free Game Analysis
          </button>
        </div>

        {/* Divider */}
        <div className="hidden md:block w-px h-[200px] bg-gray-400 mx-6"></div>

        {/* Image */}
        <div className="md:w-1/2 flex justify-center">
          <img
            src={image4}
            alt="Chess Analysis"
            className="rounded shadow-md max-w-full h-auto"
          />
        </div>
      </section>

      {/* Features */}
      <section className="text-center px-4 py-12">
        <h2 className="text-2xl font-bold mb-8">FEATURES</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-lg">
          <p>Personalized Reports</p>
          <p>Suggested Puzzles</p>
          <p>Opening Recommender</p>
          <p>Progress Tracker</p>
        </div>
      </section>

      {/* Testimonials */}
      <section className="text-center px-4 py-12">
        <h2 className="text-2xl font-bold mb-8">TESTIMONIALS</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-lg">
          <div>
            <p className="italic">“In 2 weeks, I gained 150 Elo!”</p>
            <p className="mt-2">– User A</p>
          </div>
          <div>
            <p className="italic">“Better than any free coach I found.”</p>
            <p className="mt-2">– User B</p>
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="text-center px-4 py-12">
        <h2 className="text-2xl font-bold mb-8">PRICING PLANS</h2>
        <div className="flex flex-col md:flex-row justify-center items-center gap-4">
          <Link to="/freePlan">
            <button className="border border-gray-700 px-6 py-2 rounded hover:bg-gray-700 hover:text-white transition w-40">
              Free
            </button>
          </Link>
          <Link to="/basicPlan">
            <button className="border border-gray-700 px-6 py-2 rounded hover:bg-gray-700 hover:text-white transition w-40">
              Basic
            </button>
          </Link>
          <Link to="/premiumPlan">
            <button className="border border-gray-700 px-6 py-2 rounded hover:bg-gray-700 hover:text-white transition w-40">
              Premium
            </button>
          </Link>
        </div>
      </section>
    </div>
    </>

  );
};

export default Home;
