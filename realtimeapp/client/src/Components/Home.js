import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import "../css/Home.css";
import Messages from "./Messages";
import ChatDetails from "./ChatDetails";
import { Section } from "./Section";
function Home() {
  return (
    <div className="flex items-center justify-center w-screen h-screen ">
      <Section>
        <div
          className="flex h-full p-8 rounded-lg"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}
        >
          <ChatDetails></ChatDetails>
          <Messages></Messages>
        </div>
      </Section>
    </div>
  );
}

export default Home;
