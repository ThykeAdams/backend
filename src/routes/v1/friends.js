const express = require("express");
const { verifyToken } = require("../../util/middleware");
const router = express.Router();

router.get("/", verifyToken, (req, res) => {
   
})

module.exports = router;