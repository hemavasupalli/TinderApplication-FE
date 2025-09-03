import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BASE_URL } from "../constants";

const Profile = () => {
  const [firstName, setFirstName] = useState("Anil");
  const [lastName, setLastName] = useState("Vasupalli");
  const [age, setAge] = useState(26);
  const [gender, setGender] = useState("male");
  const [about, setAbout] = useState("this is my profile");
  const [photoUrl, setPhotoUrl] = useState(
    "https://i1.sndcdn.com/avatars-hafRCiz0IszwvkM7-CtNF1g-t1080x1080.jpg"
  );

  const [errorMsg, setErrorMsg] = useState("");
  const dispatch = useDispatch();

  const handleSave = async () => {
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          age: Number(age), // ensure it's a number
          gender,
          photoUrl,
          about,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      setErrorMsg("Profile updated successfully ✅");
    } catch (err) {
      console.error(err);
      if (err?.response?.status === 400) {
        setErrorMsg(err?.response?.data || "Bad request");
      } else {
        setErrorMsg("Something went wrong");
      }
    }
  };

  return (
    <div className="flex justify-center">
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <legend className="fieldset-legend">Update Profile</legend>

        <label className="label">First Name</label>
        <input
          type="text"
          className="input"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="First Name"
        />

        <label className="label">Last Name</label>
        <input
          type="text"
          className="input"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Last Name"
        />

        <label className="label">Age</label>
        <input
          type="number"
          className="input"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          placeholder="Age"
        />

        <label className="label">Gender</label>
        <input
          type="text"
          className="input"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          placeholder="Gender"
        />

        <label className="label">Photo Url</label>
        <input
          type="text"
          className="input"
          value={photoUrl}
          onChange={(e) => setPhotoUrl(e.target.value)}
          placeholder="Photo URL"
        />

        <label className="label">About</label>
        <input
          type="text"
          className="input"
          value={about}
          onChange={(e) => setAbout(e.target.value)}
          placeholder="About you"
        />

        <p className="text-red-500 text-center mt-2">{errorMsg}</p>

        <button className="btn btn-neutral mt-4" onClick={handleSave}>
          Save Profile
        </button>
      </fieldset>
      <div className="card bg-base-100 shadow-sm w-64 mt-10">
      <button className="btn btn-neutral mb-2" >
          Preview Profile
        </button>    <figure>
      <img
        src={photoUrl}
        alt="photo" />
    </figure>
    <div className="card-body">
      <h2 className="card-title">{firstName +" "+lastName}</h2>
      <p >{age +" ,"+gender}</p>

      <p>{about}</p>
      <div className="card-actions  flex justify-center">
        <button className="btn btn-primary">Ignore</button>
        <button className="btn btn-secondary">Interested</button>

      </div>
    </div>
  </div>
    </div>
  );
};

export default Profile;
