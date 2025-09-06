// ChatWindow.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../constants";


const ChatWindow = ({ selectedUser }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  // Fetch chat history when selectedUser changes
  const fetchChat = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/connections/chat/${selectedUser._id}`, { withCredentials: true });
      setMessages(res.data.messages || []);
    } catch (err) {
      console.error("Error fetching chat:", err);
      setMessages([]);
    }
  };
  useEffect(() => {


    fetchChat();
  }, [selectedUser]);

  const handleSend = async () => {
    if (!newMessage.trim()) return;
    try {
      const res = await axios.post(
        `${BASE_URL}/connections/chat/${selectedUser._id}`,
        { text: newMessage },
        { withCredentials: true }
      );
      setMessages([...messages, res.data.message]);
      setNewMessage("");
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };

  if (!selectedUser) {
    return <div className="flex-1 flex items-center justify-center text-gray-500">Select a connection to start chatting</div>;
  }

  return (
    <div className="flex flex-col flex-1">
      {/* Header */}
      <div className="p-4 border-b bg-white font-semibold text-gray-700">
        {selectedUser.firstName} {selectedUser.lastName}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div key={msg._id || msg.id} className={`chat ${msg.sender === "self" ? "chat-end" : "chat-start"}`}>
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
  );
};

export default ChatWindow;
