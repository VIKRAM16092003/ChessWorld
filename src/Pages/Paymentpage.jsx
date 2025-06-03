import { Link, useNavigate } from "react-router-dom";
import chessbgimg from "../assets/chessbgimg.jpg";
import logo from "../assets/logo.jpg";

const Paymentpage = () => {
    const navigate = useNavigate();
  return (
    <>
      <div
        className="bg-grey/40 bg-cover bg-center h-[100vh]"
        style={{ backgroundImage: `url(${chessbgimg})` }}
      >
        <div class="flex flex-row justify-between mb-2 px-[30px]">
          <Link
            to="/"
            className="flex items-center space-x-3 text-white font-semibold"
            style={{ textDecoration: "none" }}
          >
            <img
              src={logo}
              alt="Company Logo"
              className="w-20 h-20 rounded-full object-cover"
            />
            <p className="text-[40px] font-bold text-black pt-3">
              CHESS <span class="text-white text-[30px]">WORLD </span>{" "}
            </p>
          </Link>
          <button
            className="btn btn-dark mt-3 bg-green-700 hover:bg-green-800 mb-3 h-[50px] right"
            onClick={() => navigate("/")}
          >
            Back to Home
          </button>
        </div>
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
        <div class="w-[40vw] ml-[30vw] bg-[#dae2e6]/20 h-[550px] rounded-[10px] shadow-md mt-[10px] mb-[10px]"></div>
      </div>
    </>
  );
};
export default Paymentpage;
