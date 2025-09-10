import React from "react";
import { Link, useLocation } from "react-router-dom";
import {  Heart, Bell, User, Rss, List, FileText, MessageCircle, Layers, Grid, Clock } from "lucide-react";

const Sidebar = ({ user, connectionsCount , requestsCount }) => {
  const location = useLocation();

  const menuItems = [
    { name: "Feed", path: "/", icon: <Layers className="w-5 h-5" /> },
    { name: "Connections", path: "/connections", icon: <Heart className="w-5 h-5" />, badge: connectionsCount },
    { name: "Interests", path: "/requests", icon: <Bell className="w-5 h-5" /> ,badge: requestsCount },
    { name: "Edit Profile", path: "/profile", icon: <User className="w-5 h-5" />  },
  ];

  return (
    <div className="w-64 bg-white h-screen shadow-lg flex flex-col">
      {/* User Info */}
      <div className="flex flex-col items-center p-6 border-b border-gray-200">
        <div className="w-20 h-20 rounded-full overflow-hidden mb-2">
          <img
            src={user?.photoUrl || "default-avatar.png"}
            alt="User"
            className="object-cover w-full h-full"
          />
        </div>
        <h2 className="text-lg font-bold">{user?.firstName} {user?.lastName}</h2>
        <p className="text-sm text-gray-500">{user?.age && `${user.age}, ${user.gender}`}</p>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 mt-4">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`flex items-center gap-3 px-6 py-3 text-gray-700 hover:bg-gray-100 transition ${
              location.pathname === item.path ? "bg-gray-200 font-semibold" : ""
            }`}
          >
            {item.icon}
            <span className="flex-1">{item.name}</span>
            {item.badge > 0 && (
              <span className="bg-black text-white text-xs font-bold rounded-full px-2 py-0.5">
                {item.badge}
              </span>
            )}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;