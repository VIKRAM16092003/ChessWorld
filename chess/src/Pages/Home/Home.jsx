import { Link } from "react-router-dom";
import chesshomeimg from "../../assets/chesshomeimg.jpg";
import chessbgimg from "../../assets/chessbgimg.jpg";
import logo from "../../assets/logo.png";

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
                className="w-30 h-20  object-cover"
              />
              
            </Link>
            <div className="flex space-x-4">
              <Link
  to="/pricing"
  className="border-2 border-[white] text-white btn btn-danger hover:bg-[#FE5D26] hover:text-white px-4 py-2 rounded transition"
  style={{ textDecoration: "none" }}
>
  Pricing
</Link>

              <Link
  to="/play"
  state={{ data: 180 }}  // 3 minutes in seconds
  className="btn btn-success border-2 border-[white] text-white hover:bg-[#FE5D26] hover:text-white px-4 py-2 rounded transition"
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
              <h1 className="text-6xl font-extrabold leading-tight tracking-tight text-gray-900 mb-6">
  <span className="block text-2xl text-shadow-neutral-50">PLAY SMARTER</span>
  <span className="block text-shadow-neutral-50">LEARN FASTER</span>
</h1>
<p className="text-xl text-shadow-neutral-50 font-medium mb-8 max-w-xl">
  Enhance your skills and sharpen your focus with our interactive learning platform.
</p>

              <div className="flex space-x-4">
                <Link to={"/tournment"}>
                                <button className="btn btn-primary font-bold px-5 py-2 rounded transition">
                  Go To Tournment
                </button>
                </Link>
                {/* Uncomment if you want to add a Features button */}
                {/* <button className="border-2 border-[#FE5D26] text-[#FE5D26] bg-transparent hover:bg-[#FE5D26] hover:text-white font-bold px-6 py-2 rounded transition">
                  Features
                </button> */}
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
