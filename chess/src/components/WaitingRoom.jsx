import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import bg from '../assets/chessbgimg.jpg';

const socket = io('http://192.168.43.90:5000');

function WaitingRoom() {
  const [roomId, setRoomId] = useState('');
  const [players, setPlayers] = useState([]);
  const [joined, setJoined] = useState(false);
  const navigate = useNavigate();

  const createRoom = () => {
    socket.emit('create-room');
  };

  const joinRoom = () => {
    if (roomId.trim()) {
      socket.emit('join-room', roomId.trim());
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

    socket.on('connect_error', () => {
      alert('Connection failed. Please check the server.');
      setJoined(false);
    });

    return () => {
      socket.off('room-created');
      socket.off('player-joined');
      socket.off('player-left');
      socket.off('room-error');
      socket.off('connect_error');
    };
  }, []);

  useEffect(() => {
    if (players.length === 2) {
      navigate(`/game/${roomId}`);
    }
  }, [players, navigate, roomId]);

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-900 text-white">
      {/* Left Side - Introduction */}
      <div
        className="flex-1 flex flex-col items-center justify-center p-10 bg-cover bg-center relative"
        style={{ backgroundImage: `url(${bg})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent opacity-80"></div>
        <div className="relative z-10 text-center">
          <h1 className="text-5xl font-extrabold mb-4">
            Welcome to the Chess Arena
          </h1>
          <p className="text-lg opacity-80">
            Create or join a room to challenge your friends in a game of chess.
          </p>
        </div>
      </div>

      {/* Right Side - Room Controls */}
      <div className="flex-1 flex items-center justify-center bg-gray-700">
        <div className="w-full max-w-md p-6 bg-gray-700 rounded-xl shadow-lg">
          {!joined ? (
            <>
              <h2 className="text-3xl font-bold mb-6 text-center">
                Join or Create a Room
              </h2>
              <div className="flex flex-col gap-4">
                <button
                  onClick={createRoom}
                  className="py-2 text-lg font-semibold text-white rounded bg-blue-600 rounded-md hover:bg-blue-300 transition-all"
                >
                  Create Room
                </button>
                <div className="flex items-center space-x-3">
                  <input
                    type="text"
                    placeholder="Enter Room Code"
                    value={roomId}
                    onChange={(e) => setRoomId(e.target.value.toUpperCase())}
                    className="flex-grow px-4 py-3 border rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500 "style={{placeholder:"color-white"}}
                  />
                  <button
                    onClick={joinRoom}
                    className="px-6 py-3 text-lg font-semibold bg-black/70 rounded hover:bg-green-600 transition-all "
                  >
                    Join
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              <h2 className="text-4xl font-bold mb-4 text-center">
                Room Code: {roomId}
              </h2>
              <p className="text-center mb-6">Waiting for other players...</p>
              <ul className="space-y-4">
                {players.map((id, i) => (
                  <li
                    key={i}
                    className="py-3 px-4 bg-gray-600 rounded-md text-center font-mono"
                  >
                    Player {i + 1}: {id.slice(0, 6)}
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default WaitingRoom;
