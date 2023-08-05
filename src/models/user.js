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
    customStatus: {
        type: String,
        required: false
    },
    online: { 
        type: Boolean,
        default: false
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
    badges: {
        type: [String],
        default: []
    },
}, 
{
    _id: false,
    timestamps: true,
})

module.exports = mongoose.model("users", app);