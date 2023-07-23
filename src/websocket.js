const { Server } = require("socket.io");
const userModel = require("./models/user")
const fs = require("node:fs")
global.sessions = new Map();

const io = new Server(server, {
    cors: {
        origin: "*",
    }
})

const events = io.of("/events")
global.events = events;
events.on("connection", async (socket) => { 
    if (socket.handshake.query["token"]) {
     let user = await userModel.findOne({ token: socket.handshake.query["token"]})
     if (user) {
        if (sessions.get(user.token)) return socket.disconnect();
            user.online = true;
          user.save().then(() => {
               events.emit("PresenceUpdate", user); 
               sessions.set(user.token, socket);
               setTimeout(() => {
                events.emit("ready", user)
                  }, 500)
            });
            console.info(`User connected ${user?.username}`);

        socket.on("disconnect", async (args) => {
            console.log(`User disconnected ${user?.username}`)
            sessions.delete(user?.token);
         })
        } else {
          socket.disconnect();
          return;
        }
    } else {
        socket.disconnect();
        return;
    }
})

