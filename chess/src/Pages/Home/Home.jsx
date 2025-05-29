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
              className="flex items-center space-x-3 pl-3 text-white font-semibold"
              style={{ textDecoration: "none" }}
            >
              <img
                src={logo}
                alt="Company Logo"
                className="w-20 h-20 rounded-full object-cover"
              />
              <p className="text-[20px] font-bold text-black pt-3 tracking-[1px]">
                CHESS{" "}
                <span className="text-white font-[300] pl-2 tracking-[-1px] text-[20px]">
                  WORLD
                </span>
              </p>
            </Link>
            <div className="flex space-x-4">
              {["pricing", "play", "features", "register", "tactics"].map((path, i) => (
                <Link
                  key={i}
                  to={`/${path}`}
                  className="border-[white] bg-[#047857] font-[700] hover:bg-[#065f46] hover:text-white px-4 py-2 rounded transition"
                  style={{ textDecoration: "none", color: "#F2F2F2" }}
                >
                  {path.charAt(0).toUpperCase() + path.slice(1)}
                </Link>
              ))}
            </div>
          </div>

          {/* Content Row */}
          <div className="flex flex-col md:flex-row justify-center items-center flex-grow">
            {/* Left Text */}
            <div className="text-[#F2F2F2] max-w-md md:mr-16 text-left">
              <p
                className="text-[50px] text-white font-[900] leading-tight mb-4"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                PLAY SMARTER <br /> LEARN FASTER
              </p>
              <p
                className="text-lg text-[#F2F2F2] font-[400] mb-6"
                style={{ fontFamily: "Permanent Marker cursive" }}
              >
                Enhance your skills and improve your focus with this platform!
              </p>
              <Link to="/tournament">
              <button
                className="bg-[#047857] hover:bg-[#065f46] text-white font-bold px-6 py-3 rounded transition"
              >
                Get Start Analysis
              </button></Link>
            </div>

            {/* Divider */}
            <div className="hidden md:block w-[2px] h-[300px] bg-gray-300 mx-8"></div>

            {/* Right Image */}
            <div className="relative flex justify-center">
              <img
                src={chesshomeimg}
                alt="Chess Analysis"
                className="w-[420px] h-[300px] object-cover rounded shadow-md z-10"
              />
              <div className="absolute top-0 left-0 h-[300px] w-[420px] bg-white/10 shadow-md border border-white rounded z-0"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
