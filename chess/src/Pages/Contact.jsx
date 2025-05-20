import React from 'react';
import { Mail, MapPin, Phone, Globe } from 'lucide-react';

const Contact = () => {
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-2xl mt-10">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Contact ChessWorld</h2>
      <div className="space-y-4 text-gray-700 text-lg">
        <div className="flex items-center gap-3">
          <Mail className="text-blue-600" /> 
          <span>Email: <a href="mailto:support@chessworld.com" className="text-blue-600 hover:underline">support@chessworld.com</a></span>
        </div>
        <div className="flex items-center gap-3">
          <Phone className="text-green-600" />
          <span>Phone: <a href="tel:+1234567890" className="text-blue-600 hover:underline">+1 (234) 567-890</a></span>
        </div>
        <div className="flex items-center gap-3">
          <MapPin className="text-red-600" />
          <span>Location: 123 Chess Ave, Strategy City, World</span>
        </div>
        <div className="flex items-center gap-3">
          <Globe className="text-purple-600" />
          <span>Website: <a href="https://www.chessworld.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">www.chessworld.com</a></span>
        </div>
      </div>
    </div>
  );
};

export default Contact;
