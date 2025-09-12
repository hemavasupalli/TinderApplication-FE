import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../constants";
import { addConnection } from "../utils/connectionsSlice";
import ConnectionCard from "./ConnectionCard";

const Connections = () => {
  const connections = useSelector((store) => store.connection);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const fetchConnections = async () => {
    if (connections.length > 0) return; // avoid refetching if already loaded
    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/user/connections`, {
        withCredentials: true,
      });
      dispatch(addConnection(res.data.data));
    } catch (err) {
      console.error("Error fetching connections:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConnections();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading)
    return (
      <h1 className="text-center text-gray-500 mt-10">Loading connections...</h1>
    );

  if (!connections || connections.length === 0)
    return (
      <h1 className="text-center text-gray-500 mt-10">No connections found</h1>
    );

  return (
    <div className="flex flex-col items-center my-5 px-2 sm:px-4 w-full">
    <h1 className="text-xl font-bold text-gray-900 mb-4 text-center tracking-wide relative">
      Connections
      <div className="w-16 h-1 bg-black mx-auto mt-2 rounded-full"></div>
    </h1>
  
    <div className="w-full max-w-xl max-h-[70vh] overflow-y-auto space-y-4 pr-2 sm:pr-4">
      {connections.map((connection) => (
        <ConnectionCard
          key={connection._id}
          connection={connection}
          requestId={connection._id}
          showActions={false}
        />
      ))}
    </div>
  </div>
  
  );
};

export default Connections;