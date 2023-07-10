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
        await userModel.findOne({ token: socket.handshake.query["token"]}).then(async (user) => {
            user.online = true;
            user?.save().then(() => {
                sessions.set(user.id, socket);
                io.sockets.emit("PresenceUpdate", user);
            });
            console.info(`User Connected ${user?.username}`);
        })
    }

socket.on("disconnect", async (args) => {
    console.log("User disconnected imagine ")
 })
})

