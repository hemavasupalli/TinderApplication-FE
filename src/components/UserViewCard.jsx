import React from "react";
import { FaHeart, FaTimes } from "react-icons/fa";

const UserViewCard = ({ feed, handleFeed }) => {
  if (!feed) return null;

  const { _id, firstName, lastName, age, gender, about, photoUrl } = feed;

  return (
    <div className=" w-200 bg-white h-screen shadow-lg flex items-center justify-center  p-4">
      <div className="relative bg-white shadow-xl border rounded-xl w-full max-w-lg md:max-w-xl overflow-hidden h-[80vh] flex flex-col">
        
        {/* Profile Image */}
        <figure className="relative flex-1 overflow-hidden">
          <img
            src={photoUrl || "/default-avatar.png"}
            alt={`${firstName} ${lastName}`}
            className="w-full h-full object-cover"
          />
          {/* Overlay with Name/Age/Gender/About */}
          <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-6 text-white">
            <h2 className="text-2xl font-bold">
              {firstName} {lastName}
            </h2>
            <p className="mt-1 text-sm md:text-base">{age || "—"}, {gender}
            </p>

          </div>
        </figure>
        <p className="text-left p-2  text-sm md:text-base">{about}</p>

        {/* Buttons */}
        <div className="flex justify-around p-6 bg-white">
          <button
            onClick={() => handleFeed("ignored", _id)}
            className="flex items-center justify-center gap-2 px-8 py-3 border border-black text-black font-semibold rounded-xl hover:bg-black hover:text-white transition"
          >
            <FaTimes /> Not Interested
          </button>

          <button
            onClick={() => handleFeed("interested", _id)}
            className="flex items-center justify-center gap-2 px-8 py-3 bg-black text-white font-semibold rounded-xl hover:bg-white hover:text-black border border-black transition"
          >
            <FaHeart /> Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserViewCard;
