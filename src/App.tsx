import { useState, useEffect } from 'react';
import Header from './components/Header'
import Results from './components/Results'
import Board from './components/Board'

function App() {
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  let apple = [5, 8];
  const snake = {
    head: [5, 3],
    body: [[5, 3], [5, 2]],
    direction: [0, 1],
  };
  const [board, setBoard] = useState([
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 1, 0, 0, 0, 0, 2, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]);

  const moveSnake = (interval: NodeJS.Timer) => {
    const [ha, hb] = snake.head;
    const [da, db] = snake.direction;

    snake.head = [ha + da, hb + db];
    const clearAfterSnake = snake.body.pop();
    snake.body.unshift(snake.head);

    if (snake.head[0] < 0 || 12 <= snake.head[0] || snake.head[1] < 0 || 12 <= snake.head[1]) {
      clearInterval(interval);
      return;
    }

    const tmp = [...board];
    tmp[snake.head[0]][snake.head[1]] = 1;
    if (clearAfterSnake) {
      tmp[clearAfterSnake[0]][clearAfterSnake[1]] = 0;
    }
    setBoard(tmp);
  };

  const moveApple = () => {
    const tmp = [...board];
    tmp[apple[0]][apple[1]] = 1;
    const arr = [];

    for (let i = 0; i < 12; i++) {
      for (let j = 0; j < 12; j++) {
        if (board[i][j] === 0) {
          arr.push([i, j]);
        }
      }
    }

    const newApple = arr[Math.round(Math.random() * arr.length)];
    tmp[newApple[0]][newApple[1]] = 2;
    apple = newApple;
    setBoard(tmp);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      moveSnake(interval);
      if (snake.head[0] === apple[0] && snake.head[1] === apple[1]) {
        moveApple();
        snake.body.push(snake.body[snake.body.length - 1])
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <Header />
      <Results bestScore={bestScore} score={score} />
      <Board board={board} />
    </div>
  );
}

export default App;
