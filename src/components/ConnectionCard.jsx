import React from "react";
import { FaHeart, FaTimes } from "react-icons/fa";

const ConnectionCard = ({ connection , showActions = false  }) => {
  if (!connection) return null;

  const { firstName, lastName, age, gender, about, photoUrl, location } = connection;

  return (
    <div className="flex justify-center mt-6 px-4">
      <div className="bg-white rounded-xl shadow-md overflow-hidden w-full max-w-3xl flex md:flex-row flex-col md:items-stretch">
        
        {/* Image */}
        <figure className="w-full md:w-40 h-48 md:h-auto flex-shrink-0 overflow-hidden">
          <img
            src={photoUrl || "/default-avatar.png"}
            alt={`${firstName} ${lastName}`}
            className="w-full h-full object-cover"
          />
        </figure>

        {/* Details */}
        <div className="flex flex-col justify-between p-4 flex-grow">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              {firstName} {lastName}, <span className="font-normal text-gray-600">{age}</span>
            </h2>
            <p className="text-gray-500 mb-1">{gender}{location ? ` • ${location}` : ""}</p>
            <p className="text-gray-700 text-sm">{about}</p>
          </div>

          {/* Buttons */}
          {showActions &&        (<div className="flex gap-3 mt-4">
            <button className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition">
              <FaTimes /> Ignore
            </button>
            <button className="flex items-center justify-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition">
              <FaHeart /> Interested
            </button>
          </div>)}
        </div>

      </div>
    </div>
  );
};

export default ConnectionCard;
