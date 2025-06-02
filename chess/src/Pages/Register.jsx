import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import chessbgimg from "../assets/chessbgimg.jpg";
import logo from "../assets/logo.jpg";

const Registerpage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState(""); 
  const showAlert = (message, type) => {
    setAlertMessage(message);
    setAlertType(type);
    setTimeout(() => {
      setAlertMessage("");
      setAlertType("");
    }, 3000);
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    const params = new URLSearchParams();
    params.append("email", email);
    params.append("password", password);

    try {
      const response = await fetch("http://localhost:8081/reg", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: params.toString(),
      });

      if (response.ok) {
        showAlert("Registration successful!", "success");
        setTimeout(() => navigate("/"), 2000);
      } else {
        const errorText = await response.text();
        showAlert("Registration failed: " + errorText, "error");
      }
    } catch (error) {
      console.error("Network error:", error);
      showAlert("Error: " + error.message, "error");
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col relative"
      style={{ backgroundImage: `url(${chessbgimg})` }}
    >
      {/* Top Alert */}
      {alertMessage && (
        <div
          className={`absolute top-4 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-md shadow-lg text-center z-50 font-semibold w-[90%] max-w-xl ${
            alertType === "success"
              ? "bg-green-500 text-white"
              : "bg-red-500 text-white"
          }`}
        >
          {alertMessage}
        </div>
      )}

      {/* Header */}
      <div className="flex justify-between items-center px-[30px] py-4">
        <Link
          to="/"
          className="flex items-center space-x-3 text-white font-semibold"
        >
          <img
            src={logo}
            alt="Company Logo"
            className="w-20 h-20 rounded-full object-cover"
          />
          <p className="text-[40px] font-bold text-black pt-3"style={{textDecoration:"none"}}>
            CHESS <span className="text-white text-[30px]">WORLD</span>
          </p>
        </Link>
        <button
          className="bg-black text-white px-1 py-2 rounded hover:bg-white hover:text-black transition"
          onClick={() => navigate("/")}
        >
          Back to Home
        </button>
      </div>

      {/* Title */}
      <p className="text-white text-center text-[23px] font-semibold mb-4">
        REGISTER
      </p>

      {/* Form Container */}
      <div className="flex-grow flex justify-center items-center">
        <div className="bg-[#dae2e6]/20 backdrop-blur-md p-10 rounded-[10px] shadow-lg w-full max-w-md">
          <form className="space-y-6" onSubmit={handleRegister}>
            <div>
              <label className="text-white block mb-2 font-bold" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full p-3 h-[50px] rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-white bg-transparent"
                required
              />
            </div>

            <div>
              <label className="text-white block mb-2 font-bold" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full p-3 h-[50px] rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-white bg-transparent"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white p-3 rounded-md font-semibold hover:bg-white hover:text-black transition"
            >
              Register
            </button>

            <center>
              <p className="text-white pt-2">
                Already have an account?
                <a className="text-black underline pl-1" href="/login">
                  Login
                </a>
              </p>
            </center>
          </form>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center text-white py-4">
        © 2025 Chess World. All rights reserved.
      </footer>
    </div>
  );
};

export default Registerpage;
 