import React from "react";
import { useState } from "react";
import axios from "axios";
const Login = () => {
  const [emailId, setEmailId] = useState("anil@gmail.com");
  const [password, setPassword] = useState("Anil@1234");
  const handleLogin = async () => {
    try {
      await axios.post(
        "http://localhost:3000/login",
        {
          emailId,
          password,
        },
        {
          withCredentials: true,
        }
      );
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="flex justify-center mt-16">
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <legend className="fieldset-legend">Login</legend>

        <label className="label">Email</label>
        <input
          type="email"
          className="input"
          value={emailId}
          onChange={(e) => {
            setEmailId(e.target.value);
          }}
          placeholder="Email"
        />

        <label className="label">Password</label>
        <input
          type="password"
          className="input"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          placeholder="Password"
        />

        <button className="btn btn-neutral mt-4" onClick={handleLogin}>
          Login
        </button>
      </fieldset>
    </div>
  );
};

export default Login;
