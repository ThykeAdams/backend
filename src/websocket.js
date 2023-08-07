const { Server } = require("socket.io");
const userModel = require("./models/user")
const dmModel = require("./models/dm")
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
            user.online = true;
          user.save().then(() => {
               events.emit("PresenceUpdate", user); 
               sessions.set(user.token, socket);
               setTimeout(() => {
                socket.emit("ready", {user, message: "Online and Ready"})
                  }, 500)
            });
            console.info(`User connected ${user?.username}`);

            socket.on("join", async (params, callback) => {
            const dm = await dmModel.findOne({
                participants: { $all: [params.user._id, params.target] }
              });
                if (!dm) return console.log("not found")
                socket.join(dm._id.toString());
                callback();
            });

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

