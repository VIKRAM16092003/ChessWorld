import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000');

function WaitingRoom() {
  const [roomId, setRoomId] = useState('');
  const [players, setPlayers] = useState([]);
  const [joined, setJoined] = useState(false);

  const createRoom = () => {
    socket.emit('create-room');
  };

  const joinRoom = () => {
    if (roomId) {
      socket.emit('join-room', roomId);
      setJoined(true);
    }
  };

  useEffect(() => {
    socket.on('room-created', (id) => {
      setRoomId(id);
      setJoined(true);
    });

    socket.on('player-joined', (players) => {
      setPlayers(players);
    });

    socket.on('player-left', (players) => {
      setPlayers(players);
    });

    socket.on('room-error', (msg) => {
      alert(msg);
      setJoined(false);
    });

    return () => socket.disconnect();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      {!joined ? (
        <div className="bg-white p-6 rounded shadow-md space-y-4 w-80">
          <button onClick={createRoom} className="w-full bg-blue-600 text-white py-2 rounded">
            Create Room
          </button>
          <input
            className="border p-2 w-full"
            placeholder="Enter Room Code"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
          />
          <button onClick={joinRoom} className="w-full bg-green-600 text-white py-2 rounded">
            Join Room
          </button>
        </div>
      ) : (
        <div className="bg-white p-6 rounded shadow-md text-center w-80">
          <h2 className="text-xl font-semibold mb-2">Room Code: {roomId}</h2>
          <p className="mb-4">Waiting for other player to join...</p>
          <ul>
            {players.map((id, i) => (
              <li key={i} className="text-sm text-gray-600">Player {i + 1}: {id.slice(0, 6)}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default WaitingRoom;
