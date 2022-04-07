import './Board.css';

function Board({board}: {board: number[][]}) {
  return (
    <div className="board-wrapper">
      <div className="board">
        {board.map((row, key) => {
          return <div key={key} className="row">
            {row.map((cell, key2) => {
              let color = '';
              if(cell == 1) color = 'green'
              if(cell == 2) color = 'red'
              return <div key={key2} className={`cell ${color}`}></div>
            })}
          </div>
        })}
      </div>
    </div>
  );
}

export default Board;
