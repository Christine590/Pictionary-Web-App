const express = require('express');
const http = require('http');
const socket = require('socket.io');
const port = process.env.PORT || 8080; // API port
const socketPort = 3001; // socket port

const app = express();
const server = http.Server(app);
const io = socket(server, {
  cors: {
    origin: "http://localhost:4200",
        methods: ["GET", "POST"],
        transports: ['websocket', 'polling'],
        credentials: true
  },
  // for mismatch between versions of socket.io-client and socket.io
  // false by default
  allowEIO3: true
});

// connect by API
app.get('/', function (req, res) {
  console.log('API is alive');
})

app.listen(port, () => {
  console.log(`App started on port: ${port}`);
  });

// connect by socket
io.on('connection', function(socket){
  console.log('a user connected');
});

server.listen(socketPort, () => {
  console.warn(`Listen sockets on: ${socketPort}`);
});