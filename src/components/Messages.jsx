import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionsSlice";
import axios from "axios";
import { BASE_URL } from "../constants";

import ConnectionsList from "./ConnectionsList";
import ChatWindow from "./ChatWindow";

const Messages = () => {
  const connections = useSelector((store) => store.connection);
  const dispatch = useDispatch();
  const [selectedUser, setSelectedUser] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
    <div className="flex  h-100   bg-gray-50">
      {/* Connections list */}
      {(selectedUser === null || !isMobile) && (
        <div className="flex-shrink-0 w-full md:w-72 border-r border-gray-200">
          <ConnectionsList
            connections={connections}
            onSelectUser={setSelectedUser}
          />
        </div>
      )}

      {/* Chat window */}
      {(selectedUser !== null || !isMobile) && (
        <div className="flex-1">
          <ChatWindow
            selectedUser={selectedUser}
            onBack={isMobile ? () => setSelectedUser(null) : undefined}
          />
        </div>
      )}
    </div>
  );
};

export default Messages;
