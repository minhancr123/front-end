const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const route = express.Router();
const User = require("../models/Users");
const Messages = require("../models/Messages");
// Đổi từ `route.get` sang `route.post` cho register
route.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const passwordhashed = await bcrypt.hash(password, 10);
  try {
    const newuser = await User.create({ username, password: passwordhashed });
    res.json({ message: "User created successfully", newuser });
  } catch (err) {
    res.status(500).json(err);
  }
});

route.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username }); // Sửa lại `find` thành `findOne`

  if (!user) return res.status(404).json({ message: "User not found" });

  const ismatch = await bcrypt.compare(password, user.password);
  if (!ismatch) return res.status(404).json({ message: "Wrong password" });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h", // Sửa lại `exprireIn` thành `expiresIn`
  });

  res.json({ token, username: user.username });
});

route.post("/pulldata", async (req, res) => {
  const { sender, message } = req.body;
  const newmessage = await Messages.create({ sender, message });
  if (newmessage) {
    res.status(200).json({ message: newmessage });
  } else {
    res.status(500).json("Error");
  }
});

module.exports = route;
