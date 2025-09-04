import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { removeUser } from "../utils/userSlice";
import axios from "axios";
import { BASE_URL } from "../constants";
import { Users, Heart, Menu } from "lucide-react";

const NavBar = ({ toggleSidebar }) => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      setDropdownOpen(false); // Close dropdown after logout
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  // Close dropdown if click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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

      {/* Middle: Links (always visible) */}
      {user && (
        <div className="flex gap-6 items-center">
          <Link
            to="/connections"
            className="flex items-center gap-1 relative hover:text-gray-600 transition"
            onClick={() => setDropdownOpen(false)}
          >
            <Heart className="w-6 h-6" />
            <span className="hidden md:inline">Connections</span>
          </Link>

          <Link
            to="/requests"
            className="flex items-center gap-1 hover:text-gray-600 transition"
            onClick={() => setDropdownOpen(false)}
          >
            <Users className="w-5 h-5" />
            <span className="hidden md:inline">Requests</span>
          </Link>
        </div>
      )}

      {/* Right: Profile dropdown */}
      {user && (
        <div className="relative" ref={dropdownRef}>
          <button
            className="btn btn-ghost btn-circle avatar hover:bg-gray-100"
            onClick={() => setDropdownOpen(!isDropdownOpen)}
          >
            <div className="w-10 h-10 rounded-full overflow-hidden">
              <img
                src={user?.photoUrl || "default-avatar.png"}
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
                  onClick={() => setDropdownOpen(false)} // Close dropdown on click
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
