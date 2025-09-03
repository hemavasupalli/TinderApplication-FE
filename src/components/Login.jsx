import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../constants";

const Login = () => {
  const [emailId, setEmailId] = useState("anil@gmail.com");
  const [password, setPassword] = useState("Anil1@1234");
  const [errorMsg, setErrorMsg] = useState("");
  const dispatch = useDispatch(); 
  const navigate = useNavigate();
  const user = useSelector(store => store.user);

  const handleLogin = async () => {
    if (user) return;
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        { emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      navigate("/");
    } catch (err) {
      if (err?.response?.status === 400) {
        setErrorMsg(err?.response?.data);
      } else {
        setErrorMsg("Something went wrong");
      }
      console.log(err);
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-purple-200 via-pink-200 to-yellow-200 px-4">
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-sm p-6 sm:p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Login to DevTinder</h2>

        {errorMsg && (
          <p className="text-red-500 text-center mb-4">{errorMsg}</p>
        )}

        <div className="flex flex-col gap-4">
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Email</label>
            <input
              type="email"
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
              placeholder="Enter your email"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
            />
          </div>

          <div className="flex justify-end">
            <span
              className="text-purple-600 font-medium cursor-pointer hover:underline"
              onClick={() => navigate("/resetpassword")}
            >
              Forgot password?
            </span>
          </div>

          <button
            onClick={handleLogin}
            className="w-full bg-purple-600 text-white font-semibold py-2 rounded-lg shadow-md hover:bg-purple-700 transition"
          >
            Login
          </button>

          <p className="text-center text-gray-600 mt-2">
            New User?{" "}
            <span
              className="text-purple-600 font-semibold cursor-pointer hover:underline"
              onClick={() => navigate("/signup")}
            >
              Signup
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
