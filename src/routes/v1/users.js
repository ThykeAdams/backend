const express = require('express');
const { verifyToken } = require('../../util/middleware');
const dmModel = require('../../models/dm');
const userModel = require('../../models/user');
const friendRequestModel = require('../../models/friendRequset');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Please help');
});

router.get('/status', verifyToken, (req, res) => {
  res.status(200).json({ status: req.user.status, online: req.user.online });
});

router.get('/dms', verifyToken, async (req, res) => {
  try {
    const dms = await dmModel.find({ participants: { $all: [req.user._id] } });
    res.status(200).json(dms);
  } catch (error) {
    console.error('Error fetching DMs:', error);
    res.status(500).json({ error: 'Failed to fetch DMs' });
  }
});

router.post('/dms', verifyToken, async (req, res) => {});

router.get('/friends', verifyToken, async (req, res) => {
  let friends = req.user.friends;
  res.status(200).json(friends);
});

router.post('/friends/new', verifyToken, async (req, res) => {
  const { username, discriminator } = req.body;
  if (!username || !discriminator)
    return res.status(400).json({ message: 'Please provide a recipient.' });

  const recipientRaw = await userModel.findOne({ username, discriminator });
  if (!recipientRaw)
    return res
      .status(404)
      .json({ message: 'The provided user could not be found.' });

  const userHasFriend = req.user.friends.find(
    (friend) => friend.username === otherUser.username,
  );
  const otherUserHasFriend = recipientRaw.friends.find(
    (friend) => friend.username === user.username,
  );

  if (userHasFriend || otherUserHasFriend) {
    return res
      .status(400)
      .json({ message: 'This user is already your friend.' });
  }
  let friendRequest = await friendRequestModel.create({
    sender: req.user._id,
    recipient: recipientRaw._id,
  });

  events.emit('FriendRequestCreate', {
    sender: req.user,
    recipient: recipientRaw,
  });
  return res
    .status(200)
    .json({
      message: `Friend request sent to ${recipientRaw.username} successfully.`,
    });
});

router.get('/:userid', verifyToken, async (req, res) => {
  let userRaw = await userModel.findById({ _id: req.params.userid });
  if (!userRaw)
    return res
      .status(404)
      .json({ message: "Couldn't find that user in the database." });
  res.status(200).json(userRaw);
});

module.exports = router;
