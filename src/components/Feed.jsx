import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice.js";
import UserViewCard from "./UserViewCard";
import { BASE_URL } from "../constants";
import { removeFeed } from "../utils/feedSlice.js";

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
  
  const handleFeed = async (status, id) => {
    try {
  await axios.post(
        BASE_URL + "/send/" + status + "/" + id,
        {},
        {
          withCredentials: true,
        }
      );
      console.log(feed[0]._id);

      dispatch(removeFeed(id));
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getFeed();
  }, []);

  if (!feed || feed.length <= 0) {
    return (
      <div className="flex justify-center items-center h-[50vh] text-gray-500">
        No feed available
      </div>
    );
  }

  return (
    <div >
     
        <UserViewCard feed={feed[0]} handleFeed={handleFeed} />
    
    </div>
  );
};

export default Feed;
