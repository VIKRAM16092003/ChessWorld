import { Link } from "react-router-dom";
import chesshomeimg from "../../assets/chesshomeimg.jpg";
import chessbgimg from "../../assets/chessbgimg.jpg";
import logo from "../../assets/logo.jpg";

const Home = () => {
  return (
    <div
      className="min-h-screen w-full bg-cover bg-center bg-[#EFEEEA] font-sans"
      style={{ backgroundImage: `url(${chessbgimg})` }}
    >
      <div className="bg-[#5b646d]/30 w-full h-full py-[70px]">
        <div className="w-[90%] mx-auto bg-[#dae2e6]/20 border rounded-2xl shadow-xl p-6 h-[80vh] flex flex-col">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <Link
              to="/"
              className="flex items-center space-x-3 text-white font-semibold"
            >
              <img
                src={logo}
                alt="Company Logo"
                className="w-20 h-20 rounded-full object-cover"
              />
              <span className="text-4xl font-bold">CHESS WORLD</span>
            </Link>
            <div className="flex space-x-4">
              <Link
  to="/pricing"
  className="border-2 border-[white] text-white bg-transparent hover:bg-[#FE5D26] hover:text-white px-4 py-2 rounded transition"
  style={{ textDecoration: "none" }}
>
  Pricing
</Link>

              <Link
                to="/play"
                className="border-2 border-[white] text-white bg-transparent hover:bg-[#FE5D26] hover:text-white px-4 py-2 rounded transition"
                style={{ textDecoration: "none" }}
              >
                Start Free
              </Link>
            </div>
          </div>

          {/* Content Row */}
          <div className="flex flex-col md:flex-row justify-between items-center flex-grow">
            {/* Left Text */}
            <div className="text-white max-w-md mb-10 md:mb-0 ml-4">
              <h1 className="text-5xl font-bold leading-tight mb-4">
                PLAY SMARTER <br /> LEARN FASTER
              </h1>
              <p className="text-lg font-medium mb-6">
                Enhance your skills and improve your focus with this platform!
              </p>
              <div className="flex space-x-4">
                <Link to="/play">
                <button className="border-2 border-[#FE5D26] text-[#FE5D26] bg-transparent hover:bg-[#FE5D26] hover:text-orange font-bold px-5 py-2 rounded transition">
                  Get Started
                </button>
                </Link>
                
              </div>
            </div>

            {/* Divider */}
            <div className="hidden md:block w-[2px] h-[300px] bg-gray-300 mx-8"></div>

            {/* Right Image */}
            <div className="flex justify-center">
              <img
                src={chesshomeimg}
                alt="Chess Analysis"
                className="w-[420px] h-[300px] object-cover rounded shadow-md"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
