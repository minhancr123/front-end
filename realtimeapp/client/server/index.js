const express = require("express");
const cors = require("cors");
const http = require("http");
const mongoose = require("mongoose");
const { Server } = require("socket.io");
const dotenv = require("dotenv");
const { Socket } = require("socket.io-client");
const { clearScreenDown } = require("readline");
const route = require("./routes/auth");
const cookieParser = require("cookie-parser");

dotenv.config();

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

app.use(cors());

app.use(express.json());
app.use(cookieParser());
app.use("/api", route);
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    ssl: false,
  })
  .then(() => console.log("Connected"))
  .catch(() => console.log("Error"));

io.on("connection", (Socket) => {
  console.log("Connected Socket:" + Socket.id);

  Socket.on("send_message", (data) => {
    io.emit("receive_data", data);
  });

  Socket.on("send_receive", (data) => {
    io.emit("receive_data", data);
  });

  Socket.on("disconnect", () => {
    console.log("User disconnected", Socket.id);
  });
});

const port = process.env.PORT || 5000;

server.listen(port, () => {
  console.log("Server running on port" + port);
});
