import React from "react";
import { formatLastSeen } from "../utils/socket";

const ConnectionsList = ({ connections, onSelectUser }) => {
  return (
    <div className="w-64 md:w-72 bg-white border-r border-gray-200 flex flex-col">
      <div className="px-4 py-3 border-b border-gray-200">
        <h1 className="text-lg font-semibold text-gray-700">Messages</h1>
      </div>

      <div className="flex-1 overflow-y-auto p-2">
        {!connections || connections.length === 0 ? (
          <div className="flex justify-center items-center h-full">
            <p className="text-gray-500 text-sm">No connections found</p>
          </div>
        ) : (
          connections.map((c) => (
            <button
              key={c._id}
              onClick={() => onSelectUser(c)}
              className="flex items-center space-x-3 w-full p-2 mb-2 rounded-lg hover:bg-gray-100 transition"
            >
              <div className="relative">
                <img
                  src={c.photoUrl || "https://via.placeholder.com/40"}
                  alt={c.firstName}
                  className="w-10 h-10 rounded-full object-cover border border-gray-300"
                />
                {/* Online / Offline / Last Seen Indicator */}
                <span
                  className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                    c.isOnline
                      ? "bg-green-500"
                      : c.lastSeen
                      ? "bg-orange-300"
                      : "bg-gray-400"
                  }`}
                />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-sm font-medium text-gray-800">
                  {c.firstName} {c.lastName}
                </span>
                <span className="text-xs text-gray-500">
                  {c.isOnline
                    ? "Online"
                    : formatLastSeen(c.isOnline, c.lastSeen)}
                </span>
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  );
};

export default ConnectionsList;
