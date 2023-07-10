const express = require("express");
const { verifyToken } = require("../../util/middleware");
const { json } = require("body-parser");
const router = express.Router();

router.get("/", verifyToken, (req, res) => {
    const search = req.query.q;
    if (!search) return res.status(400).json({ message: "Please provide a search request."});
    res.json({ bots: [{ username: "AutoMod" }, { username: "Sky" }] })
})

module.exports = router;