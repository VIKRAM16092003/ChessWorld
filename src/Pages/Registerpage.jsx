import { useNavigate,Link } from "react-router-dom";
import chessbgimg from "../assets/chessbgimg.jpg";
import logo from "../assets/logo.jpg";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8081/log")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched users:", data);
        setUsers(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      Swal.fire({
        icon: "success",
        title: "Login Successful",
        text: "Welcome back!",
        timer: 1500,
        showConfirmButton: false,
      }).then(() => {
        navigate("/");
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: "Incorrect email or password.",
      });
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col relative"
      style={{ backgroundImage: `url(${chessbgimg})` }}
    >
      {/* Header */}
      <div className="flex justify-between items-center px-[30px] py-4">
        <div class="flex w-[90vw] flex-row justify-between mb-2  px-[30px]">
          <Link
            to="/"
            className="flex items-center space-x-3 text-white font-semibold p-4"
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
                class="text-white font-[300] tracking-[-1px] pl-2 text-[20px]
                "
                style={{ letterSpacing: "-3px" }}
              >
                WORLD{" "}
              </span>{" "}
            </p>
          </Link>
          <button
            className="w-[130px]  rounded-[10px] bg-[#047857] hover:bg-[#065f46] text-[#F2F2F2] font-[500]   mb-3 h-[45px] right"
            style={{ borderRadius: "10px", marginTop: "30px" }}
            onClick={() => navigate("/")}
          >
            Back to Home
          </button>
        </div>
      </div>

      {/* Title */}
      <p className="text-white text-center text-[23px] font-semibold mb-4">
        Login to your account
      </p>

      {/* Form Container */}
      <div className="flex-grow flex justify-center items-center">
        <div className="bg-[#dae2e6]/20 backdrop-blur-md p-10 rounded-[10px] shadow-lg w-full max-w-md">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="text-white block mb-2 font-bold"
              >
                Email
              </label>
              <input
                id="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full p-3 h-[50px] rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-white bg-transparent"
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="text-white block mb-2 font-bold"
              >
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
              className="w-full bg-black text-white p-2 rounded-md font-semibold hover:bg-white hover:text-black transition"
            >
              Login
            </button>
          </form>

          <div className="mt-4 text-center text-white">
            <a href="#" className="underline hover:text-gray-300">
              Forgot password?
            </a>
            <p className="pt-2">
              Don't have an account?{" "}
              <a
                href="/register"
                className="text-black underline hover:text-gray-700"
              >
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center text-white py-4">
        © 2025 Chess World. All rights reserved.
      </footer>
    </div>
  );
}

export default Login;