const mongoose = require("mongoose");

let app = mongoose.Schema(
  {
    sender: {
        type: String,
        ref: "users",
        required: true
    },
    recipient: {
        type: String,
        ref: "users",
        required: true
    }
  },
  {
    _id: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("friendRequests", app);