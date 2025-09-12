
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BASE_URL } from "../constants";

const Profile = () => {
  const user = useSelector((store) => store.user);
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [age, setAge] = useState(user?.age || "");
  const [gender, setGender] = useState(user?.gender || "");
  const [about, setAbout] = useState(user?.about || "");
  const [photoUrl, setPhotoUrl] = useState(user?.photoUrl || "default-avatar.png"
  );

  const [errorMsg, setErrorMsg] = useState("");
  const [toastMsg, setToastMsg] = useState("");

  const dispatch = useDispatch();

  const handleSave = async () => {
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        { firstName, lastName, age: age, gender, photoUrl, about },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.data));
      setToastMsg("Profile Saved successfully.");
    } catch (err) {
      console.error(err);
      setErrorMsg(
        err?.response?.data?.message || "Something went wrong"
      );
          }
  };
  useEffect(() => {
    if (toastMsg) {
      const timer = setTimeout(() => {
        setToastMsg("");
      }, 1000); 

      return () => clearTimeout(timer);
    }
  }, [toastMsg]);
  return (
<div className="flex flex-col md:flex-row justify-center items-start gap-10 px-4 py-5 bg-gray-50 ">
{toastMsg && (
        <div className="toast toast-top toast-center mt-12">
          <div className="alert alert-success">
            <span>{toastMsg}</span>
          </div>
        </div>
      )}

  {/* Form Section */}
  <fieldset className="bg-white shadow-lg rounded-2xl w-full max-w-md p-6">
    <legend className="text-xl font-bold text-gray-900">Update Profile</legend>

    <div className="flex flex-col gap-4">
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
 <select
    id="gender"
    value={gender}
    onChange={(e) => setGender(e.target.value)}
    className="w-full border border-gray-300 bg-white rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400 transition text-gray-700"
  >
    <option value="" disabled>
      Select Gender
    </option>
    <option value="Male">Male</option>
    <option value="Female">Female</option>
    <option value="Other">Other</option>
  </select>

      <input
        type="text"
        value={photoUrl}
        onChange={(e) => setPhotoUrl(e.target.value)}
        placeholder="Photo URL"
        className="input w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400 transition"
      />
      <textarea
  value={about}
  onChange={(e) => { setAbout(e.target.value);

  }}
  placeholder="About you (max 50 characters)"
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


</div>

  );
};

export default Profile;
