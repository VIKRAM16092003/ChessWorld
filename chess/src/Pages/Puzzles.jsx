import PuzzleBoard from '../components/PuzzleBoard';

const Puzzles = () => {
  return (
    <center>
    <div className="bg-indigo-100 pb-5" style={{ padding: '6rem' }}>
      <h2 className='text-center'>Puzzle Mode</h2>
      
      <PuzzleBoard />
    </div>
    </center>
  );
};

export default Puzzles;