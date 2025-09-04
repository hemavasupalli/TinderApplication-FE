import React from "react";
import { FaHeart, FaTimes } from "react-icons/fa";

const UserViewCard = ({ feed, handleFeed }) => {
  if (!feed) return null;

  const { _id, firstName, lastName, age, gender, about, photoUrl } = feed;

  return (
      <div className="relative bg-white  shadow-xl rounded-2xl overflow-hidden h-[80vh] flex flex-col">

        {/* Profile Image */}
        <figure className="relative flex-1 overflow-hidden">
          <img
            src={photoUrl || "/default-avatar.png"}
            alt={`${firstName} ${lastName}`}
            className="w-full h-full object-cover"
          />

          {/* Overlay with Name/Age/Gender */}
          <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-6 text-white">
            <h2 className="text-2xl font-bold">
              {firstName} {lastName}
            </h2>
            <p className="mt-1 text-sm md:text-base">{age || "—"}, {gender}</p>
          </div>
        </figure>

        {/* About Section */}
        <p className="text-left p-4 text-sm md:text-base text-gray-700">{about || "No description yet."}</p>

        {/* Action Buttons */}
        <div className="flex justify-around p-6 bg-white">
          <button
            onClick={() => handleFeed("ignored", _id)}
            className="flex items-center justify-center gap-2 px-5 py-3 border border-black text-black font-semibold rounded-full hover:bg-black hover:text-white transition"
          >
            <FaTimes /> Ignore
          </button>

          <button
            onClick={() => handleFeed("interested", _id)}
            className="flex items-center justify-center gap-2 px-5 py-3 bg-black text-white font-semibold rounded-full hover:bg-white hover:text-black border border-black transition"
          >
            <FaHeart /> Interested
          </button>
        </div>
      </div>

  );
};

export default UserViewCard;
