import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-gray-900 shadow-md px-6 py-4 flex justify-between items-center">
      {/* Logo */}
      <Link to="/" className="text-xl font-bold text-white">
        Foodie
      </Link>

      {/* Links */}
      <ul className="hidden md:flex gap-8 text-gray-300 font-medium">
        <li>
          <Link to="/" className="hover:text-white transition-colors">Home</Link>
        </li>
        <li>
          <Link to="/menu" className="hover:text-white transition-colors">Menu</Link>
        </li>
        <li>
          <Link to="/about" className="hover:text-white transition-colors">About</Link>
        </li>
        <li>
          <Link to="/contact" className="hover:text-white transition-colors">Contact</Link>
        </li>
      </ul>

      {/* Buttons */}
      <div className="flex gap-4">
        <button className="px-4 py-2 border border-gray-300 text-gray-300 rounded-lg hover:bg-white hover:text-gray-900 transition">
          Login
        </button>
        <button className="px-4 py-2 bg-white text-gray-900 rounded-lg hover:opacity-80 transition">
          Sign Up
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
