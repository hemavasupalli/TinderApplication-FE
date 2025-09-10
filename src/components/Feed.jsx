import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFeed, removeFeed } from "../utils/feedSlice.js";
import UserViewCard from "./UserViewCard";
import { BASE_URL } from "../constants";

const Feed = () => {
  //const feed = useSelector((store) => store.feed);
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const [filteredFeed, setFilteredFeed] = useState([]);

  // Fetch feed
  const fetchFeed = async () => {
    if (!user) return;
    try {
      const res = await axios.get(`${BASE_URL}/user/feed`, {
        withCredentials: true,
      });
      const allUsers = res.data.data;

      // Filter opposite gender
      const oppositeGender = user.gender === "Female" ? "Male" : "Female";
      const filtered = allUsers.filter(
        (u) => u.gender === oppositeGender && u._id !== user._id
      );

      dispatch(addFeed(filtered));
      setFilteredFeed(filtered);
    } catch (err) {
      console.error("Error fetching feed:", err);
    }
  };

  // Handle accept/reject
  const handleFeed = async (status, id) => {
    try {
      await axios.post(`${BASE_URL}/send/${status}/${id}`, {}, { withCredentials: true });
      dispatch(removeFeed(id));
      setFilteredFeed((prev) => prev.filter((f) => f._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchFeed();
  }, [user]);

  if (!filteredFeed || filteredFeed.length === 0) {
    return (
      <div className="flex justify-center items-center h-[50vh] text-gray-500">
        No feed available
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center h-[70vh]">
      {/* Display top profile */}
      <UserViewCard feed={filteredFeed[0]} handleFeed={handleFeed} />
    </div>
  );
};

export default Feed;