import image1 from '../assets/image1.png';
import image3 from "../assets/image3.jpg";
import image4 from "../assets/image4.png";
import image2 from "../assets/images2.jpg";
import { Link } from "react-router-dom";

export const FreePlan = () => (
  <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 relative text-gray-900">
    {/* Back Button */}
    <div className="absolute top-4 right-4">
      <Link to="/pricing">
        <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-800 transition">
          Back
        </button>
      </Link>
    </div>
    <br/>

    <div className="max-w-6xl mx-auto">
      <center><h2 className="text-4xl font-extrabold text-center mb-4 bg-black rounded text-white w-[170px]">FREE PLAN</h2></center>
      <p className="text-center text-lg mb-10 max-w-2xl mx-auto text-black/60">
        Ideal for casual players looking to enjoy the game and get started with basic tools.
      </p>

      <div className="bg-white/10 shadow-lg rounded-lg p-6 overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-200 text-black text-lg">
              <th className="p-4 border border-gray-300">Feature Image</th>
              <th className="p-4 border border-gray-300">Feature Title</th>
              <th className="p-4 border border-gray-300">Description</th>
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
              <tr key={index} className="hover:bg-gray-100 transition">
                <td className="p-4 border border-gray-300">
                  <img src={img} alt={title} className="w-40 h-28 object-cover rounded" />
                </td>
                <td className="p-4 border border-gray-300 font-semibold text-base">{title}</td>
                <td className="p-4 border border-gray-300 text-green-600 text-base">{desc}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-10 text-center">
          <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-gray-900 transition">
            Choose Free Plan
          </button>
        </div>
      </div>
    </div>
  </div>
);
