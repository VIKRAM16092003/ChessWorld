import image1 from '../assets/image1.png';
import image3 from "../assets/image3.jpg";
import image4 from "../assets/image4.png";

export const FreePlan = () => (
  <div className="min-h-screen bg-black py-12 px-4 sm:px-6 lg:px-8">
    <div className="max-w-4xl mx-auto">
      <h2 className="text-4xl font-extrabold text-center mb-4" style={{ color: 'blue' }}>FREE PLAN</h2>
      <p className="text-center text-lg mb-10 max-w-2xl mx-auto" style={{ color: 'grey' }}>
        Ideal for casual players looking to enjoy the game and get started with basic tools.
      </p>
      <div className="bg-white/10 shadow-lg rounded-lg p-8">
        <ul className="space-y-8 text-lg text-white">
          <li className="flex items-center space-x-6 mb-1px border-b mt-[-10px]">
            <img src={image1} alt="Unlimited casual games" className="w-32 h-32 rounded-lg" />
            <p className="text-right ml-[90px]">✔ Unlimited casual games</p><br/>
            <p className="text-green-600 ">Enjoy unlimited casual chess games without any restrictions—perfect for practice, fun, and honing your skills at your own pace</p>
          </li>
          <li className="flex items-center space-x-6 mb-1px border-b">
            <img src={image4} alt="Basic game feedback" className="w-60 h-32 rounded-lg" />
            <p className="text-right">✔ Basic game feedback</p><br/>
            <p className="text-green-600">Receive instant feedback on your games with highlights of key moves, helping you understand mistakes and improve gradually</p>
          </li>
          <li className="flex items-center space-x-6 mb-1px border-b">
            <img src={image3} alt="Limited opening strategies" className="w-70 h-32 rounded-lg" />
            <p className="ml-[120px]">✔ Limited opening strategies</p><br/>
            <p className="text-green-600 ml-[-30px]">
              Access a curated set of common chess openings to build a strong foundation and start your games with confidence
            </p>
          </li>
        </ul>
        <div className="mt-10 text-center">
          <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-gray-900 transition">
            Choose Free Plan
          </button>
        </div>
      </div>
    </div>
  </div>
);