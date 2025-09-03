import React from 'react'
import  { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BASE_URL } from "../constants";
import { useNavigate } from 'react-router-dom';


const SignUp = () => {
    const [firstName, setFirstName] = useState("niha");
    const [lastName, setLastName] = useState("raghu");
     const [emailId, setEmailId] = useState("priya@gmail.com");
     const [password, setPassword] = useState("Priya@1234");
    const [errorMsg, setErrorMsg] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
  
    const handleSignUp = async () => {
      try {
        const res = await axios.post(
          BASE_URL + "/signup",
          {
            firstName,
            lastName,
            emailId,
            password
          },
          { withCredentials: true }
        );
        dispatch(addUser(res.data));
        navigate("/login");
        setErrorMsg("successfully signed Up , Please login ✅");
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
          <legend className="fieldset-legend">Sign Up</legend>
  
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
  
  
          <p className="text-red-500 text-center mt-2">{errorMsg}</p>
  
          <button className="btn btn-neutral mt-4" onClick={handleSignUp}>
           Sign Up
          </button>
        </fieldset>
      </div>
    );
  };
  

export default SignUp