import React from "react";
import ThemeMode from "./ThemeMode";
import { useSelector } from "react-redux";

const NavBar = () => {
  const user = useSelector((store) => store.user); 

console.log(user)
  return (
    <>
      <div className="navbar bg-base-300 shadow-sm">
        <div className="flex-1">
          <div className="font-bold text-xl mx-10">devTinder</div>
        </div>
        <div className="flex gap-2">
       { user &&  <div className="dropdown dropdown-end mx-5">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <p> welcome, {user.firstName}</p>
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a>Logout</a>
              </li>
            </ul>
          </div>}
        </div>
      </div>
    </>
  );
};

export default NavBar;
