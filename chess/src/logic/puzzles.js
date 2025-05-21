const puzzles = [
  {
    id: 1,
    rating: 1200,
    fen: 'r1bqkbnr/pppp1ppp/2n5/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 2 3',
    solution: ['e1g1', 'g8f6', 'd2d4', 'e5d4']
  },
  {
    id: 2,
    rating: 1350,
    fen: 'rnbqkb1r/ppp2ppp/3p1n2/4p3/4P3/2NP1N2/PPP2PPP/R1BQKB1R w KQkq - 2 5',
    solution: ['d1e2', 'f8e7', 'c1g5']
  },
  {
    id: 3,
    rating: 1500,
    fen: '2r2rk1/1p1q1ppp/p1n1pn2/2bp4/4P3/2N2N1P/PPP2PP1/R1BQR1K1 w - - 0 1',
    solution: ['e4d5', 'f6d5', 'c3d5']
  }
];

let index = 0;

export const getNextPuzzle = () => {
  const puzzle = puzzles[index];
  index = (index + 1) % puzzles.length;
  return puzzle;
};