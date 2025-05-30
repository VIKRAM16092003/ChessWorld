import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Chess } from 'chess.js';
import { Chessboard } from 'react-chessboard';
import { io } from 'socket.io-client';

const socket = io('http://192.168.43.90:5000');

function ChessGame() {
  const { roomId } = useParams();
  const gameRef = useRef(new Chess());
  const [game, setGame] = useState(gameRef.current);
  const [isPlayerTurn, setIsPlayerTurn] = useState(true); // Change logic for player turns as needed

  const makeMove = (move) => {
    const result = gameRef.current.move(move);
    if (result) {
      setGame(new Chess(gameRef.current.fen())); // create a new instance for React state update
      socket.emit('move', { roomId, move });
      setIsPlayerTurn(false);
    }
    return result;
  };

  useEffect(() => {
    socket.on('opponent-move', (move) => {
      gameRef.current.move(move);
      setGame(new Chess(gameRef.current.fen()));
      setIsPlayerTurn(true);
    });

    socket.on('connect_error', () => {
      alert('Connection lost to server.');
    });

    return () => {
      socket.off('opponent-move');
      socket.off('connect_error');
    };
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Room ID: {roomId}</h2>
      <Chessboard
        position={game.fen()}
        onPieceDrop={(sourceSquare, targetSquare) => {
          if (!isPlayerTurn) return false;
          const move = makeMove({
            from: sourceSquare,
            to: targetSquare,
            promotion: 'q', // always promote to queen for simplicity
          });
          return move !== null;
        }}
        boardWidth={400}
      />
    </div>
  );
}

export default ChessGame;
