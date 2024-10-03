const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static('public')); // Serve static files from public directory

io.on('connection', (socket) => {
    console.log('A user connected');

    // Handle incoming messages
    socket.on('chatMessage', (msg) => {
        io.emit('chatMessage', msg); // Broadcast message to all clients
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
