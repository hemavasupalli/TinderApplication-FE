import React from "react";
import { FaHeart, FaTimes } from "react-icons/fa";

const UserViewCard = ({ feed }) => {
  if (!feed) return null;

  const { firstName, lastName, age, gender, about, photoUrl } = feed;

  return (
    <div className="flex justify-center mt-10 px-4">
      <div className="relative card bg-white shadow-lg rounded-xl w-full max-w-md md:max-w-lg overflow-hidden">
        {/* Profile Image */}
        <figure className="h-72 w-full overflow-hidden relative">
          <img
            src={photoUrl || "/default-avatar.png"}
            alt={`${firstName} ${lastName}`}
            className="object-cover w-full h-full"
          />

          {/* Name + Age/Gender overlay */}
          <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-4 text-white">
            <h2 className="text-xl md:text-2xl font-bold">
              {firstName} {lastName}, {age || "—"}, {gender}
            </h2>
            <p className="text-sm md:text-base">{about}</p>
          </div>
        </figure>

        {/* Buttons */}
        <div className="flex justify-center gap-4 p-4">
          <button className="flex items-center gap-2 px-5 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition">
            <FaTimes /> Ignore
          </button>
          <button className="flex items-center gap-2 px-5 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition">
            <FaHeart /> Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserViewCard;
