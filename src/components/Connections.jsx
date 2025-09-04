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
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-semibold text-center text-gray-900 mb-6">
        Your Connections
      </h1>

      {/* Scrollable list */}
      <div className="flex flex-col gap-6 overflow-y-auto max-h-[80vh]">
        {connections.map((connection) => (
          <ConnectionCard
            key={connection._id}
            connection={connection}
            showActions={false} // show accept/reject buttons
          />
        ))}
      </div>
    </div>
  );
};

export default Connections;
