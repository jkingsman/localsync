const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const {
    Server
} = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/movie', (req, res) => {
    res.sendFile(__dirname + '/movie.mp4');
});

app.get('/testmovie', (req, res) => {
    res.sendFile(__dirname + '/testmovie.mp4');
});

io.on('connection', (socket) => {
    socket.on('action', msg => {
        socket.broadcast.emit('action', msg);
    });

    socket.on('heartbeat', msg => {
        socket.broadcast.emit('heartbeat', msg);
    });
});

server.listen(3000, () => {
    console.log('listening on *:3000');
});
