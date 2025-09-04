import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import SideBar from "./SideBar";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import Footer from "./Footer";
import { BASE_URL } from "../constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation(); // Get current route
  const userData = useSelector((store) => store.user);
  const connections = useSelector((store) => store.connection);
  const requests = useSelector((store) => store.request);


  const [sidebarOpen, setSidebarOpen] = useState(false);

  const fetchUser = async () => {
    if (userData) return;
    try {
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      dispatch(addUser(res.data));
    } catch (err) {
      if (err?.response?.status === 401) navigate("/login");
      console.error(err);
    }
  };

  useEffect(() => {
    if (!userData) navigate("/login");
    fetchUser();
  }, []);

  // Only show sidebar on these pages
  const showSidebar = ["/", "/connections", "/requests"].includes(location.pathname);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-black">
      {/* Navbar */}
      <div className="sticky top-0 z-50">
        <NavBar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      </div>

      {/* Main content */}
      <div className="flex flex-1 pt-4 px-4 sm:px-6 md:px-10">
        {/* Sidebar for desktop */}
        {userData && showSidebar && (
          <div className="hidden md:block">
            <SideBar user={userData} connectionsCount={connections?.length || 0} requestsCount={requests?.length || 0} />
          </div>
        )}

        {/* Sidebar drawer for mobile */}
        {sidebarOpen && showSidebar && (
          <div
            className="fixed inset-0 z-40 md:hidden bg-black/50"
            onClick={() => setSidebarOpen(false)}
          >
            <div
              className="absolute left-0 top-0 w-64 h-full bg-white shadow-lg p-4"
              onClick={(e) => e.stopPropagation()}
            >
              <SideBar user={userData} connectionsCount={connections?.length || 0} requestsCount={requests?.length || 0}  />
            </div>
          </div>
        )}

        {/* Page content */}
        <main className="flex-grow ml-0 md:ml-6">
          <Outlet />
        </main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Body;
