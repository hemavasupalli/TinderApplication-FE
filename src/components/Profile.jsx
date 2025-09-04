import React, { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BASE_URL } from "../constants";

const Profile = () => {
  const user = useSelector((store) => store.user);
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [age, setAge] = useState(user?.age || "");
  const [gender, setGender] = useState(user.gender || "");
  const [about, setAbout] = useState(user.about || "");
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl || "default-avatar.png"
  );

  const [errorMsg, setErrorMsg] = useState("");
  const dispatch = useDispatch();

  const handleSave = async () => {
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        { firstName, lastName, age: Number(age), gender, photoUrl, about },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      setErrorMsg("Profile updated successfully ✅");
    } catch (err) {
      console.error(err);
      setErrorMsg(err?.response?.data || "Something went wrong");
    }
  };

  return (
<div className="flex flex-col md:flex-row justify-center items-start gap-10 px-4 py-10 bg-gray-50 min-h-screen">
  {/* Form Section */}
  <fieldset className="bg-white shadow-lg rounded-2xl w-full max-w-md p-6">
    <legend className="text-xl font-bold text-gray-900">Update Profile</legend>

    <div className="flex flex-col gap-4 mt-4">
      <input
        type="text"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        placeholder="First Name"
        className="input w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400 transition"
      />
      <input
        type="text"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        placeholder="Last Name"
        className="input w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400 transition"
      />
      <input
        type="number"
        value={age}
        onChange={(e) => setAge(e.target.value)}
        placeholder="Age"
        className="input w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400 transition"
      />
      <input
        type="text"
        value={gender}
        onChange={(e) => setGender(e.target.value)}
        placeholder="Gender"
        className="input w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400 transition"
      />
      <input
        type="text"
        value={photoUrl}
        onChange={(e) => setPhotoUrl(e.target.value)}
        placeholder="Photo URL"
        className="input w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400 transition"
      />
      <textarea
        value={about}
        onChange={(e) => setAbout(e.target.value)}
        placeholder="About you"
        className="input w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400 transition"
      />
    </div>

    {errorMsg && <p className="text-red-500 text-center mt-2">{errorMsg}</p>}

    <button
      onClick={handleSave}
      className="w-full bg-black text-white py-2 rounded-lg mt-4 hover:bg-gray-800 transition"
    >
      Save Profile
    </button>
  </fieldset>

{/* Preview Card */}
<div className="relative bg-white shadow-xl rounded-2xl w-full max-w-sm p-9 mt-4 flex flex-col items-center gap-4">
  {/* Preview Sticker */}
  <div className="absolute top-4 left-4 bg-black text-white font-bold text-xs px-3 py-1 rounded-full shadow-md">
    PREVIEW
  </div>

  {/* Profile Image */}
  <div className="w-44 h-44 rounded-full overflow-hidden border-4 border-gray-200">
    <img
      src={photoUrl || "default-avatar.png"}
      alt={`${firstName} ${lastName}`}
      className="object-cover w-full h-full"
    />
  </div>

  {/* Profile Details */}
  <div className="text-center">
    <h2 className="text-2xl font-bold text-gray-900">{firstName} {lastName}</h2>
    <p className="text-gray-600">{age} years, {gender}</p>
    <p className="text-gray-700 mt-2">{about || "No description yet."}</p>
  </div>

  {/* Action Buttons */}
  <div className="flex gap-4 mt-4">
    <button className="bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800 transition">
      Ignore
    </button>
    <button className="bg-white text-black border border-black px-6 py-2 rounded-full hover:bg-gray-200 transition">
      Interested
    </button>
  </div>
</div>

</div>

  );
};

export default Profile;
