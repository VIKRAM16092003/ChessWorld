const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors({
  origin: process.env.CLIENT_URL || '*',  // Replace '*' with your client URL in production
  methods: ['GET', 'POST']
}));

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || '*',
    methods: ['GET', 'POST']
  }
});

let rooms = {};

io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on('create-room', () => {
    try {
      const roomId = Math.random().toString(36).substring(2, 8);
      rooms[roomId] = [socket.id];
      socket.join(roomId);
      socket.emit('room-created', roomId);
      io.to(roomId).emit('player-joined', rooms[roomId]);
    } catch (error) {
      console.error(`Error creating room: ${error.message}`);
      socket.emit('error', 'An error occurred while creating the room.');
    }
  });

  socket.on('join-room', (roomId) => {
    if (!rooms[roomId]) {
      socket.emit('room-error', 'Room does not exist.');
      return;
    }
    if (rooms[roomId].length >= 2) {
      socket.emit('room-error', 'Room is full.');
      return;
    }
    rooms[roomId].push(socket.id);
    socket.join(roomId);
    io.to(roomId).emit('player-joined', rooms[roomId]);
  });

  socket.on('move', ({ roomId, move }) => {
    socket.to(roomId).emit('opponent-move', move);
  });

  socket.on('disconnect', () => {
    for (const roomId in rooms) {
      const index = rooms[roomId].indexOf(socket.id);
      if (index !== -1) {
        rooms[roomId].splice(index, 1);
        io.to(roomId).emit('player-left', rooms[roomId]);
        if (rooms[roomId].length === 0) {
          delete rooms[roomId];
        }
        break;
      }
    }
    console.log(`User disconnected: ${socket.id}`);
  });
});

server.listen(5000, () => {
  console.log('Server is running on port 5000');
});
