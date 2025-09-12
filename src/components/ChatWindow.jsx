import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../constants";
import { formatLastSeen, formatTime, createSocketConnection } from "../utils/socket";

const ChatWindow = ({ selectedUser, onBack }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const user = useSelector((store) => store.user);
  const messagesEndRef = useRef(null);

  const userId = user?._id;
  const selectedUserId = selectedUser?._id;

  const scrollToBottom = () =>
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  useEffect(scrollToBottom, [messages]);

  const fetchChat = async () => {
    if (!selectedUserId) return;
    try {
      const res = await axios.get(`${BASE_URL}/chat/${selectedUserId}`, {
        withCredentials: true,
      });
      const formatted = res.data.messages.map((msg) => ({
        _id: msg._id,
        text: msg.text,
        time: formatTime(msg.updatedAt || msg.createdAt),
        sender: msg.senderId._id === userId ? "self" : "other",
      }));
      setMessages(formatted);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (!userId || !selectedUserId) return;
    const socket = createSocketConnection();

    socket.emit("joinChat", {
      userId,
      selectedUserId,
      firstName: user?.firstName,
    });

    socket.on("messageReceived", (msg) => {
      setMessages((prev) => [
        ...prev,
        {
          _id: msg._id,
          text: msg.text,
          time: formatTime(msg.updatedAt || msg.createdAt),
          sender: msg.senderId === userId ? "self" : "other",
        },
      ]);
    });

    fetchChat();
    return () => socket.disconnect();
  }, [userId, selectedUserId]);

  const handleSend = () => {
    if (!newMessage.trim()) return;
    const socket = createSocketConnection();
    socket.emit("sendMessage", { userId, selectedUserId, text: newMessage });
    setNewMessage(""); // ✅ clear input only, no duplicate append
  };

  if (!selectedUser) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-500">
        Select a chat
      </div>
    );
  }

  return (
<div className="flex flex-col h-120 md:h-140 bg-gray-100">
{/* Header */}
<div className="flex items-center p-4 bg-white border-b shadow-sm">
{/* Back button only on mobile */}
        {onBack && (
          <button
            onClick={onBack}
            className="mr-3 text-gray-600 hover:text-gray-800 md:hidden"
          >
            ←
          </button>
        )}

        {/* Profile picture */}
        <div className="relative">
          <img
            src={selectedUser.photoUrl || "https://via.placeholder.com/40"}
            alt="profile"
            className="w-10 h-10 rounded-full mr-3"
          />
        </div>

        {/* User info */}
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-gray-900">
              {selectedUser.firstName}
            </span>
            {/* Inline status dot beside name */}
            <span
              className={`w-2 h-2 rounded-full ${
                selectedUser.isOnline
                ? "bg-green-500"
                : selectedUser.lastSeen
                ? "bg-orange-300"
                : "bg-gray-400"
              }`}
            ></span>
          </div>
          <span className="text-sm text-gray-500">
            {selectedUser.isOnline
              ? "Online"
              : formatLastSeen(false, selectedUser.lastSeen)}
          </span>
        </div>
      </div>

      {/* Chat messages */}
      <div className="flex-1 flex flex-col justify-end overflow-y-auto p-4 space-y-2">
      {messages.map((msg) => (
          <div
            key={msg._id}
            className={`flex ${
              msg.sender === "self" ? "justify-end" : "justify-start"
            }`}
          >
            {msg.sender === "other" && (
              <img
                src={selectedUser.photoUrl || "https://via.placeholder.com/40"}
                className="w-8 h-8 rounded-full mr-2"
              />
            )}
            <div
              className={`max-w-[70%] px-4 py-2 rounded-lg ${
                
                msg.sender === "self"
                  ? "bg-black text-white rounded-br-none"
                  : "bg-white text-gray-900 rounded-bl-none shadow"
              }`}
            >
              {msg.text}
              <div className="text-xs text-gray-200 mt-1 text-right">
                {msg.time}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef}></div>
      </div>

      {/* Input */}
      <div className="flex p-2 border-t bg-white">
      <input
          type="text"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-300 text-sm"
        />
        <button
          onClick={handleSend}
          className="ml-2 bg-black text-white px-4 py-2 rounded-full hover:bg-black-600 transition text-sm"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
