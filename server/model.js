const mongoose = require('mongoose');

const chatSchema = mongoose.Schema({
    room: Array,
    currentRoom: String,
    username: Array,
    message: Array,
    date: Date,
    isActive: Boolean
});

const Chat = mongoose.model('Chat', chatSchema);
module.exports = Chat;