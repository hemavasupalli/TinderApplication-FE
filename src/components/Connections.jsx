import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionsSlice";
import axios from "axios";
import { BASE_URL } from "../constants";

import ConnectionsList from "./ConnectionsList";
import ChatWindow from "./ChatWindow";

const Connections = () => {
  const connections = useSelector((store) => store.connection);
  const dispatch = useDispatch();
  const [selectedUser, setSelectedUser] = useState(null);
  
  const fetchConnections = async () => {
    if (connections.length > 0) return;
    try {
      const res = await axios.get(`${BASE_URL}/user/connections`, { withCredentials: true });

      dispatch(addConnection(res.data.data));
    } catch (err) {
      console.error("Error fetching connections:", err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  return (
    <div className="flex flex-col md:flex-row h-140 bg-gray-50">
      {/* Connections list */}
      <div className="flex-shrink-0 w-full md:w-72 border-r border-gray-200">
        <ConnectionsList connections={connections} onSelectUser={setSelectedUser} />
      </div>

      {/* Chat window */}
      <div className="flex-1">
        <ChatWindow selectedUser={selectedUser} />
      </div>
    </div>
  );
};

export default Connections;
