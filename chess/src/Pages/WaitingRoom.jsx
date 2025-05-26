import React, { useEffect, useState } from 'react';
import socket from '../Pages/Socket.jsx';
import bg from '../assets/chessbgimg.jpg';

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

    return () => {
      socket.off('room-created');
      socket.off('player-joined');
      socket.off('player-left');
      socket.off('room-error');
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-cover bg-center flex items-center justify-center px-6 py-12"
        style={{ backgroundImage: `url(${bg})` }}>
      <div className="bg-white/60 shadow-2xl rounded-2xl w-full max-w-md p-8">
        {!joined ? (
          <>
            <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Join or Create a Room</h2>
            <button
              onClick={createRoom}
              className="w-full bg-black hover:bg-indigo-700 text-white py-2 rounded-lg text-lg font-medium mb-4 transition"
            >
              Create Room
            </button>
            <div className="flex items-center gap-2 mb-4">
                <input
                  className="flex-1 border rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 placeholder-black"
                  placeholder="Enter Room Code "
                  value={roomId}
                  onChange={(e) => setRoomId(e.target.value)}
                />
              <button
                onClick={joinRoom}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
              >
                Join
              </button>
            </div>
            <p className="text-sm text-gray-500 text-center">Room codes are 6 characters long.</p>
          </>
        ) : (
          <>
            <h2 className="text-xl font-bold text-center text-gray-700 mb-2">Room Code</h2>
            <div className="text-2xl font-mono text-indigo-600 text-center mb-4">{roomId}</div>
            <p className="text-sm text-center text-gray-600 mb-4">Waiting for other player to join...</p>
            <div className="border-t pt-4">
              <ul className="space-y-2 text-sm text-gray-700">
                {players.map((id, i) => (
                  <li key={i} className="bg-gray-100 rounded px-3 py-1">
                    Player {i + 1}: <span className="font-mono">{id.slice(0, 6)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default WaitingRoom;
