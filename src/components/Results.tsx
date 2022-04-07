import './Results.css';

function Results ({bestScore, score}: {bestScore: number; score: number}) {
  return (
    <div className="results">
      <span>
        Best Score: {bestScore}
      </span>
      <span>
        Score: {score}
      </span>
    </div>
  );
}

export default Results;
