import React from 'react';
import { ShieldCheck, User, FileText, AlertCircle, RefreshCcw } from 'lucide-react';
import chesshomeimg from "../assets/chessbgimg.jpg";

const Terms = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-fixed bg-center py-16 px-4 sm:px-6 lg:px-10 flex items-start justify-center"
      style={{ backgroundImage: `url(${chesshomeimg})` }}
    >
      <div className="w-full max-w-6xl bg-gradient-to-br from-black/70 via-gray-900/80 to-gray-800/70 backdrop-blur-lg rounded-3xl shadow-2xl text-white p-10 space-y-12">
        
        {/* Header Section */}
        <header className="text-center">
          <h2 className="text-5xl font-extrabold mb-4 tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-white underline decoration-red-500 underline-offset-8"style={{textDecoration:"none"}}>
            Terms & Conditions
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Please read these terms carefully before using ChessWorld. By using the site, you agree to be bound by the following conditions.
          </p>
        </header>

        {/* Terms Sections */}
        <div className="space-y-10">

          {/* Intro */}
          <section className="bg-white/10 p-6 rounded-xl border border-gray-600 shadow hover:shadow-lg transition">
            <p className="text-lg text-justify text-gray-200">
              Welcome to <span className="font-semibold text-red-400">ChessWorld</span>. By accessing or using our website and services,
              you agree to be bound by these Terms and Conditions. If you do not agree, please refrain from using the platform.
            </p>
          </section>

          {/* Individual Terms */}
          {[
            {
              icon: <ShieldCheck className="text-blue-400" />,
              title: "1. Use of Services",
              description:
                "Our platform is dedicated to helping users learn and grow through chess. You agree to use our services only for lawful purposes and not for any harmful or illegal activities.",
            },
            {
              icon: <User className="text-green-400" />,
              title: "2. User Accounts",
              description:
                "You are responsible for securing your login credentials. If you detect unauthorized activity, please inform us immediately to protect your data and account.",
            },
            {
              icon: <FileText className="text-purple-400" />,
              title: "3. Content",
              description:
                "All materials (articles, puzzles, tools) on ChessWorld are intended for educational use. Reproduction or misuse without permission is strictly prohibited.",
            },
            {
              icon: <AlertCircle className="text-red-400" />,
              title: "4. Limitation of Liability",
              description:
                "We are not liable for damages or losses that arise from your use or inability to use our services. Use ChessWorld at your own risk.",
            },
            {
              icon: <RefreshCcw className="text-yellow-400" />,
              title: "5. Changes to Terms",
              description:
                "We may update these Terms periodically. Continuing to use the site after changes implies that you accept the revised terms.",
            },
          ].map((term, idx) => (
            <section
              key={idx}
              className="bg-white/10 p-6 rounded-xl border border-gray-600 hover:shadow-lg transition-all duration-300"
            >
              <div className="grid grid-cols-[auto,1fr] gap-4 items-start">
                {term.icon}
                <div>
                  <h3 className="text-2xl font-semibold mb-1">{term.title}</h3>
                  <p className="text-gray-200 text-justify">{term.description}</p>
                </div>
              </div>
            </section>
          ))}
        </div>

        {/* Footer Note */}
        <footer className="text-right text-sm text-gray-400 italic mt-6">
          Last updated: May 21, 2025
        </footer>
      </div>
    </div>
  );
};

export default Terms;
