import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../constants";

const ResetPassword = () => {
  const [emailId, setEmailId] = useState("anil@gmail.com");
  const [password, setPassword] = useState("Anil1@1234");
  const [errorMsg, setErrorMsg] = useState("");
  const dispatch = useDispatch(); 
  const navigate = useNavigate();

  const handleReset = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/forgotPassword",
        { emailId, password },
        { withCredentials: true }
      );
      console.log("hema",res)
      dispatch(addUser(res.data.data));
      navigate("/");
    } catch (err) {
      if (err?.response?.status === 500) {
        setErrorMsg(err?.response?.data);
      } else {
        setErrorMsg("Something went wrong");
      }
      console.log(err);
    }
  };

  return (
    <div className="flex justify-center mt-16">
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <legend className="fieldset-legend">Change Password</legend>

        <label className="label">Email</label>
        <input
          type="email"
          className="input"
          value={emailId}
          onChange={(e) => setEmailId(e.target.value)}
          placeholder="Email"
        />

        <label className="label">Password</label>
        <input
          type="password"
          className="input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />

        <p className="text-red-500 justify-center">{errorMsg}</p>
        <button className="btn btn-neutral mt-2" onClick={handleReset}>
          Change Password
        </button>
      </fieldset>
    </div>
  );
};
export default ResetPassword;