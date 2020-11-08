// const path = require('path');
// const http = require('http');
// const server = http.createServer(app);
const express = require('express');
const socketio = require('socket.io');
const bodyParser = require('body-parser');
const { addUser, removeUser, getCurrentUser, getRoomUsers } = require('./users.js');

const app = express();
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => console.log(`Server has started on PORT ${PORT}`));
const io = require('socket.io')(server);
//server.listen(PORT, () => console.log(`Server has started on PORT ${PORT}`));
// , { origins: 'http://localhost:5000' }
const mongoose = require('mongoose');

// const router = require('./router');
// app.use(router);

// configure express app to serve static files
app.use(express.static(__dirname + '/public'));

// configure express app to parse json content and form data
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
app.use(require('cors')({ credentials: true, origin: 'http://localhost:5000' }));


//import Chat model
const Chat = require('./model.js');
const mongoUrl = 'mongodb://localhost:27017/chatTest';
mongoose.connect(mongoUrl);

// app.get("/api", (req, res) => {
//     // This should be ordered by the last message sent time.
//     Chat.find().sort({ isActive: 1, lastRoom: 1 })
//         .then(chatList => res.status(200).json({ chat: chatList }))
//         .catch(err => res.status(500).json(err))
// })

// Run when client connects
io.on('connection', (socket) => {
    socket.on('join', async ({ name, room }) => {
        try {
            const { error, user } = addUser(socket.id, name, room);
            socket.join(user.room);

            // Welcome current user
            socket.emit('message', 'Welcome');

            // Broadcast when a user connects
            socket.broadcast
                .to(user.room)
                .emit('message', `${user.name} has joined the chat`);
        } catch (e) {
            console.error(e);
        }
    });

    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id);
        if (user === null) {
            console.log("user: " + socket.id + " is not found");
            callback();
            return;
        }

        io.to(user.room).emit('message', { user: user.name, text: message });

        callback();
    });

    socket.on('disconnect', () => {
        const user = removeUser(socket.id);

        if (user) {
            io.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has left.` });
            io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });
        }
    })
});
