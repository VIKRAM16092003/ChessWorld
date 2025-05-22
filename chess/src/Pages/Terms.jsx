import React from 'react';
import { ShieldCheck, User, FileText, AlertCircle, RefreshCcw } from 'lucide-react';

const Terms = () => {
  return (
    <div className="max-w-6xl mx-auto mt-12 px-6 py-10 bg-gradient-to-br from-white via-slate-50 to-gray-100 rounded-3xl shadow-2xl scroll-smooth">
      <h2 className="text-5xl font-extrabold text-center text-gray-900 mb-12 tracking-wide underline decoration-red-500 underline-offset-8">
        Terms & Conditions
      </h2>

      <div className="grid gap-8">
        
        <section className="bg-white/60 rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200">
          <p className="text-lg text-gray-700 leading-relaxed text-justify">
            Welcome to <span className="font-semibold text-red-600">ChessWorld</span>. By accessing or using our website and services,
            you agree to be bound by these Terms and Conditions. If you do not agree, please refrain from using the platform.
          </p>
        </section>

        <section className="bg-white/60 rounded-xl p-6 shadow-md hover:shadow-lg border border-gray-200">
          <div className="flex items-center gap-3 mb-2">
            <ShieldCheck className="text-blue-600" />
            <h3 className="text-2xl font-semibold">1. Use of Services</h3>
          </div>
          <p className="text-gray-700 text-justify leading-relaxed">
            Our platform is dedicated to helping users learn and grow through chess. You agree to use our services only for lawful purposes and not for any harmful or illegal activities.
          </p>
        </section>

        <section className="bg-white/60 rounded-xl p-6 shadow-md hover:shadow-lg border border-gray-200">
          <div className="flex items-center gap-3 mb-2">
            <User className="text-green-600" />
            <h3 className="text-2xl font-semibold">2. User Accounts</h3>
          </div>
          <p className="text-gray-700 text-justify leading-relaxed">
            You are responsible for securing your login credentials. If you detect unauthorized activity, please inform us immediately to protect your data and account.
          </p>
        </section>

        <section className="bg-white/60 rounded-xl p-6 shadow-md hover:shadow-lg border border-gray-200">
          <div className="flex items-center gap-3 mb-2">
            <FileText className="text-purple-600" />
            <h3 className="text-2xl font-semibold">3. Content</h3>
          </div>
          <p className="text-gray-700 text-justify leading-relaxed">
            All materials (articles, puzzles, tools) on ChessWorld are intended for educational use. Reproduction or misuse without permission is strictly prohibited.
          </p>
        </section>

        <section className="bg-white/60 rounded-xl p-6 shadow-md hover:shadow-lg border border-gray-200">
          <div className="flex items-center gap-3 mb-2">
            <AlertCircle className="text-red-500" />
            <h3 className="text-2xl font-semibold">4. Limitation of Liability</h3>
          </div>
          <p className="text-gray-700 text-justify leading-relaxed">
            We are not liable for damages or losses that arise from your use or inability to use our services. Use ChessWorld at your own risk.
          </p>
        </section>

       
        <section className="bg-white/60 rounded-xl p-6 shadow-md hover:shadow-lg border border-gray-200">
          <div className="flex items-center gap-3 mb-2">
            <RefreshCcw className="text-yellow-500" />
            <h3 className="text-2xl font-semibold">5. Changes to Terms</h3>
          </div>
          <p className="text-gray-700 text-justify leading-relaxed">
            We may update these Terms periodically. Continuing to use the site after changes implies that you accept the revised terms.
          </p>
        </section>

        <p className="text-sm text-right text-gray-500 italic mt-6">Last updated: May 21, 2025</p>
      </div>
    </div>
  );
};

export default Terms;
