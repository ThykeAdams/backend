const { Server } = require("socket.io");
const fs = require("node:fs")
global.sessions = new Map();

const io = new Server(server, {
    cors: {
        origin: "*",
    }
})

io.on("connection", async (socket) => { 
console.log("User connected")


socket.on("disconnect", async (args) => {
    console.log("User disconnected")
 })
})

