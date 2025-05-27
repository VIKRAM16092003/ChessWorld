import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Tournament() {
  const navigate = useNavigate();

  const handleCardClick = (path, value) => {
    navigate(path, { state: { data: value } });
  };

  return (
    <>
      <div
        className="min-h-screen bg-cover bg-center flex items-center justify-center relative"
        style={{ backgroundImage: "url('src/assets/chessbgimg.jpg')" }}
      >
        {/* Background overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50 z-0"></div>

        {/* Back Button Top Left */}
        <button
          className="absolute top-4 left-4 z-20 text-white bg-black/70 hover:bg-black/90 px-4 py-2 rounded flex items-center gap-2"
          onClick={() => navigate("/")}
        >
          ← Back to Play
        </button>
           <button
          className="absolute top-4 right-20 z-20 text-white bg-success hover:bg-black/90 px-4 py-2 rounded flex items-center gap-2"
        >
          {`Balance: $10000`}
        </button>
        <Link to={"/addmoney"}>
         <button
          className="absolute top-4 right-3 z-20 text-white bg-danger hover:bg-black/90 px-4 py-2 rounded flex items-center gap-2"
        >+</button>
        </Link>
       

        {/* Heading with Lines */}
        <div className="z-10 text-center absolute top-20 w-full px-4">
          <div className="flex items-center justify-center gap-4">
            <div className="flex-1 h-px bg-gray-400 opacity-50"></div>
            <h1 className="text-4xl font-extrabold text-white drop-shadow-lg whitespace-nowrap">
              Grand Chess Tournament 2025
            </h1>
            <div className="flex-1 h-px bg-gray-400 opacity-50"></div>
          </div>
          <p className="text-lg text-gray-200 mt-2">
            Click on a prize to explore the challenges and rewards!
          </p>
        </div>

        {/* Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 p-6 z-10 mt-32 max-w-6xl w-full">
          {[
            {
              title: "BIG WINNING",
              amount: "₹1800",
              duration: "1 minute",
              prize: "₹1000",
              path: "/play",
              time: "60",
            },
            {
              title: "JACKPOT",
              amount: "₹900",
              duration: "10 minutes",
              prize: "₹500",
              path: "/play",
              time: "600",
            },
            {
              title: "LUCKY",
              amount: "₹180",
              duration: "90 minutes",
              prize: "₹100",
              path: "/play",
              time: "5400",
            },
          ].map((card, idx) => (
            <div
              key={idx}
              className="glassy glow-card p-6 rounded-3xl shadow-2xl cursor-pointer transform transition-all duration-300 hover:scale-105 border border-white/30 text-white text-center relative overflow-hidden group"
              onClick={() => handleCardClick(card.path, card.time)}
            >
              <div className="absolute inset-0 bg-gradient-to-br to-gray-600-600 opacity-10 group-hover:opacity-20 transition duration-300 z-0 rounded-3xl blur-md"></div>
              <div className="relative z-10">
                <h2 className="text-3xl font-extrabold mb-2 text-yellow-300 drop-shadow-md">
                  {card.title}
                </h2>
                <p className="text-5xl font-black mb-3 text-white drop-shadow-md">
                  {card.amount}
                </p>
                <p className="text-sm mb-1">
                  ⏱ Match Duration:{" "}
                  <span className="font-semibold text-yellow-100">{card.duration}</span>
                </p>
                <p className="text-sm">
                   Bet Amount:{" "}
                  <span className="font-semibold text-green-200">{card.prize}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
