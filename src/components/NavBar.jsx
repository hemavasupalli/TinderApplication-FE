import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { removeUser } from "../utils/userSlice";
import axios from "axios";
import { BASE_URL } from "../constants";
import { Users, Heart, Menu } from "lucide-react";

const NavBar = ({ toggleSidebar }) => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <nav className="bg-white shadow-md px-6 py-3 flex items-center justify-between sticky top-0 z-50">
      {/* Left: Logo */}
      <div className="flex items-center gap-4">
        {/* Mobile Sidebar Toggle */}
        <button className="md:hidden text-gray-700" onClick={toggleSidebar}>
          <Menu className="w-6 h-6" />
        </button>

        <Link to="/" className="font-bold text-2xl text-black">
          devTinder
        </Link>
      </div>

      {/* Middle: Links (hidden on mobile) */}
      {user && (
        <div className="hidden md:flex gap-6 items-center">
          <Link
            to="/connections"
            className="flex items-center gap-1 relative hover:text-gray-600 transition"
          >
            <Heart className="w-6 h-6" />
          </Link>

          <Link
            to="/requests"
            className="flex items-center gap-1 hover:text-gray-600 transition"
          >
            <Users className="w-5 h-5" />
          </Link>
        </div>
      )}
      {user && (
        <div className="relative">
          <button
            className="btn btn-ghost btn-circle avatar hover:bg-gray-100"
            onClick={() => setDropdownOpen(!isDropdownOpen)}
          >
            <div className="w-10 h-10 rounded-full overflow-hidden">
              <img
                src={user?.photoUrl || "/default-avatar.png"}
                alt="User profile"
                className="object-cover w-full h-full"
              />
            </div>
          </button>

          {isDropdownOpen && (
            <ul className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md py-2 z-50">
              <li>
                <Link
                  to="/profile"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Profile
                </Link>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  Logout
                </button>
              </li>
            </ul>
          )}
        </div>
      )}
    </nav>
  );
};

export default NavBar;
