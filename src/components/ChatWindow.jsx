// ChatWindow.jsx
import React, { useEffect, useState, useRef } from "react";
import { BASE_URL } from "../constants";
import {
  createSocketConnection,
  formatLastSeen,
  formatTime,
} from "../utils/socket";
import { useSelector } from "react-redux";
import axios from "axios";

const ChatWindow = ({ selectedUser }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [socket, setSocket] = useState(null);
  const user = useSelector((store) => store.user);
  const userId = user?._id;
  const selectedUserId = selectedUser?._id;
  const messagesEndRef = useRef(null);
  const { isOnline, lastSeen } = selectedUser || {};

  const SelectedUserLastSeen = formatLastSeen(isOnline, lastSeen);
  // Scroll to bottom when messages update
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Fetch chat history from backend
  const fetchChat = async () => {
    if (!selectedUserId) return;
    try {
      const res = await axios.get(`${BASE_URL}/chat/${selectedUserId}`, {
        withCredentials: true,
      });
      const formattedMessages = res.data.messages.map((msg) => ({
        _id: msg._id,
        text: msg.text,
        time: formatTime(msg.updatedAt || msg.createdAt || new Date()),
        sender: msg.senderId._id === userId ? "self" : "other",
        firstName: msg.senderId.firstName || "",
      }));
      setMessages(formattedMessages);
    } catch (err) {
      console.error("Error fetching chat:", err);
    }
  };

  // Initialize socket connection
  useEffect(() => {
    if (!userId || !selectedUserId) return;

    const newSocket = createSocketConnection();
    setSocket(newSocket);

    newSocket.emit("joinChat", {
      firstName: user?.firstName,
      userId,
      selectedUserId,
    });

    newSocket.on("messageReceived", (message) => {
      setMessages((prev) => [
        ...prev,
        {
          _id: message._id,
          text: message.text,
          time: formatTime(
            message.updatedAt || message.createdAt || new Date()
          ),
          sender: message.senderId === userId ? "self" : "other",
        },
      ]);
    });

    fetchChat();

    return () => newSocket.disconnect();
  }, [userId, selectedUserId]);

  // Send message via socket
  const handleSend = () => {
    if (!newMessage.trim() || !socket) return;

    socket.emit("sendMessage", {
      firstName: user?.firstName,
      userId,
      selectedUserId,
      text: newMessage,
    });

    setNewMessage(""); // clear input after sending
  };

  if (!selectedUser) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-500">
        Select a connection to start chatting
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1 h-full">
      <div className="p-4 border-b bg-white flex-shrink-0 flex flex-col">
        <div className="flex items-center space-x-2">
          <span
            className={`w-3 h-3 rounded-full ${
              selectedUser.isOnline
                ? "bg-green-500"
                : selectedUser.lastSeen
                ? "bg-orange-300"
                : "bg-gray-400"
            }`}
          ></span>

          {/* User Name */}
          <span className="font-semibold text-gray-700">
            {selectedUser.firstName} {selectedUser.lastName}
          </span>
        </div>

        <span className="text-xs pl-5 text-gray-500 mt-1">
          {selectedUser.isOnline
            ? "Online"
            : selectedUser.lastSeen
            ? `${formatLastSeen(false, selectedUser.lastSeen)}`
            : "Offline"}
        </span>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg._id}
            className={`chat ${
              msg.sender === "self" ? "chat-end" : "chat-start"
            }`}
          >
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img
                  src={
                    msg.sender === "self"
                      ? user.photoUrl
                      : selectedUser.photoUrl ||
                        "https://via.placeholder.com/40"
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
            <div className="chat-footer opacity-50">
              {msg.sender === "self" ? "Delivered" : "Seen"}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} /> {/* Auto-scroll */}
      </div>

      {/* Input */}
      <div className="p-4 border-t bg-white flex-shrink-0 flex space-x-2">
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
          className="bg-black text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;