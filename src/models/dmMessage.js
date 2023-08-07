const mongoose = require('mongoose');

let app = mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    content: {
      type: Date,
      required: true,
    },
    author: {
      type: String,
      ref: 'users',
      default: false,
    },
  },
  {
    _id: false,
    timestamps: true,
  },
);

module.exports = mongoose.model('dmMessages', app);
