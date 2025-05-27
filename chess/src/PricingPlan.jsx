import { Link } from "react-router-dom";
import chesshomeimg from "./assets/chessbgimg.jpg";

function Pricing() {
  return (
    <>
      <style>
        {`
          .plan-card {
            background-color: rgba(255, 255, 255, 0.3); /* semi-transparent */
            backdrop-filter: blur(8px); /* glassmorphism */
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            border-radius: 0.75rem;
            border: 1px solid #d1d5db;
          }

          .plan-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.3); /* darker shadow */
}


          .plan-button {
            width: 100%;
            padding: 0.6rem;
            border-radius: 0.375rem;
            font-weight: bold;
            transition: all 0.3s ease;
          }

          .free-btn {
            background-color: #fff;
            color: #374151;
            border: 1px solid #00796b;
          }

          .basic-btn {
            background-color: #fff;
            color: #374151;
            border: 1px solid #5e35b1;
          }

          .premium-btn {
            background-color: #fff;
            color: #374151;
            border: 1px solid #ef6c00;
          }

          .heading-wrapper {
            display: flex;
            align-items: center;
            gap: 4rem;
            margin-bottom: 4rem;
          }

          .line {
            flex-grow: 1;
            height: 2px;
            background-color: #cbd5e1;
            border-radius: 1px;
          }

          .heading-text {
             
            font-weight: 800;
            font-size: 2.25rem;
            color: #fff;
          }
        `}
      </style>

      <section
  className="min-h-screen flex flex-col justify-center px-6 py-16 text-center bg-cover bg-center bg-no-repeat"
  style={{
    backgroundImage: `url(${chesshomeimg})`,
    backgroundAttachment: "fixed",
  }}
>
  <Link to={"/"}><button
          className="absolute top-20 left-20 text-white bg-dark hover:bg-black/90 px-4 py-2 rounded flex items-center gap-2"
        >
          Back To Home
        </button>
</Link>
  
        <div className="max-w-6xl mx-auto">
          
          <div className="heading-wrapper">
            <div className="line" />
            <h2 className="heading-text">Choose Your Plan</h2>
            <div className="line" />
          </div>

          <div className="grid gap-10 grid-cols-1 md:grid-cols-3 mt-[5%]">
            {/* Free Plan */}
            <Link to="/freePlan" style={{ textDecoration: "none" }}>
              <div className="plan-card p-8 text-left text-black">
                <h3 className="text-lg font-bold text-teal-700 mb-2">
                  Free Plan
                </h3>
                <p className="text-sm text-gray-700 mb-6">
                  
                  <h6>Basic access to features and limited content.</h6>
                </p>
                <button className="plan-button free-btn">Select</button>
              </div>
            </Link>

            {/* Basic Plan */}
            <Link to="/basicPlan" style={{ textDecoration: "none" }}>
              <div className="plan-card p-8 text-left text-black">
                <h3 className="text-lg font-bold text-purple-700 mb-2">
                  Basic Plan
                </h3>
                <p className="text-sm text-gray-700 mb-6">
                  <h6>Unlock more puzzles and track your progress.</h6>
                </p>
                <button className="plan-button basic-btn">Select</button>
              </div>
            </Link>

            {/* Premium Plan */}
            <Link to="/premiumPlan" style={{ textDecoration: "none" }}>
              <div className="plan-card p-8 text-left text-black">
                <h3 className="text-lg font-bold text-orange-700 mb-2">
                  Premium Plan
                </h3>
                <p className="text-sm text-gray-700 mb-6">
                  <h6>Full access to all features and tools without lag.</h6>
                </p>
                <button className="plan-button premium-btn">Select</button>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default Pricing;
