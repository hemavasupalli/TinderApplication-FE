import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import UserViewCard from "./UserViewCard";
import { BASE_URL } from "../constants";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const getFeed = async () => {
    if (feed.length > 0) return; 
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
    return <p className="text-center mt-10">No connections found</p>;
  }

  return <UserViewCard feed={feed[1]} />;
};

export default Feed;
