import React from 'react';
import bg from '../assets/chessbgimg.jpg';
import {Link} from 'react-router-dom';

function RazorPay() {
  
  return (
    <div
  className="flex items-center justify-center min-h-screen px-4 bg-cover bg-center relative"
  style={{
    backgroundImage: `url('${bg}')`,
  }}
>
      <div className="bg-white/20 backdrop-blur-md rounded-2xl shadow-2xl p-8 max-w-md w-full text-center border border-white/30">
  <h1 className="text-3xl font-bold text-white mb-4 tracking-wide">
    Join <span className="text-black">ChessWorld</span> Tournament
  </h1>
  <p className="text-white/80 text-lg mb-6">Entry Fee: ₹50</p>

  
    <Link to="https://razorpay.me/@chessworld?amount=EPec5evqGoRk2C8icWNJlQ%3D%3D">
    <button className="bg-black/60 hover:bg-black active:bg-black text-white font-semibold py-2.5 px-8 rounded-full transition-all duration-200 shadow-md hover:shadow-lg rounded">
      Pay Now
    </button></Link>
</div>

    </div>
  );
}

export default RazorPay;
