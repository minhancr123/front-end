const mongoose = require("mongoose");

const messageSchema = mongoose.Schema(
  {
    sender: { type: String, required: true },
    content: { type: String, required: true },
    conversations: {
      type: Object,
      conversationId: { type: String },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", messageSchema);
