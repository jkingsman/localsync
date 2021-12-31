const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
var serveIndex = require('serve-index')
const {
    Server
} = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.use(express.static('.'))
app.use('/movies', express.static('/movies'), serveIndex('movies', {'icons': true}))

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
