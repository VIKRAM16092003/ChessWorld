const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const { nanoid } = require('nanoid');

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

const rooms = {}; // roomId: { players: [socket.id, ...] }

io.on('connection', (socket) => {
  console.log(`Socket connected: ${socket.id}`);

  socket.on('create-room', () => {
    const roomId = nanoid(6); // e.g. "AB12CD"
    rooms[roomId] = { players: [socket.id] };
    socket.join(roomId);
    socket.emit('room-created', roomId);
    console.log(`Room created: ${roomId}`);
  });

  socket.on('join-room', (roomId) => {
    const room = rooms[roomId];
    if (room && room.players.length < 2) {
      room.players.push(socket.id);
      socket.join(roomId);
      io.to(roomId).emit('player-joined', room.players);
    } else {
      socket.emit('room-error', 'Room not found or full');
    }
  });

  socket.on('disconnect', () => {
    for (const [roomId, room] of Object.entries(rooms)) {
      room.players = room.players.filter(id => id !== socket.id);
      if (room.players.length === 0) {
        delete rooms[roomId];
      } else {
        io.to(roomId).emit('player-left', room.players);
      }
    }
    console.log(`Socket disconnected: ${socket.id}`);
  });
});

server.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
