const { Server } = require("socket.io");
const userModel = require("./models/user")
const fs = require("node:fs")
global.sessions = new Map();

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"] 
    }
})

const events = io.of("/events")

events.on("connection", async (socket) => { 
    if (socket.handshake.query["token"]) {
     let user = await userModel.findOne({ token: socket.handshake.query["token"]})
     if (user) {
            user.online = true;
            user.save().then(() => {
                sessions.set(user.id, socket);
                io.sockets.emit("PresenceUpdate", user);
            });
            console.info(`User connected ${user?.username}`);
            events.emit("ready", user)
        } 

        socket.on("disconnect", async (args) => {
            console.log(`User disconnected ${user?.username}`)
         })
    }
})

