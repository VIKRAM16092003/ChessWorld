import {
  Lock,
  Info,
  ShieldCheck,
  Share2,
  Cookie,
  UserCheck
} from 'lucide-react';
import chesshomeimg from "../assets/chessbgimg.jpg";

const Privacy = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-fixed bg-center py-20 px-4 sm:px-6 lg:px-8 flex items-start justify-center"
      style={{ backgroundImage: `url(${chesshomeimg})` }}
    >
      <div className="w-full max-w-6xl backdrop-blur-md bg-black/60 rounded-3xl shadow-2xl text-white p-10 space-y-12">

        {/* Heading */}
        <header className="text-center">
          <h2 className="text-5xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-white underline decoration-blue-500 underline-offset-8"style={{textDecoration:"none"}}>
            Privacy Policy
          </h2>
          <p className="text-gray-300 text-lg">
            How we handle your data at <span className="font-semibold text-blue-300">ChessWorld</span>.
          </p>
        </header>

        {/* Sections */}
        <section className="grid gap-8 text-base leading-relaxed">
          {/* Intro */}
          <div className="bg-white/10 border border-white/20 rounded-xl p-6 shadow hover:shadow-lg">
            <p className="text-justify text-gray-200">
              At <span className="font-semibold text-blue-400">ChessWorld</span>, we respect your privacy and are committed to protecting your personal information. This Privacy Policy outlines how we collect, use, and safeguard the data you provide.
            </p>
          </div>

          {/* Sections */}
          {[
            {
              icon: <Info className="text-purple-400" />,
              title: "1. Information We Collect",
              text: "We may collect personal information such as your name, email address, and preferences when you register, use features, or contact us.",
            },
            {
              icon: <UserCheck className="text-green-400" />,
              title: "2. How We Use Your Information",
              text: "Your data helps us personalize your experience, improve our platform, respond to inquiries, and send relevant updates or notifications.",
            },
            {
              icon: <ShieldCheck className="text-blue-400" />,
              title: "3. Data Security",
              text: "We implement strong security measures to protect your information, but no system is 100% secure. Use strong passwords and never share them.",
            },
            {
              icon: <Share2 className="text-red-400" />,
              title: "4. Sharing Your Information",
              text: "We do not sell or trade your personal data. Trusted partners may assist us in operating the platform under strict privacy conditions.",
            },
            {
              icon: <Cookie className="text-yellow-400" />,
              title: "5. Cookies",
              text: "ChessWorld may use cookies to enhance user experience and analyze general usage. You may disable them through browser settings.",
            },
            {
              icon: <Lock className="text-teal-400" />,
              title: "6. Your Rights",
              text: "You have the right to access, update, or delete your personal information. Reach out to us if you’d like to exercise these rights.",
            },
          ].map((section, idx) => (
            <div
              key={idx}
              className="bg-white/10 border border-white/20 rounded-xl p-6 shadow hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-2">
                {section.icon}
                <h3 className="text-2xl font-semibold text-white">
                  {section.title}
                </h3>
              </div>
              <p className="text-justify text-gray-200">{section.text}</p>
            </div>
          ))}
        </section>

        {/* Footer */}
        <footer className="text-right text-sm text-gray-400 italic">
          Last updated: May 21, 2025
        </footer>
      </div>
    </div>
  );
};

export default Privacy;
