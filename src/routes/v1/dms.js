const express = require('express');
const { verifyToken } = require('../../util/middleware');
const { createDmMessage } = require('../../util/messages');
const router = express.Router();
const dmModel = require('../../models/dm');

router.post('/:userId/messages', verifyToken, async (req, res) => {
  try {
    const dm = await dmModel.findOne({
      participants: { $all: [req.user._id, req.params.userId] },
    });
    if (!dm) return res.status(404).json({ message: 'DM not found.' });

    const content = req.body.content || req.header('content');
    if (!content)
      return res
        .status(400)
        .json({ message: 'Please provide content for your message!' });

    /*events.emit("DirectMessageCreate", {
      author: {
        id: req.user._id,
        username: req.user.username,
        avatar: req.user.avatar,
      },
      content,
      createdAt: Date.now(),
    });*/

    const id = Math.random().toString(36).substr(2, 9);

    const data = {
      dm,
      author: req.user,
      content,
      id,
      nonce: req.body.nonce,
    };

    createDmMessage(events, data);
    return res.status(200).json({ message: 'Message sent!', id: data.id });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
});

router.post('/:userId/');

module.exports = router;
