import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { BASE_URL } from "../constants";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1); // 1 = signup, 2 = verify OTP
  const [errorMsg, setErrorMsg] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Step 1: Sign Up
  const handleSignUp = async () => {
    try {
      await axios.post(
        BASE_URL + "/signup",
        { firstName, lastName, emailId, password },
        { withCredentials: true }
      );
      setStep(2); // move to OTP step
      setErrorMsg("OTP sent to your email");
    } catch (err) {
      dispatch(removeUser());
      console.error(err);
      const msg =
        err?.response?.data?.message || err?.response?.data || "Something went wrong";
      setErrorMsg(msg);
    }
  };

  // Step 2: Verify OTP
  const handleVerifyOtp = async () => {
    try {
      const res = await axios.post(BASE_URL + "/verifyOTP", { emailId, otp });
      const userData = res.data.data;
      if (userData) {
        dispatch(addUser(userData)); // add user to Redux
        setErrorMsg("Email verified successfully!");
        navigate("/profile"); // navigate after successful verification
      } else {
        setErrorMsg(res.data.message || "OTP verification failed");
      }
    } catch (err) {
      console.error(err);
      dispatch(removeUser());
      const msg =
        err?.response?.data?.message || err?.response?.data || "Something went wrong";
      setErrorMsg(msg);
      if (
        msg.includes("Maximum OTP attempts exceeded") ||
        msg.includes("User not found") ||
        msg.includes("OTP expired") ||
        msg.includes("User deleted")
      ) {
        setTimeout(() => {
          navigate("/login"); // go back to login after attempts exhausted
        }, 2000);
      }
    }
  };

  return (
    <div className="flex justify-center items-center mt-10  bg-gray-50 px-4">
      <div className="bg-white shadow-lg rounded-2xl w-full max-w-md p-6 sm:p-8">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">
          {step === 1 ? "Sign Up" : "Verify OTP"}
        </h2>

        <div className="flex flex-col gap-4">
          {step === 1 && (
            <>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First Name"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400 transition"
              />
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last Name"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400 transition"
              />
              <input
                type="email"
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
                placeholder="Email"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400 transition"
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400 transition"
              />
            </>
          )}

          {step === 2 && (
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400 transition"
            />
          )}

          {errorMsg && <p className="text-black text-center mb-4">{errorMsg}</p>}

          <button
            onClick={step === 1 ? handleSignUp : handleVerifyOtp}
            className="w-full bg-black text-white font-semibold py-2 rounded-lg shadow-md hover:bg-gray-800 transition mt-2"
          >
            {step === 1 ? "Sign Up" : "Verify OTP"}
          </button>

          {step === 1 && (
            <p className="text-center text-gray-700 mt-2">
              Existing User?{" "}
              <span
                className="text-black font-semibold cursor-pointer hover:underline"
                onClick={() => navigate("/login")}
              >
                Login
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignUp;