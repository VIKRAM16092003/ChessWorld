//prcing plans
//premium plans
export const PremiumPlan = () => (
  <div className="min-h-screen bg-black py-12 px-4 sm:px-6 lg:px-8 text-gray-900">
    <div className="max-w-4xl mx-auto">
      <h2 className="text-4xl font-extrabold text-center mb-4" style={{ color: '#FFD700' }}>PREMIUM PLAN</h2>
      <p className="text-center text-lg mb-10 max-w-2xl mx-auto" style={{color:'grey'}}>
        Perfect for competitive players seeking maximum insight, tools, and support.
      </p>
      <div className="bg-white/10 shadow-lg rounded-lg p-8">
        <ul className="space-y-4 text-lg text-white">
          <li>✔ All Basic features</li>
          <li>✔ AI-powered coach suggestions</li>
          <li>✔ Game replay with commentary</li>
          <li>✔ Custom training routines</li>
          <li>✔ Advanced analytics</li>
          <li>✔ Premium-only tournaments</li>
          <li>✔ Personalized opponent prep</li>
          <li>✔ One-on-one mentor sessions</li>
          <li>✔ Early access to new features</li>
        </ul>
        <div className="mt-10 text-center">
          <button className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-yellow-600 transition">
            Choose Premium Plan
          </button>
        </div>
      </div>
    </div>
  </div>
);