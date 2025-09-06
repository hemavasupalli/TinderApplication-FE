import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionsSlice";

const Connections = () => {
  const connections = useSelector((store) => store.connection);
  const dispatch = useDispatch();
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  // Fetch connections
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

  // Mock fetching messages for selected user
  useEffect(() => {
    if (!selectedUser) return;

    // In real app, fetch messages via API
    setMessages([
      {
        id: 1,
        sender: "self",
        text: "Hello!",
        time: "12:00",
      },
      {
        id: 2,
        sender: "other",
        text: `Hi ${selectedUser.firstName}!`,
        time: "12:01",
      },
    ]);
  }, [selectedUser]);

  const handleSend = () => {
    if (!newMessage.trim()) return;
    setMessages([...messages, { id: Date.now(), sender: "self", text: newMessage, time: "Now" }]);
    setNewMessage("");
  };

  return (
    <div className="flex h-150 bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 md:w-72 bg-white border-r border-gray-200 flex flex-col">
        <div className="px-4 py-3 border-b border-gray-200">
          <h1 className="text-lg font-semibold text-gray-700">Messages</h1>
        </div>
        <div className="flex-1 overflow-y-auto p-2">
          {(!connections || connections.length === 0) ? (
            <div className="flex justify-center items-center h-full">
              <p className="text-gray-500 text-sm">No connections found</p>
            </div>
          ) : (
            connections.map((c) => (
              <button
                key={c._id}
                onClick={() => setSelectedUser(c)}
                className="flex items-center space-x-3 w-full p-2 mb-2 rounded-lg hover:bg-gray-100 transition"
              >
                <img
                  src={c.photoUrl || "https://via.placeholder.com/40"}
                  alt={c.firstName}
                  className="w-10 h-10 rounded-full object-cover border border-gray-300"
                />
                <span className="text-sm font-medium text-gray-800">{c.firstName} {c.lastName}</span>
              </button>
            ))
          )}
        </div>
      </div>

      {/* Chat Window */}
      <div className="flex-1 flex flex-col">
        {!selectedUser ? (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            Select a connection to start chatting
          </div>
        ) : (
          <div className="flex flex-col flex-1">
            {/* Header */}
            <div className="p-4 border-b bg-white font-semibold text-gray-700">
              {selectedUser.firstName} {selectedUser.lastName}
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <div key={msg.id} className={`chat ${msg.sender === "self" ? "chat-end" : "chat-start"}`}>
                  <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                      <img
                        src={msg.sender === "self" 
                          ? "https://img.daisyui.com/images/profile/demo/anakeen@192.webp"
                          : selectedUser.photoUrl || "https://via.placeholder.com/40"
                        }
                        alt="user"
                      />
                    </div>
                  </div>
                  <div className="chat-header">
                    {msg.sender === "self" ? "You" : selectedUser.firstName}
                    <time className="text-xs opacity-50 ml-2">{msg.time}</time>
                  </div>
                  <div className="chat-bubble">{msg.text}</div>
                  <div className="chat-footer opacity-50">{msg.sender === "self" ? "Delivered" : "Seen"}</div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="p-4 border-t bg-white flex space-x-2">
              <input
                type="text"
                className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-300"
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
              />
              <button
                onClick={handleSend}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
              >
                Send
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Connections;
