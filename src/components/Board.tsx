import './Board.css';

function Board({ board }: { board: number[][] }) {
  return (
    <div className="board-wrapper">
      <div className="board">
        {board.map((row, key) => {
          return <div key={key} className="row">
            {row.map((cell, key2) => {
              const sum = key + key2;
              let color = (sum % 2 ? 'dark' : 'light');

              let thingOnBoard = '';

              if(cell === 1) thingOnBoard = 'snake';
              else if(cell === 3) thingOnBoard = 'head'
              else if(cell === 4) thingOnBoard = 'eaten-apple';
              else if(cell === 2) thingOnBoard = 'apple';

              return <div key={key2} className={`cell ${color}`}>
                {thingOnBoard ? <div className={thingOnBoard}></div> : <></>}
              </div>
            })}
          </div>
        })}
      </div>
    </div>
  );
}

export default Board;
