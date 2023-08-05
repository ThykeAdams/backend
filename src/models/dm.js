const mongoose = require("mongoose");

let app = mongoose.Schema(
  {
    participants: {
      type: [String],
      ref: "users",
      required: true,
    },
    lastMessage: {
      type: Date,
      required: true,
    },
    isPriority: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("dms", app);