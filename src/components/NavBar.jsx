import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { removeUser } from "../utils/userSlice";
import axios from "axios";
import { BASE_URL } from "../constants";
import { Users, Heart, Menu, X, User, LogOut } from "lucide-react";
import { removeConnection } from "../utils/connectionsSlice";
import { removeRequest } from "../utils/requestSlice";

const NavBar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      dispatch(removeConnection());
      dispatch(removeRequest());
      setMobileMenuOpen(false);
      setProfileDropdownOpen(false);
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setProfileDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link to={user ? "/" : "/login"} className="text-2xl font-bold text-black">
          devTinder
        </Link>

        {/* Desktop Links */}
        {user && (
          <div className="hidden md:flex items-center gap-6">
            <Link
              to="/connections"
              className="group flex items-center gap-1 px-2 py-1 rounded hover:bg-gray-100 transition"
            >
              <Heart className="w-5 h-5 text-gray-700 group-hover:text-red-500 transition" />
              <span className="text-gray-800 group-hover:text-red-500 transition">Connections</span>
            </Link>
            <Link
              to="/requests"
              className="group flex items-center gap-1 px-2 py-1 rounded hover:bg-gray-100 transition"
            >
              <Users className="w-5 h-5 text-gray-700 group-hover:text-blue-500 transition" />
              <span className="text-gray-800 group-hover:text-blue-500 transition">Requests</span>
            </Link>

            {/* Profile Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                className="btn btn-ghost btn-circle avatar hover:bg-gray-100"
                onClick={() => setProfileDropdownOpen(!isProfileDropdownOpen)}
              >
                <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-200">
                  <img
                    src={user?.photoUrl || "default-avatar.png"}
                    alt="User profile"
                    className="object-cover w-full h-full"
                  />
                </div>
              </button>

              {isProfileDropdownOpen && (
                <ul className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md py-2 z-50">
                  <li>
                    <Link
                      to="/profile"
                      className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 transition"
                      onClick={() => setProfileDropdownOpen(false)}
                    >
                      <User className="w-5 h-5 text-gray-700" /> Profile
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 px-4 py-2 w-full text-left hover:bg-gray-100 transition"
                    >
                      <LogOut className="w-5 h-5 text-gray-700" /> Logout
                    </button>
                  </li>
                </ul>
              )}
            </div>
          </div>
        )}

        {/* Mobile Hamburger */}
        {user && (
          <button
            className="md:hidden text-gray-700"
            onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        )}
      </div>

      {/* Mobile Menu (push-down) */}
      {isMobileMenuOpen && user && (
        <div className="md:hidden bg-white border-t border-gray-200 px-4 py-2 flex flex-col gap-2">
          <Link
            to="/connections"
            className="group flex items-center gap-2 px-2 py-2 rounded hover:bg-gray-100 transition"
            onClick={() => setMobileMenuOpen(false)}
          >
            <Heart className="w-5 h-5 text-gray-700 group-hover:text-red-500 transition" />
            <span className="text-gray-800 group-hover:text-red-500 transition">Connections</span>
          </Link>
          <Link
            to="/requests"
            className="group flex items-center gap-2 px-2 py-2 rounded hover:bg-gray-100 transition"
            onClick={() => setMobileMenuOpen(false)}
          >
            <Users className="w-5 h-5 text-gray-700 group-hover:text-blue-500 transition" />
            <span className="text-gray-800 group-hover:text-blue-500 transition">Requests</span>
          </Link>
          <Link
            to="/profile"
            className="group flex items-center gap-2 px-2 py-2 rounded hover:bg-gray-100 transition"
            onClick={() => setMobileMenuOpen(false)}
          >
            <User className="w-5 h-5 text-gray-700 group-hover:text-green-500 transition" />
            <span className="text-gray-800 group-hover:text-green-500 transition">Profile</span>
          </Link>
          <button
            onClick={handleLogout}
            className="group flex items-center gap-2 px-2 py-2 rounded hover:bg-gray-100 transition text-left"
          >
            <LogOut className="w-5 h-5 text-gray-700 group-hover:text-red-600 transition" />
            <span className="text-gray-800 group-hover:text-red-600 transition">Logout</span>
          </button>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
