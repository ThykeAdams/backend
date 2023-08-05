const express = require("express");
const userModel = require("../../models/user");
const Generator = require("../../util/generator");
const { verifyToken } = require("../../util/middleware");
const bcrypt = require("bcrypt");
const router = express.Router();

router.get("/", (req, res) => {
    res.send("Please help")
})

router.post("/login", async (req, res) => {
    console.log(req.body)
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: "Username and Password are required."})
    }
     let user = await userModel.findOne({ username });
     if (!user) res.status(404).json({ message: "A user with this username could not be found."})
  
     bcrypt.compare(password, user.password, (bcryptErr, isMatch) => {
        if (bcryptErr) {
            return res.status(500).json({ message: "Internal Server Error."})
        }
        if (!isMatch) {
            return res.status(401).json({ message: "Invaild Username or Password"})
        }

        res.json(user);
     })
})

router.post("/register", async (req, res) => {
    const { username, email, password, discriminator, dob } = req.body;
    
    if (!username || !email || !password || !discriminator || !dob) {
        return res.status(400).json({ message: "Username, Email, Password, Discriminator, and Date of Birth (DOB) are required."})
    }

   if (await userModel.findOne({ email })) return res.status(409).json({ message: "There is already a account with this Email."});
   if (await userModel.findOne({ username, discriminator })) return res.status(409).json({ message: "There is already a account with this username and discriminator."})

   try {
    bcrypt.hash(password, 10, async (err, hashedPassword) => {
        if (err) {
          return res.status(500).json({ error: 'Internal server error.' });
        }
      const _id = await Generator.generateId();
      const user = await userModel.create({ 
         _id,
         username, 
         email, 
         password: hashedPassword, 
         discriminator,
         dob,
         token: await Generator.generateToken(_id, hashedPassword)
    });
    res.json(user);
});
   } catch(err) {
    res.status(500).json({ message: "Internal Server Error"})
    console.log(err.message)
   }
});

router.get("/verify", verifyToken, (req, res) => {
    res.status(200).json({ user: req.user });
});

module.exports = router;