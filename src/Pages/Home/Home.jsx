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
      <div className="bg[#5b646d]/30 w-full h-full py-[70px]">
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
              <p
                className="text-[20px] font-bold text-black pt-3 tracking-[1px]"
                style={{ wordSpacing: "-7px", letterSpacing: "0px" }}
              >
                CHESS{" "}
                <span
                  class="text-white font-[300] pl-2 tracking-[-1px] text-[20px]
                "
                  style={{ letterSpacing: "-3px" }}
                >
                  WORLD{" "}
                </span>{" "}
              </p>
            </Link>
            <div className="flex space-x-4">
              <Link
                to="/pricing"
                className=" border-[white] bg-green-700  font-[700] hover:bg-[#065f46] hover:text-white px-4 py-2 rounded transition"
                style={{ textDecoration: "none", color: "#F2F2F2" }}
              >
                Pricing
              </Link>

              <Link
                to="/play"
                className=" border-[white] bg-green-700  font-[700]  hover:bg-[#065f46]  hover:text-white px-4 py-2 rounded transition"
                style={{ textDecoration: "none", color: "#F2F2F2" }}
              >
                Start Free
              </Link>
              <Link
                to="/features"
                className=" border-[white] bg-green-700  font-[700]  hover:bg-[#065f46]  hover:text-white px-4 py-2 rounded transition"
                style={{ textDecoration: "none", color: "#F2F2F2" }}
              >
                Features
              </Link>
              <Link
                to="/register"
                className=" border-[white] bg-green-700   font-[700] hover:bg-[#065f46]  hover:text-white px-4 py-2 rounded transition"
                style={{ textDecoration: "none", color: "#F2F2F2" }}
              >
                Premium
              </Link>
              <Link
                to="/tactics"
                className=" border-[white] bg-green-700   font-[700] hover:bg-[#065f46]  hover:text-white px-4 py-2 rounded transition"
                style={{ textDecoration: "none", color: "#F2F2F2" }}
              >
                Tactics
              </Link>
            </div>
          </div>

          {/* Content Row */}
          <div className="flex flex-col md:flex-row justify-between items-center flex-grow">
            {/* Left Text */}
            <div className=" text-[#F2F2F2] max-w-md mb-10 md:mb-0 ml-[60px]">
              <p
                className="text-[60px]  text-[#fff] text-justify font-[900] leading-tight mb-4"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                PLAY SMARTER <br /> LEARN FASTER
              </p>
              <p
                className="text-lg w-[350px] text-[#F2F2F2] font-[400] mb-[30px]"
                style={{ fontFamily: "Permanent Marker cursive" }}
              >
                Enhance your skills and improve your focus with this platform!
              </p>
              <div className="flex flex-row w-[294px] justify-between space-x-4 mt-3">
                <button
                  className=" w-[240px] bg-green-700  hover:bg-[#065f46]  hover:text-white font-bold px-5 py-2 rounded transition"
                  style={{ marginTop: "15px", color: "#F2F2F2" }}
                >
                  Get Start Analysis
                </button>

                {/* Uncomment if you want to add a Features button */}
                {/* <button className="border-2 border-[#FE5D26] text-[#FE5D26] bg-transparent hover:bg-[#FE5D26] hover:text-white font-bold px-6 py-2 rounded transition">
                  Features
                </button> */}
              </div>
            </div>

            {/* Divider */}
            <div className="hidden md:block w-[2px] h-[300px] bg-gray-300 mx-8"></div>

            {/* Right Image */}
            <div className="flex justify-center mr-[60px]">
              <img
                src={chesshomeimg}
                alt="Chess Analysis"
                className="w-[420px] h-[300px] object-cover rounded shadow-md"
              />
              <div className="h-[300px] w-[420px] bg-white/10 shadow-md border-1 border-white rounded absolute"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
