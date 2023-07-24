const express = require("express");
const { verifyToken } = require("../../util/middleware");
const router = express.Router();
const dmModel = require("../../models/dm");

router.post("/:userId/messages", verifyToken, async (req, res) => {
  try {
    const dm = await dmModel.findOne({
      participants: [req.user._id, req.params.userId],
    });
    if (!dm) return res.status(404).json({ message: "DM not found." });

    const content = req.body.content || req.header("content");
    if (!content)
      return res
        .status(400)
        .json({ message: "Please provide content for your message!" });

    events.emit("DirectMessageCreate", {
      author: {
        id: req.user._id,
        username: req.user.username,
        avatar: req.user.avatar,
      },
      content,
      createdAt: Date.now(),
    });

    return res.status(200).json("Message sent successfully!");
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
