//pricing plans
//basic plan
export const BasicPlan = () => (
  <div className="min-h-screen bg-black py-12 px-4 sm:px-6 lg:px-8 text-gray-900">
    <div className="max-w-4xl mx-auto">
      <h2 className="text-4xl font-extrabold text-center mb-4" style={{color:'orange '}}>BASIC PLAN</h2>
      <p className="text-center text-lg mb-10 max-w-2xl mx-auto text-white">
        Designed for improving players who want deeper insights and structured progress without breaking the bank.
      </p>
      <div className="bg-white/10 shadow-lg rounded-lg p-8">
        <ul className="space-y-4 text-lg text-white">
          <li>✔ All Free features</li>
          <li>✔ Blunder & inaccuracy detection</li>
          <li>✔ 5+ daily puzzles</li>
          <li>✔ Opening explorer access</li>
          <li>✔ Progress dashboard</li>
          <li>✔ Friend chat feature</li>
          <li>✔ Monthly improvement reports</li>
          <li>✔ Priority support</li>
        </ul>
        <div className="mt-10 text-center">
          <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition">
            Choose Basic Plan
          </button>
        </div>
      </div>
    </div>
  </div>
);