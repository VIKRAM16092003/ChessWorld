import friend from '../assets/friend-chat.png';
import monthly from "../assets/monthly-reports.png";
import dashboard from "../assets/progress-dashboard.jpg";
import priority from "../assets/priority.jpg";
import explorer from "../assets/explorer-access.png";
import feature from "../assets/features.png";
import { Link } from "react-router-dom";
import chesshomeimg from "../assets/chessbgimg.jpg";

export const BasicPlan = () => (
  <div
    className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 relative text-gray-900 bg-cover bg-center bg-no-repeat"
    style={{
      backgroundImage: `url(${chesshomeimg})`,
      backgroundAttachment: "fixed",
    }}
  >
    {/* Dark overlay to match FreePlan */}
    <div className="absolute inset-0 bg-black/60 pointer-events-none"></div>

    {/* Back Button */}
    <div className="absolute top-4 right-4 z-20">
      <Link to="/pricing">
        <button className="bg-black text-white px-4 py-2 rounded hover:text-black-500 transition">
          Back
        </button>
      </Link>
    </div>
    <br/>

    <div className="relative z-10 max-w-6xl mx-auto">
      <center>
        <h2 className="text-4xl font-extrabold text-center mb-4 rounded text-white w-[200px] pt-[2px] pb-[2px]">
          BASIC PLAN
        </h2>
      </center>
      <p className="text-center text-lg mb-10 max-w-2xl mx-auto text-white/80">
        Designed for improving players who want deeper insights and structured progress without breaking the bank.
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
                img: feature,
                title: "All Free Features",
                desc: "Users can sign up for free and create a personal account. This helps in saving preferences and data."
              },
              {
                img: explorer,
                title: "Opening Explorer Access",
                desc: "Users can freely access the file explorer to view and manage files. It allows browsing, opening, and organizing documents without restrictions."
              },
              {
                img: dashboard,
                title: "Progress Dashboard",
                desc: "A progress dashboard displays real-time updates on tasks or goals. It helps users track performance and stay organized visually."
              },
              {
                img: friend,
                title: "Friend Chat Feature",
                desc: "Users can chat with friends in real-time through a built-in messaging system. It supports text messages, emojis, and instant notifications."
              },
              {
                img: monthly,
                title: "Monthly Improved Reports",
                desc: "Users receive detailed reports every month with updated insights. These reports highlight progress, trends, and areas for improvement."
              },
              {
                img: priority,
                title: "Priority Support",
                desc: "Priority support gives users faster response times and dedicated help. Issues are resolved more quickly compared to standard support."
              },
            ].map(({ img, title, desc }, index) => (
              <tr key={index}>
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
          <button className="bg-white text-black px-6 py-2 rounded hover:bg-black-200 transition">
            Choose Basic Plan
          </button>
        </div>
      </div>
    </div>
  </div>
);
