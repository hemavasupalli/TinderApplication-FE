import React from "react";
import { FaHeart, FaTimes } from "react-icons/fa";

const ConnectionCard = ({ connection, showActions = false, handleRequests,requestId }) => {
  if (!connection) return null;

  const { firstName, lastName, age, gender, about, photoUrl } = connection;

  return (
    <div className="bg-white shadow-lg rounded-xl overflow-hidden w-full flex md:flex-row flex-col md:items-stretch">
      
      {/* Profile Image */}
      <figure className="w-full md:w-48 h-64 md:h-auto flex-shrink-0 overflow-hidden">
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
            {firstName} {lastName} 
          </h2>
          <p className="text-gray-500 mb-2">{age} Years, {gender}</p>
          <p className="text-gray-700 text-sm">{about}</p>
        </div>

        {/* Buttons */}
        {showActions && (
          <div className="flex gap-3 mt-4">
            <button
              onClick={() => handleRequests("rejected", requestId)}
              className="flex items-center justify-center gap-2 px-5 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition"
            >
              <FaTimes /> Reject
            </button>
            <button
              onClick={() => handleRequests("accepted", requestId)}
              className="flex items-center justify-center gap-2 px-5 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition"
            >
              <FaHeart /> Accept
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConnectionCard;