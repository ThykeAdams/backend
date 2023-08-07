const mongoose = require('mongoose');

let app = mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
    },
    owner: {
      type: String,
      ref: 'users',
      required: true,
    },
  },
  {
    _id: false,
    timestamps: true,
  },
);

module.exports = mongoose.model('guilds', app);
