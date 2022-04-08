import './Results.css';

function Results({ score }: { score: number }) {
  return (
    <div className="results">
      <span>
        {score}
      </span>
    </div>
  );
}

export default Results;
