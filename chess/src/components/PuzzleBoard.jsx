// src/components/PuzzleBoard.jsx

import React, { useEffect, useState, useRef } from 'react';
import { Chess } from 'chess.js';
import { Chessboard } from 'react-chessboard';
import { getNextPuzzle } from '../logic/puzzles';
import styles from '../styles/PuzzleBoard.module.css';

const PUZZLE_TIME = 60;

const PuzzleBoard = () => {
  const [game, setGame] = useState(new Chess());
  const [fen, setFen] = useState('');
  const [solution, setSolution] = useState([]);
  const [step, setStep] = useState(0);
  const [points, setPoints] = useState(0);
  const [showSolution, setShowSolution] = useState(false);
  const [rating, setRating] = useState(null);
  const [completed, setCompleted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(PUZZLE_TIME);
  const [squareStyles, setSquareStyles] = useState({});
  const timerRef = useRef();

  const highlightMove = (from, to) => {
    setSquareStyles({
      [from]: {
        background: 'radial-gradient(circle, #e0f15a 50%, transparent 80%)',
        borderRadius: '50%',
      },
      [to]: {
        background: 'radial-gradient(circle, #63e663 50%, transparent 80%)',
        borderRadius: '50%',
      },
    });

    // Clear highlights after a second
    setTimeout(() => setSquareStyles({}), 1000);
  };

  const loadPuzzle = () => {
    const puzzle = getNextPuzzle();
    const g = new Chess();
    g.load(puzzle.fen);
    setGame(g);
    setFen(puzzle.fen);
    setSolution(puzzle.solution);
    setStep(0);
    setPoints(0);
    setRating(puzzle.rating);
    setShowSolution(false);
    setCompleted(false);
    setTimeLeft(PUZZLE_TIME);
    setSquareStyles({});
  };

  useEffect(() => {
    loadPuzzle();
  }, []);

  useEffect(() => {
    if (completed || timeLeft <= 0) return;

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          setCompleted(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [completed]);

  const onDrop = (sourceSquare, targetSquare) => {
    if (completed || timeLeft <= 0) return false;

    const move = game.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: 'q',
    });

    if (!move) return false;

    const expected = solution[step];
    const actual = sourceSquare + targetSquare;

    if (actual === expected) {
      setPoints((p) => p + 1);
      const nextStep = step + 1;
      setStep(nextStep);
      highlightMove(sourceSquare, targetSquare);

      if (nextStep === solution.length) {
        setCompleted(true);
        clearInterval(timerRef.current);
      }

      setFen(game.fen());
      return true;
    } else {
      game.undo();
      setFen(game.fen());
      return false;
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.board}>
        <Chessboard
          position={fen}
          onPieceDrop={onDrop}
          boardWidth={400}
          animationDuration={300}
          customSquareStyles={squareStyles}
          customDarkSquareStyle={{
  backgroundColor: "#b58863", // Brown
}}
customLightSquareStyle={{
  backgroundColor: "#f0d9b5", // Beige
}}

        />
      </div>
      <div className={styles.sidebar}>
        <p><strong>Points:</strong> {points}</p>
        <p><strong>Rating:</strong> {rating}</p>
        <p className={styles.timer}><strong>Time Left:</strong> {timeLeft}s</p>
        {completed && <p className={styles.completed}>✅ Puzzle Complete!</p>}
        {timeLeft <= 0 && !completed && <p className={styles.failed}>⏱ Time’s Up!</p>}

        <button onClick={() => setShowSolution(!showSolution)}>
          {showSolution ? 'Hide Solution' : 'Show Solution'}
        </button>
        <button onClick={loadPuzzle}>Next Puzzle</button>
        <button onClick={loadPuzzle}>Restart Puzzle</button>

        {showSolution && (
          <ul className={styles.solutionList}>
            {solution.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default PuzzleBoard;