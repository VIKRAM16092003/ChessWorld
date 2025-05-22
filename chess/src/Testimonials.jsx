import React from "react";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Arjun R.",
    title: "Intermediate Player",
    feedback: "ChessWorld helped me understand my weak spots and improve my strategy. The personalized reports are incredibly helpful!",
    rating: 5,
  },
  {
    name: "Priya S.",
    title: "Chess Enthusiast",
    feedback: "With the suggested puzzles and consistent tracking, I finally crossed the 1500 rating mark. Highly recommended!",
    rating: 5,
  },
  {
    name: "Daniel M.",
    title: "Chess Coach",
    feedback: "As a coach, I suggest ChessWorld to all my students. The tools available are excellent for guided improvement.",
    rating: 4,
  },
  {
    name: "Neha K.",
    title: "Beginner",
    feedback: "I was intimidated by chess until I joined ChessWorld. The beginner lessons and community support made it fun!",
    rating: 4,
  },
  {
    name: "Samir H.",
    title: "Competitive Player",
    feedback: "I’ve seen real growth in my play since using the opening recommender. It’s like having a personal coach.",
    rating: 5,
  },
  {
    name: "Anita V.",
    title: "College Chess Captain",
    feedback: "The insights and game analysis features helped our team prep better for inter-college tournaments.",
    rating: 5,
  },
  {
    name: "Ravi P.",
    title: "Online Player",
    feedback: "Great platform for casual and serious learners alike. I spend time every evening doing the daily puzzle!",
    rating: 4,
  },
  {
    name: "Zara L.",
    title: "Parent of Junior Player",
    feedback: "My child loves the progress tracking and visuals. It keeps them motivated to learn and play more.",
    rating: 5,
  },
  {
    name: "Karthik D.",
    title: "Developer & Chess Fan",
    feedback: "Clean UI, powerful tools, and a smart engine backing the suggestions — everything a tech-savvy player would want.",
    rating: 5,
  },
  {
    name: "Isha R.",
    title: "Hobbyist",
    feedback: "Whenever I want to relax or sharpen my mind, I log into ChessWorld. It’s the perfect companion for any chess lover.",
    rating: 4,
  },
];

const Testimonials = () => {
  return (
    <div className="max-w-6xl mx-auto p-8 mt-10 text-gray-800">
      <h2 className="text-4xl font-bold text-center mb-10">What Our Users Say</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {testimonials.map((t, index) => (
          <div key={index} className="bg-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transition">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-xl font-semibold text-blue-800">
                {t.name.charAt(0)}
              </div>
              <div>
                <h4 className="font-semibold text-lg">{t.name}</h4>
                <p className="text-sm text-gray-500">{t.title}</p>
              </div>
            </div>
            <p className="text-gray-700 mb-4">“{t.feedback}”</p>
            <div className="flex gap-1 text-yellow-500">
              {[...Array(t.rating)].map((_, i) => (
                <Star key={i} size={18} fill="currentColor" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
