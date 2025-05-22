import { Link } from "react-router-dom";

function Pricing() {
  return (
    <>
      <style>
        {`
          .plan-card {
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }

          .plan-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
          }

          .plan-button {
            width: 100%;
            padding: 0.6rem;
            border-radius: 0.375rem;
            font-weight: bold;
            transition: all 0.3s ease;
          }

          .free-btn {
            background-color: #e0f7fa;
            color: #00796b;
            border: 1px solid #00796b;
          }

          .free-btn:hover {
            background-color: #00796b;
            color: #ffffff;
          }

          .basic-btn {
            background-color: #ede7f6;
            color: #5e35b1;
            border: 1px solid #5e35b1;
          }

          .basic-btn:hover {
            background-color: #5e35b1;
            color: #ffffff;
          }

          .premium-btn {
            background-color: #fff3e0;
            color: #ef6c00;
            border: 1px solid #ef6c00;
          }

          .premium-btn:hover {
            background-color: #ef6c00;
            color: #ffffff;
          }
        `}
      </style>

      <section className="px-6 py-16 bg-gray-50 text-center text-gray-800">
        <h2 className="text-4xl font-extrabold mb-12">Choose Your Plan</h2>

        <div className="grid gap-10 grid-cols-1 md:grid-cols-3 max-w-6xl mx-auto mt-[5%]">
          {/* Free Plan */}
          <Link to="/freePlan" style={{ textDecoration: "none" }}>
            <div className="plan-card bg-white border border-gray-300 rounded-lg p-8 text-left">
              <h3 className="text-lg font-bold text-teal-700 mb-2">Free Plan</h3>
              <p className="text-sm text-gray-600 mb-6">Basic access to features and limited content.</p>
              <button className="plan-button free-btn">Select</button>
            </div>
          </Link>

          {/* Basic Plan */}
          <Link to="/basicPlan"style={{ textDecoration: "none" }}>
            <div className="plan-card bg-white border border-gray-300 rounded-lg p-8 text-left">
              <h3 className="text-lg font-bold text-purple-700 mb-2">Basic Plan</h3>
              <p className="text-sm text-gray-600 mb-6">Unlock more puzzles and track your progress.</p>
              <button className="plan-button basic-btn">Select</button>
            </div>
          </Link>

          {/* Premium Plan */}
          <Link to="/premiumPlan" style={{ textDecoration: "none" }}>
            <div className="plan-card bg-white border border-gray-300 rounded-lg p-8 text-left">
              <h3 className="text-lg font-bold text-orange-700 mb-2">Premium Plan</h3>
              <p className="text-sm text-gray-600 mb-6">Full access to all features and tools.</p>
              <button className="plan-button premium-btn">Select</button>
            </div>
          </Link>
        </div>
      </section>
    </>
  );
}

export default Pricing;
