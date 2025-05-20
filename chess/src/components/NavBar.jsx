import { Link } from 'react-router-dom';
import logo from '../assets/logo.jpg';

const Navbar = () => {
  return (
    <nav className="bg-white px-6 py-2 shadow-md ">
      <div className="w-98vw flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="!no-underline flex items-center space-x-2 ml-5">
          <img src={logo} alt="Company Logo" className="w-10 h-10 rounded-full object-cover" />
          <span className="text-xl font-semibold "><p className="h4 mt-2 text-black">ChessWorld</p></span>
        </Link>

        {/* Nav Links */}
        <div className="flex items-center space-x-6">
          <Link
  to="/pricing"
  className="btn btn-primary text-white"
>
  Pricing
</Link>

         <Link
  to="/play"
  className="btn btn-success text-white"
>
  Start Free
</Link>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
