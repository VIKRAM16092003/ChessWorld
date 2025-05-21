import { Link } from 'react-router-dom';
import logo from '../assets/logo.jpg';

const Navbar = () => {
  return (
    <nav className="bg-black text-white px-6 py-4 shadow-md ">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
       <Link to="/" className="flex items-center space-x-2 no-underline">
  <img src={logo} alt="Company Logo" className="w-15 h-15 rounded-full object-cover" />
  <h1 className="text-white">Chess World</h1>
</Link>


        {/* Nav Links */}
        <div className="flex items-center space-x-6">
          <Link to="/pricing" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition">Pricing</Link>
          <Link
            to="/about"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
          >
            Start Free
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
