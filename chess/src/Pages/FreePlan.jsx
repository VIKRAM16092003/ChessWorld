import image1 from '../assets/image1.png';
import image3 from "../assets/image3.jpg";
import image4 from "../assets/image4.png";
import image2 from "../assets/images2.jpg";
import chesshomeimg from "../assets/chessbgimg.jpg"; // Add this import
import { Link } from "react-router-dom";

export const FreePlan = () => (
  <div
    className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 relative text-gray-900 bg-cover bg-center bg-no-repeat"
    style={{
      backgroundImage: `url(${chesshomeimg})`,
      backgroundAttachment: "fixed",
    }}
  >
   
    <div className="absolute inset-0 bg-black/60 pointer-events-none"></div>

    
    <div className="relative z-10 max-w-6xl mx-auto">


      {/* Back Button */}
      <div className="absolute top-4 right-4 z-20">
        <Link to="/pricing">
          <button className="bg-black text-white px-4 py-2 rounded hover:text-black-500 transition">
            Back
          </button>
        </Link>
      </div>

      <center>
        <h2 className="text-4xl font-extrabold text-center mb-4 rounded text-white w-[180px] pt-[2px] pb-[2px]">
          FREE PLAN
        </h2>
      </center>

      <p className="text-center text-lg mb-10 max-w-2xl mx-auto text-white/80">
        Ideal for casual players looking to enjoy the game and get started with basic tools.
      </p>

      <div className="bg-white/10 shadow-lg rounded-lg p-6 overflow-x-auto backdrop-blur-sm border border-gray-300">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-200 text-black text-lg">
              <th className="p-4 border border-gray-300 text-center">Feature Image</th>
              <th className="p-4 border border-gray-300 text-center">Feature Title</th>
              <th className="p-4 border border-gray-300 text-center">Description</th>
            </tr>
          </thead>
          <tbody className="text-black text-sm">
            {[
              {
                img: image1,
                title: "Unlimited Casual Games",
                desc: "Enjoy unlimited casual chess games without any restrictions—perfect for practice, fun, and honing your skills at your own pace.",
              },
              {
                img: image4,
                title: "Basic Game Feedback",
                desc: "Receive instant feedback on your games with highlights of key moves, helping you understand mistakes and improve gradually.",
              },
              {
                img: image3,
                title: "Limited Opening Strategies",
                desc: "Access a curated set of common chess openings to build a strong foundation and start your games with confidence.",
              },
              {
                img: image2,
                title: "3 Daily Puzzles",
                desc: "Sharpen your skills daily with three fresh chess puzzles designed to challenge and improve your tactical thinking.",
              },
            ].map(({ img, title, desc }, index) => (
              <tr key={index} className=" transition">
                <td className="p-4 border border-gray-300">
                  <img src={img} alt={title} className="w-40 h-28 object-cover rounded" />
                </td>
                <td className="p-4 border border-gray-300 font-bold text-base text-white">{title}</td>
                <td className="p-4 border border-gray-300 text-white text-base">{desc}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-10 text-center">
          <button className="bg-white text-black px-6 py-2 rounded hover:bg-gray-900 transition">
            Choose Free Plan
          </button>
        </div>
      </div>
    </div>
  </div>
);
