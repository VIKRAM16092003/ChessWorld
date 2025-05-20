import friend from '../assets/friend-chat.png';
import monthly from "../assets/monthly-reports.png";
import dashboard from "../assets/progress-dashboard.jpg";
import priority from "../assets/priority.jpg";
import explorer from "../assets/explorer-access.png";
import feature from "../assets/features.png";
import { Link } from "react-router-dom";

export const BasicPlan = () => (
  <div className="min-h-screen bg-black py-12 px-4 sm:px-6 lg:px-8 text-gray-900 relative">
    
    {/* Back Button */}
    <div className="absolute top-4 right-4">

      <Link to="/">
      <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-800 transition">
        Back
      </button>
      </Link>
    </div>

    <div className="max-w-4xl mx-auto">
      <h2 className="text-4xl font-extrabold text-center mb-4" style={{ color: 'orange' }}>BASIC PLAN</h2>
      <p className="text-center text-lg mb-10 max-w-2xl mx-auto text-white">
        Designed for improving players who want deeper insights and structured progress without breaking the bank.
      </p>
      <div className="bg-white/10 shadow-lg rounded-lg p-8">
        <ul className="space-y-4 text-lg text-white">

          <li className="flex items-center space-x-6 mb-1px border-b">
            <img src={feature} alt="All Free features" className="w-70 h-32 rounded-lg" />
            <p className="ml-[50px]"> All Free features</p><br />
            <p className="text-green-600 ml-[20px]">
              Users can sign up for free and create a personal account. This helps in saving preferences and data.
            </p>
          </li>

          <li className="flex items-center space-x-6 mb-1px border-b">
            <img src={explorer} alt="Explorer access" className="w-70 h-32 rounded-lg" />
            <p className="ml-[90px]"> Opening explorer access</p><br />
            <p className="text-green-600 ml-[5px]">
              Users can freely access the file explorer to view and manage files. It allows browsing, opening, and organizing documents without restrictions.
            </p>
          </li>

          <li className="flex items-center space-x-6 mb-1px border-b">
            <img src={dashboard} alt="Progress dashboard" className="w-70 h-32 rounded-lg" />
            <p className="ml-[100px]"> Progress dashboard</p><br />
            <p className="text-green-600 ml-[5px]">
              A progress dashboard displays real-time updates on tasks or goals. It helps users track performance and stay organized visually.
            </p>
          </li>

          <li className="flex items-center space-x-6 mb-1px border-b">
            <img src={friend} alt="Friend chat" className="w-70 h-32 rounded-lg" />
            <p className="ml-[65px]"> Friend chat feature</p><br />
            <p className="text-green-600 ml-[20px]">
              Users can chat with friends in real-time through a built-in messaging system. It supports text messages, emojis, and instant notifications.
            </p>
          </li>

          <li className="flex items-center space-x-6 mb-1px border-b">
            <img src={monthly} alt="Monthly reports" className="w-70 h-32 rounded-lg" />
            <p className="ml-[85px]"> Monthly improved reports</p><br />
            <p className="text-green-600 ml-[5px]">
              Users receive detailed reports every month with updated insights. These reports highlight progress, trends, and areas for improvement.
            </p>
          </li>

          <li className="flex items-center space-x-6 mb-1px border-b">
            <img src={priority} alt="Priority support" className="w-70 h-32 rounded-lg" />
            <p className="ml-[110px]"> Priority support</p><br />
            <p className="text-green-600 ml-[20px]">
              Priority support gives users faster response times and dedicated help. Issues are resolved more quickly compared to standard support.
            </p>
          </li>

        </ul>
        <div className="mt-10 text-center">
          <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition">
            Choose Basic Plan
          </button>
        </div>
      </div>
    </div>
  </div>
);
