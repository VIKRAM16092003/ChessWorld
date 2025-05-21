import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

const Navbar = () => {
  return (
     <div className="border-bottom border-dark shadow-sm">
    <nav className="bg-indigo-100 px-6 py-2 shadow-md  ">
      <div className="w-98vw flex justify-between items-center">
        {/* Logo */}
       <Link to="/" className="flex items-center space-x-2 no-underline">
  <img src={logo} alt="Company Logo" className="w-30 h-15 object-cover" />
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
    </div>
  );
};

export default Navbar;
