

async function verifyToken(req, res, next) {
    const userModel = require("../models/user");
    const token = req.header("Authorization");
    if (!token) return res.status(401).json({ message: "Access Denied" });
     
     let user = await userModel.findOne({ token });
     if (!user) return res.status(400).json({ message: "Access Denied" });

      req.user = user;
      if (req.user) next();
      else res.status(400).json({ message: "Access Denied" });
}

module.exports = { verifyToken }