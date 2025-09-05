import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../constants";

const ResetPassword = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
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
    <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
      <div className="bg-white shadow-lg rounded-2xl w-full max-w-md p-6 sm:p-8">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
          Reset Password
        </h2>

        <div className="flex flex-col gap-4">
          <input
            type="email"
            value={emailId}
            onChange={(e) => setEmailId(e.target.value)}
            placeholder="Enter your email"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400 transition"
          />

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter new password"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400 transition"
          />

          {errorMsg && (
            <p className="text-red-500 text-center mb-4">{errorMsg}</p>
          )}

          <button
            onClick={handleReset}
            className="w-full bg-black text-white font-semibold py-2 rounded-lg shadow-md hover:bg-gray-800 transition mt-2"
          >
            Change Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
