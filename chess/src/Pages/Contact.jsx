import React from 'react';
import { Mail, MapPin, Phone, Globe } from 'lucide-react';
import chesshomeimg from "../assets/chessbgimg.jpg";

const Contact = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed flex items-center justify-center py-16 px-4"
      style={{ backgroundImage: `url(${chesshomeimg})` }}
    >
      <div className="max-w-2xl w-full bg-gradient-to-br from-black/70 via-gray-900/80 to-gray-800/70 backdrop-blur-xl text-white shadow-2xl rounded-2xl p-10">
        <h2 className="text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-white mb-8">
          Contact ChessWorld
        </h2>

        <div className="space-y-6 text-lg">
          <div className="flex items-center gap-4">
            <Mail className="text-yellow-400" />
            <span>
              Email: <a href="mailto:support@chessworld.com" className="text-yellow-300 hover:underline">support@chessworld.com</a>
            </span>
          </div>

          <div className="flex items-center gap-4">
            <Phone className="text-green-400" />
            <span>
              Phone: <a href="tel:+1234567890" className="text-yellow-300 hover:underline">+1 (234) 567-890</a>
            </span>
          </div>

          <div className="flex items-center gap-4">
            <MapPin className="text-red-400" />
            <span>
              Location: 123 Chess Ave, Strategy City, World
            </span>
          </div>

          <div className="flex items-center gap-4">
            <Globe className="text-purple-400" />
            <span>
              Website: <a href="https://www.chessworld.com" target="_blank" rel="noopener noreferrer" className="text-yellow-300 hover:underline">www.chessworld.com</a>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
