import { Link, useNavigate } from "react-router-dom";

function Navbar() {

  const userName = localStorage.getItem("name");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("name")
    navigate("/login");
  };

  return (
    <nav className="bg-gradient-to-r from-orange-400 via-pink-500 to-yellow-400 shadow-lg px-6 py-4 flex justify-between items-center sticky top-0 z-50">
      <div className="flex items-center gap-8">
        <Link to="/" className="text-2xl font-extrabold text-white tracking-tight drop-shadow-lg">
          FoodieExpress
        </Link>
        <Link to="/" className="text-lg font-semibold text-white hover:text-yellow-200 transition-colors">
          Home
        </Link>
      </div>

      {localStorage.getItem("token") && userName ? (
        <div className="text-lg font-semibold text-white px-4">
          Hi, <span className="text-yellow-200">{userName}</span>
        </div>
      ) : null}

      {/* Right: Links and Buttons */}
      <div className="flex items-center gap-8">
        <ul className="hidden md:flex gap-8 text-white font-semibold text-lg">
          {localStorage.getItem("token") ? (
            <li>
              <Link to="/myorders" className="hover:text-yellow-200 transition-colors">My Orders</Link>
            </li>
          ) : null}
        </ul>
        {!localStorage.getItem("token") ? (
          <div className="flex gap-4">
            <Link to="/login">
              <button className="px-4 py-2 border border-white text-white rounded-lg hover:bg-white hover:text-orange-500 transition font-semibold shadow">
                Login
              </button>
            </Link>
            <Link to="/signup">
              <button className="px-4 py-2 bg-white text-orange-500 rounded-lg hover:bg-orange-100 transition font-semibold shadow">
                Sign Up
              </button>
            </Link>
          </div>
        ) : (
          <div className="flex gap-4">
            <button className="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition font-semibold shadow">
              MyCart
            </button>
            <button onClick={handleLogout} className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition font-semibold shadow">
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
