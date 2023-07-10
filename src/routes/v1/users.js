const express = require("express");
const { verifyToken } = require("../../util/middleware");
const router = express.Router();

router.get("/", (req, res) => {
    res.send("Please help")
})

router.get("/:id", verifyToken, (req, res) => {

})

module.exports = router;