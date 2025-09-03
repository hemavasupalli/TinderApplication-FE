import React from "react";
import { FaHeart, FaTimes } from "react-icons/fa";

const ConnectionCard = ({ connection }) => {
  if (!connection) return null;

  const { firstName, lastName, age, gender, about, photoUrl } = connection;

  return (
    <div className="flex justify-center mt-6 px-4">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden w-full max-w-4xl flex flex-col md:flex-row items-stretch">

        {/* Image */}
        <figure className="w-full md:w-48 h-48 md:h-auto flex-shrink-0 overflow-hidden">
          <img
            src={photoUrl || "/default-avatar.png"}
            alt={`${firstName} ${lastName}`}
            className="w-full h-full object-cover"
          />
        </figure>

        {/* Details Section */}
        <div className="flex flex-col justify-between p-4 flex-grow">
          {/* Name, Age, Gender */}
          <h2 className="text-2xl font-bold text-gray-800">
            {firstName} {lastName}
          </h2>
          <p className="text-gray-500 text-lg mb-2">
            {age ? `${age}, ${gender}` : gender}
          </p>

          {/* About */}
          <p className="text-gray-700 mb-4">{about}</p>

          {/* Buttons */}
          <div className="flex gap-4">
            <button className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition">
              <FaTimes /> Ignore
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition">
              <FaHeart /> Interested
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ConnectionCard;
