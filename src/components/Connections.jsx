// Connections.jsx
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
      const res = await axios.get(BASE_URL + "/user/connections", { withCredentials: true });
      dispatch(addConnection(res.data.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  return (
    <div className="flex h-150 bg-gray-50">
      <ConnectionsList connections={connections} onSelectUser={setSelectedUser} />
      <ChatWindow selectedUser={selectedUser} />
    </div>
  );
};

export default Connections;
