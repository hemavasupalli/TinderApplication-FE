import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import UserViewCard from "./UserViewCard";
import { BASE_URL } from "../constants";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const getFeed = async () => {
    if (feed.length > 0 || !user) return; 
    try {
      const res = await axios.get(BASE_URL + "/user/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res.data.data));
    } catch (err) {
      console.error("Error fetching feed:", err);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  if (!feed || feed.length === 0) {
    return (
      <div className="flex justify-center items-center h-[50vh] text-gray-500">
        No feed available
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center space-y-6 px-4 md:px-0">
      {feed.map((item, index) => (
        <UserViewCard key={item._id || index} feed={item} />
      ))}
    </div>
  );
};

export default Feed;
