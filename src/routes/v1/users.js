const express = require("express");
const { verifyToken } = require("../../util/middleware");
const router = express.Router();

router.get("/", (req, res) => {
    res.send("Please help")
})

router.get("/:id", verifyToken, (req, res) => {

})

router.get("/status", verifyToken, (req, res) => {
   res.status(200).json(req.user.status, req.user.online)
})

module.exports = router;