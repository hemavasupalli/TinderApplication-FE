import React from "react";
import { FaHeart, FaTimes } from "react-icons/fa";
import { formatLastSeen } from "../utils/socket";

const UserViewCard = ({ feed, handleFeed }) => {
  if (!feed) return null;

  const { _id, firstName, lastName, age, gender, about, photoUrl , isOnline } = feed;

  return (
    <div className="relative bg-white shadow-xl rounded-2xl overflow-hidden w-full max-w-md flex flex-col min-h-[32rem]">
      
      {/* Profile Image */}
      <figure className="relative w-full h-95 overflow-hidden">
      <div className="absolute top-3 left-3 bg-black text-white font-bold text-[10px] px-2 py-1 rounded-full shadow-md">
    { formatLastSeen(isOnline)}
  </div>
        <img
          src={photoUrl || "/default-avatar.png"}
          alt={`${firstName} ${lastName}`}
          className="w-full h-full object-cover"
        />

        {/* Overlay with Name/Age/Gender */}
        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-4 text-white">
          <h2 className="text-2xl font-bold truncate">
            {firstName} {lastName}
          </h2>
          <p className="mt-1 text-sm">
            {age || "—"} yrs, {gender}
          </p>
        </div>
      </figure>

      <div className="px-4 py-3 flex-1 flex items-center">

       < p className="text-gray-700 text-xs mt-1 leading-snug text-justify">
      {about || "No description yet."}
    </p>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-around p-4  border-gray-200">
        <button
          onClick={() => handleFeed("ignored", _id)}
          className="flex items-center justify-center gap-2 px-5 py-2 border border-black text-black font-semibold rounded-full hover:bg-black hover:text-white transition"
        >
          <FaTimes /> Ignore
        </button>

        <button
          onClick={() => handleFeed("interested", _id)}
          className="flex items-center justify-center gap-2 px-5 py-2 bg-black text-white font-semibold rounded-full hover:bg-white hover:text-black border border-black transition"
        >
          <FaHeart /> Interested
        </button>
      </div>
    </div>
  );
};

export default UserViewCard;
