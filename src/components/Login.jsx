import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../constants";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
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
    if (user) navigate("/");
  }, [user, navigate]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
      <div className="bg-white shadow-lg rounded-2xl w-full max-w-sm p-8">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">
          Login to DevTinder
        </h2>


        <div className="flex flex-col gap-5">
          <div>
            <input
              type="email"
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
              placeholder="Enter your email"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black transition"
            />
          </div>

          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black transition"
            />
          </div>
          {errorMsg && (
          <p className="text-red-500 text-center mb-4">{errorMsg}</p>
        )}
          <div className="flex justify-end">
            <span
              className="text-black font-medium cursor-pointer hover:underline"
              onClick={() => navigate("/resetpassword")}
            >
              Forgot password?
            </span>
          </div>

          <button
            onClick={handleLogin}
            className="w-full bg-black text-white font-semibold py-2 rounded-lg shadow-md hover:bg-gray-900 transition"
          >
            Login
          </button>

          <p className="text-center text-gray-700 mt-2">
            New User?{" "}
            <span
              className="text-black font-semibold cursor-pointer hover:underline"
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
