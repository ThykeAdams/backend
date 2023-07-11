const mongoose = require("mongoose");

let app = mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true 
    },
    avatar: {
        type: String,
    },
    discriminator: {
        type: String,
        required: true
    },
    bot: {
        type: Boolean,
        default: false
    },
    email: {
        type: String,
        required: false
    },
    password: {
        type: String,
        required: false
    },
    dob: {
        type: String,
        required: true
    },
    token: {
        type: String,
        required: true
    },
    
    status: {
        type: String,
        enum: ["online", "offline", "idle", "dnd", "coding", "streaming", "sleeping"],
        default: "offline"
    },
    online: { 
        type: Boolean,
        default: "offline" //just so we always know if they are really online cause with dnd we don't know that might be offline or smth
    },
    friends: {
        type: [String],
        ref: "users",
        default: []
    },
    blocked: {
        type: [String],
        ref: "users",
        default: []
    },
    
}, 
{
    _id: false 
})

module.exports = mongoose.model("users", app);