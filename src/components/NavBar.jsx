import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../constants";
import { removeUser } from "../utils/userSlice";

const NavBar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(
        BASE_URL + "/logout",
        {},
        { withCredentials: true }
      );
      dispatch(removeUser());
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="navbar bg-base-300 shadow-sm bg-neutral text-neutral-content items-center p-4">
      <div className="flex-1">
        <Link to="/" className="font-bold text-xl mx-10">
          devTinder
        </Link>
      </div>

      <div className="flex gap-4 items-center">
        {user && (
          <div className="flex items-center gap-3">
            {/* Welcome text (always visible, no hover effect) */}
            <span className="text-sm font-medium whitespace-nowrap">
              Welcome, {user?.firstName || "Guest"}
            </span>

            {/* Avatar dropdown trigger (hover effect applies here only) */}
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar hover:bg-base-200"
              >
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  <img
                    src={user?.photoUrl || "/default-avatar.png"}
                    alt="User profile"
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>

              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                <li>
                  <Link to="/profile" className="justify-between">
                    Profile
                   
                  </Link>
                </li>
                <li>
                <Link to="/connections" className="justify-between">
                    Connections
                   
                  </Link>
                </li>
                <li>
                <Link to="/requests" className="justify-between">
                    Requests
                   
                  </Link>
                </li>
                <li>
                  <a onClick={handleLogout}>Logout</a>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
