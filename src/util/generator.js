const jwt = require('jsonwebtoken');
require("dotenv").config();

async function generateId() {
  const userModel = require("../models/user");
  const lastUser = await userModel.findOne({}, {}, { sort: { '_id': -1 } });
  let userId = 1000000000000000;
  if (lastUser && lastUser._id) {
    let lastUserId = parseInt(lastUser._id);
    userId = lastUserId + 1;
  }
   return userId;
}

async function generateToken(userId) {
    const token = jwt.sign({ userId: userId }, process.env.TOKEN_SECRET);
    return token;
}

module.exports = { generateId, generateToken }