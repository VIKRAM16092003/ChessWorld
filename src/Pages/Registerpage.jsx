import { Link, useNavigate } from "react-router-dom";
import chessbgimg from "../assets/chessbgimg.jpg";
import logo from "../assets/logo.jpg";
import { useState } from "react";


const Registerpage = () => {
    const navigate = useNavigate();

    const [emailOrPhone, setEmailOrPhone] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e) => {
      e.preventDefault();
      setError("");

      // Basic validation
      if (!emailOrPhone.trim()) {
        setError("Please enter your email or phone number");
        return;
      }

      if (!password) {
        setError("Please enter your password");
        return;
      }

      setIsLoading(true);

      // Simulate API call
      setTimeout(() => {
        setIsLoading(false);
        // For demo purposes, any non-empty password will work
        onLogin();
      }, 1000);
    };



  return (
    <>
      <div
        className="bg-grey/40 bg-cover bg-center h-[100vh]"
        style={{ backgroundImage: `url(${chessbgimg})` }}
      >
        <div class="flex flex-row justify-between mb-2 px-[30px]">
          <Link
            to="/"
            className="flex items-center space-x-3 text-white font-semibold"
            style={{ textDecoration: "none" }}
          >
            <img
              src={logo}
              alt="Company Logo"
              className="w-20 h-20 rounded-full object-cover"
            />
            <p
              className="text-[20px] font-bold text-black pt-3 tracking-[1px]"
              style={{ wordSpacing: "-7px", letterSpacing: "0px" }}
            >
              CHESS{" "}
              <span
                class="text-white font-[300] pl-2 tracking-[-1px] text-[20px]
                "
                style={{ letterSpacing: "-3px" }}
              >
                WORLD{" "}
              </span>{" "}
            </p>
            <Link to="/tournaments">Tournaments</Link>
            <Link to="/blitzgame">Blitzgame</Link>
          </Link>
          <button
            className="btn btn-dark mt-3  mb-3 h-[50px] right"
            onClick={() => navigate("/")}
          >
            Back to Home
          </button>
        </div>
        <p
          class="text-white text-center font-sans text-[23px] pb-2
         font-[600]"
        >
          {" "}
          Register to play Tournaments
        </p>
        <div class="w-[30vw] ml-[35vw] flex flex-col px-[154px] py-[50px] bg-[#dae2e6]/20 h-[550px] rounded-[10px] shadow-md mt-[10px] mb-[10px]">
          <div className="login-card">
            <h1 className="login-title">Chess Master Login</h1>

            {error && <div className="error-message">{error}</div>}

            <form onSubmit={handleSubmit} className="login-form">
              <div className="form-group">
                <label htmlFor="emailOrPhone">Email or Phone Number</label>
                <input
                  type="text"
                  id="emailOrPhone"
                  value={emailOrPhone}
                  onChange={(e) => setEmailOrPhone(e.target.value)}
                  placeholder="Enter your email or phone"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="form-input"
                />
              </div>

              <button
                type="submit"
                className="login-button"
                disabled={isLoading}
              >
                {isLoading ? "Logging in..." : "Login"}
              </button>
            </form>

            <div className="login-footer">
              <a href="#" className="forgot-password">
                Forgot password?
              </a>
              <p className="signup-text">
                Don't have an account?{" "}
                <a href="#" className="signup-link">
                  Sign up
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Registerpage;
