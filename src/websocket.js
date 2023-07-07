const { Server } = require("socket.io");
const fs = require("node:fs")
global.sessions = new Map();

const socket = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
})

socket.on("connection", async (socket) => { 
    console.log("User connected")
})

socket.on("disconnect", async (socket) => {
    console.log("User disconnected")
})