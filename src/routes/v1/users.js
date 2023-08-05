const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.send("Please help")
})

module.exports = router;