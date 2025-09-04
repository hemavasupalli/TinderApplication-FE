import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionsSlice";
import ConnectionCard from "./ConnectionCard";

const Connections = () => {
  const connections = useSelector((store) => store.connection);
  const dispatch = useDispatch();

  const fetchConnections = async () => {
    if (connections.length > 0) return; // Only fetch if empty
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnection(res.data.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections || connections.length === 0)
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <p className="text-gray-500 text-lg">No connections found</p>
      </div>
    );

  return (
    <div className="flex flex-col items-center my-10 space-y-6 px-2 md:px-0">
      <h1 className="text-2xl font-bold mb-6">Requests</h1>

      {/* Scrollable list */}
        {connections.map((connection) => (
          <ConnectionCard
            key={connection._id}
            connection={connection}
            showActions={false} // show accept/reject buttons
          />
        ))}
    </div>
  );
};

export default Connections;
