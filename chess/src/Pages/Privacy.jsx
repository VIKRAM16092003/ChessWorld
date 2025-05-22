
import {
  Lock,
  Info,
  ShieldCheck,
  Share2,
  Cookie,
  UserCheck
} from 'lucide-react';

const Privacy = () => {
  return (
    <div className="max-w-6xl mx-auto mt-12 px-6 py-10 bg-gradient-to-br from-white via-slate-50 to-gray-100 rounded-3xl shadow-2xl scroll-smooth">
      <h2 className="text-5xl font-extrabold text-center text-gray-900 mb-12 tracking-wide underline decoration-blue-500 underline-offset-8">
        Privacy Policy
      </h2>

      <div className="grid gap-8 text-gray-800">
        
        <section className="bg-white/60 rounded-xl p-6 shadow-md hover:shadow-lg border border-gray-200">
          <p className="text-lg text-justify leading-relaxed">
            At <span className="font-semibold text-blue-600">ChessWorld</span>, we respect your privacy and are committed to protecting your personal information.
            This Privacy Policy outlines how we collect, use, and safeguard the data you provide.
          </p>
        </section>

        <section className="bg-white/60 rounded-xl p-6 shadow-md hover:shadow-lg border border-gray-200">
          <div className="flex items-center gap-3 mb-2">
            <Info className="text-purple-600" />
            <h3 className="text-2xl font-semibold">1. Information We Collect</h3>
          </div>
          <p className="text-justify">
            We may collect personal information such as your name, email address, and preferences when you register, use features, or contact us.
          </p>
        </section>

        <section className="bg-white/60 rounded-xl p-6 shadow-md hover:shadow-lg border border-gray-200">
          <div className="flex items-center gap-3 mb-2">
            <UserCheck className="text-green-600" />
            <h3 className="text-2xl font-semibold">2. How We Use Your Information</h3>
          </div>
          <p className="text-justify">
            Your data helps us personalize your experience, improve our platform, respond to inquiries, and send relevant updates or notifications.
          </p>
        </section>

        <section className="bg-white/60 rounded-xl p-6 shadow-md hover:shadow-lg border border-gray-200">
          <div className="flex items-center gap-3 mb-2">
            <ShieldCheck className="text-blue-500" />
            <h3 className="text-2xl font-semibold">3. Data Security</h3>
          </div>
          <p className="text-justify">
            We implement strong security measures to protect your information, but no system is 100% secure. Use strong passwords and never share them.
          </p>
        </section>


        <section className="bg-white/60 rounded-xl p-6 shadow-md hover:shadow-lg border border-gray-200">
          <div className="flex items-center gap-3 mb-2">
            <Share2 className="text-red-600" />
            <h3 className="text-2xl font-semibold">4. Sharing Your Information</h3>
          </div>
          <p className="text-justify">
            We do not sell or trade your personal data. Trusted partners may assist us in operating the platform under strict privacy conditions.
          </p>
        </section>

        <section className="bg-white/60 rounded-xl p-6 shadow-md hover:shadow-lg border border-gray-200">
          <div className="flex items-center gap-3 mb-2">
            <Cookie className="text-yellow-500" />
            <h3 className="text-2xl font-semibold">5. Cookies</h3>
          </div>
          <p className="text-justify">
            ChessWorld may use cookies to enhance user experience and analyze general usage. You may disable them through browser settings.
          </p>
        </section>

        <section className="bg-white/60 rounded-xl p-6 shadow-md hover:shadow-lg border border-gray-200">
          <div className="flex items-center gap-3 mb-2">
            <Lock className="text-teal-600" />
            <h3 className="text-2xl font-semibold">6. Your Rights</h3>
          </div>
          <p className="text-justify">
            You have the right to access, update, or delete your personal information. Reach out to us if you’d like to exercise these rights.
          </p>
        </section>

        <p className="text-sm text-right text-gray-500 italic mt-6">
          Last updated: May 21, 2025
        </p>
      </div>
    </div>
  );
};

export default Privacy;
