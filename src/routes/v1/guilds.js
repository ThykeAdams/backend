const express = require('express');
const { verifyToken } = require('../../util/middleware');
const router = express.Router();

router.post('/create', verifyToken, (req, res) => {
  const { name } = req.body;
  if (!name)
    return res
      .status(400)
      .json({ message: 'Please provide the name of the guild.' });
});

module.exports = router;
