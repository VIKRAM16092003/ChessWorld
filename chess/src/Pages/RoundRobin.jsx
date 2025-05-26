// TournamentApp.js
import React, { useState } from 'react';

const playersList = ['Alice', 'Bob', 'Charlie', 'Dave'];

const generateRoundRobin = (players) => {
  const rounds = [];
  const totalRounds = players.length - 1;
  const totalMatchesPerRound = players.length / 2;
  const tempPlayers = [...players];

  if (tempPlayers.length % 2 !== 0) tempPlayers.push('BYE');

  for (let round = 0; round < totalRounds; round++) {
    const matches = [];
    for (let i = 0; i < totalMatchesPerRound; i++) {
      const white = tempPlayers[i];
      const black = tempPlayers[tempPlayers.length - 1 - i];
      if (white !== 'BYE' && black !== 'BYE') {
        matches.push({ white, black });
      }
    }
    rounds.push(matches);
    const last = tempPlayers.pop();
    tempPlayers.splice(1, 0, last);
  }
  return rounds;
};

const TournamentApp = () => {
  const [rounds] = useState(generateRoundRobin(playersList));
  const [currentRoundIndex, setCurrentRoundIndex] = useState(0);
  const [currentMatchIndex, setCurrentMatchIndex] = useState(0);
  const [scores, setScores] = useState(() => {
    const initial = {};
    playersList.forEach(p => initial[p] = { wins: 0, losses: 0, draws: 0 });
    return initial;
  });

  const handleGameEnd = (result, white, black) => {
    setScores(prev => {
      const updated = { ...prev };
      if (result === 'white') {
        updated[white].wins++;
        updated[black].losses++;
      } else if (result === 'black') {
        updated[black].wins++;
        updated[white].losses++;
      } else {
        updated[white].draws++;
        updated[black].draws++;
      }
      return updated;
    });

    const nextMatch = currentMatchIndex + 1;
    if (nextMatch < rounds[currentRoundIndex].length) {
      setCurrentMatchIndex(nextMatch);
    } else {
      const nextRound = currentRoundIndex + 1;
      if (nextRound < rounds.length) {
        setCurrentRoundIndex(nextRound);
        setCurrentMatchIndex(0);
      }
    }
  };

  if (currentRoundIndex >= rounds.length) {
    return (
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2">Tournament Over</h2>
        <h3 className="text-lg font-semibold">Final Standings</h3>
        <table className="mt-4 table-auto border">
          <thead>
            <tr>
              <th>Player</th><th>Wins</th><th>Losses</th><th>Draws</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(scores).map(([name, stat]) => (
              <tr key={name}>
                <td>{name}</td>
                <td>{stat.wins}</td>
                <td>{stat.losses}</td>
                <td>{stat.draws}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  const match = rounds[currentRoundIndex][currentMatchIndex];

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Round {currentRoundIndex + 1}, Match {currentMatchIndex + 1}</h2>
      <StartGame
        whitePlayer={match.white}
        blackPlayer={match.black}
        isTournament={true}
        onGameEnd={handleGameEnd}
      />
    </div>
  );
};

export default TournamentApp;
