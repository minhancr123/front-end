import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import "../css/Home.css";
import Avatar from "../assets/avatar.png";
import Camera from "../assets/camera.png";
import Phone from "../assets/phone.png";
import Info from "../assets/info.png";
import Video from "../assets/video.png";
import Mic from "../assets/mic.png";
import Emoji from "../assets/emoji.png";
import Img from "../assets/img.png";
import { useSelector } from "react-redux";
import EmojiPicker from "emoji-picker-react";
import { current } from "@reduxjs/toolkit";
const socket = io("http://localhost:5000");
function Messages() {
  const [message, setmessage] = useState();
  const [messages, setmessages] = useState([]);
  const [Username, setUsername] = useState();
  const [openEmoji, setopenEmoji] = useState(false);
  const [sender, setsender] = useState("");
  const { currentplayer } = useSelector((state) => state.user);
  const [text, settext] = useState();
  const sendMessage = () => {
    if (message) {
      socket.emit("send_message", { sender: Username, content: message });
      setmessage("");
    }
  };

  useEffect(() => {
    socket.on("receive_data", (data) => {
      setmessages((prevMessages) => [...prevMessages, data]);
      setsender(data.sender);
    });

    handleLoginSuccess();
    // Cleanup listener khi component unmount
    return () => socket.off("receive_data");
  }, []);
  const handleEmoji = (e) => {
    setmessage((prev) => prev + e.emoji);
  };
  const handleLoginSuccess = () => {
    const savedUsername = localStorage.getItem("username");
    setUsername(savedUsername);
  };
  return (
    <div className="w-[40vw] flex flex-col">
      <div className="flex items-center justify-between pb-2 border-b-2 border-white border-solid">
        <div className="flex w-[50px]  gap-3">
          <img src={`${Avatar}`} className="w-full rounded-full"></img>
          <h3>Welcome, {Username}!</h3>
        </div>
        <div className="flex gap-3">
          <img src={`${Phone}`} style={{ width: "20px", height: "20px" }}></img>
          <img src={`${Video}`} style={{ width: "20px", height: "20px" }}></img>
          <img src={`${Info}`} style={{ width: "20px", height: "20px" }}></img>
        </div>
      </div>
      <div className="flex flex-col ">
        {messages.map((msg, index) => (
          <div
            className={`flex ${
              msg.sender === currentplayer ? "justify-start  " : "justify-end  "
            }`}
          >
            <div
              className={`p-2 rounded-lg max-w-[70%] ${
                msg.sender === currentplayer
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 text-black"
              }`}
            >
              <strong>{msg.sender}:</strong>
              {msg.content}
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-3 mt-auto">
        <div className="flex w-16 gap-1">
          <img src={`${Img}`} style={{ width: "20px", height: "20px" }}></img>
          <img
            src={`${Camera}`}
            style={{ width: "20px", height: "20px" }}
          ></img>
          <img src={`${Mic}`} style={{ width: "20px", height: "20px" }}></img>
        </div>
        <input
          type="text"
          value={message}
          onChange={(e) => setmessage(e.target.value)}
          placeholder="Type your message"
          className="flex-1 p-2 text-white bg-transparent rounded-lg outline-none bg-zinc-900"
        />

        <div className="flex items-center gap-2">
          <div className="relative ">
            <img
              src={`${Emoji}`}
              style={{ width: "20px", height: "20px" }}
              onClick={() => {
                setopenEmoji(!openEmoji);
              }}
            ></img>
            <div className="absolute bottom-[50px] left-0">
              <EmojiPicker open={openEmoji} onEmojiClick={handleEmoji} />
            </div>
          </div>
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
}

export default Messages;
