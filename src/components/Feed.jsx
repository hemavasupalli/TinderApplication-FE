import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFeed, removeFeed } from "../utils/feedSlice.js";
import UserViewCard from "./UserViewCard";
import { BASE_URL } from "../constants";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();

  // Fetch feed
  const fetchFeed = async () => {
    if (!user) return;
    try {
      const res = await axios.get(`${BASE_URL}/user/feed`, {
        withCredentials: true,
      });


      // Filter opposite gender

      dispatch(addFeed(res.data.data));
    } catch (err) {
      console.error("Error fetching feed:", err);
    }
  };

  // Handle accept/reject
  const handleFeed = async (status, id) => {
    try {
      await axios.post(`${BASE_URL}/send/${status}/${id}`, {}, { withCredentials: true });
      dispatch(removeFeed(id));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchFeed();
  }, [user]);

  if (!feed || feed.length === 0) {
    return (
      <div className="flex justify-center items-center h-[50vh] text-gray-500">
        No feed available
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center h-screen p-4 bg-gray-50">
      {/* Display top profile */}
      <div className="w-full max-w-md sm:max-w-lg md:max-w-xl h-full">
        <UserViewCard feed={feed[0]} handleFeed={handleFeed} />
      </div>
    </div>
  );
  
};

export default Feed;