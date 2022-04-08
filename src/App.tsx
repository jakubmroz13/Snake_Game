import { useState, useEffect } from 'react';
import Header from './components/Header';
import Results from './components/Results';
import Board from './components/Board';
import Message from './components/Message';

const BOARD_SIZE = 13;

function App() {
  const [message, setMessage] = useState('Press Spacebar to play');

  const [score, setScore] = useState(0);
  const [board, setBoard] = useState(createBoard(BOARD_SIZE));
  let apple = createApple(BOARD_SIZE);
  let snake = createSnake(BOARD_SIZE);
  let direction = {
    row: 0,
    col: 1,
  };
  let playing = false;
  let gameEnded = false;

  useEffect(() => {
    handleKeyDown();
  }, []);

  const moveSnake = (intervalID: NodeJS.Timer) => {
    const head = snake[0];
    const tail = snake[snake.length - 1];
    const newHead = {
      row: head.row + direction.row,
      col: head.col + direction.col,
    };

    if (boundCollision(newHead, BOARD_SIZE) || snakeBodyCollision(newHead, snake)) {
      playing = false;
      gameEnded = true;
      clearInterval(intervalID);
      setMessage('Press Spacebar to play again');
      return;
    }

    if (snake[0].row === apple.row && snake[0].col === apple.col) {
      const newApple = ranomizeApple(board);
      board[apple.row][apple.col] = 4;
      apple = newApple;
      snake.push(snake[snake.length - 1]);
      setScore((prev) => prev + 1);
    }

    snake.unshift(newHead);
    snake.pop();

    board[apple.row][apple.col] = 2;

    board[snake[0].row][snake[0].col] = 3;
    for (let i = 1; i < snake.length; i++) {
      const { row, col } = snake[i];
      if (board[row][col] !== 4) {
        board[row][col] = 1;
      }
    }
    board[tail.row][tail.col] = 0;
    setBoard([...board]);
  };

  const playGame = () => {
    const intervalID = setInterval(() => {
      moveSnake(intervalID);
    }, 128);
  }

  const handleKeyDown = () => {
    document.addEventListener('keydown', (e) => {
      if (e.code === 'ArrowUp' && direction.row !== 1) {
        direction = { row: -1, col: 0 };
      } else if (e.code === 'ArrowRight' && direction.col !== -1) {
        direction = { row: 0, col: 1 };
      } else if (e.code === 'ArrowDown' && direction.row !== -1) {
        direction = { row: 1, col: 0 };
      } else if (e.code === 'ArrowLeft' && direction.col !== 1) {
        direction = { row: 0, col: -1 };
      } else if (e.code === 'Space' && playing === false) {
        if (gameEnded) {
          window.location.reload();
        }
        playing = true;
        playGame();
        setMessage('');
      }
    });
  };

  return (
    <div>
      <Header />
      {message ? <Message text={message} /> : <></>}
      <Results score={score} />
      <Board board={board} />
    </div>
  );
}

const createSnake = (n: number) => {
  return [
    {
      row: Math.round(n / 2),
      col: Math.round(n / 3),
    },
    {
      row: Math.round(n / 2),
      col: Math.round(n / 3 - 1),
    },
    {
      row: Math.round(n / 2),
      col: Math.round(n / 3 - 2),
    },
  ]
};

const createBoard = (n: number) => {
  const arr: number[][] = [];
  for (let i = 0; i < n; i++) {
    const row = [];
    for (let j = 0; j < n; j++) {
      row.push(0);
    }
    arr.push(row);
  }

  const snake = createSnake(n);
  const apple = createApple(n);

  arr[snake[0].row][snake[0].col] = 3;
  arr[snake[1].row][snake[1].col] = 1;
  arr[snake[2].row][snake[2].col] = 1;

  arr[apple.row][apple.col] = 2;

  return arr;
};

const createApple = (n: number) => {
  return {
    row: Math.round(n / 2),
    col: Math.round(n * 2 / 3),
  };
}

const ranomizeApple = (board: number[][]) => {
  const n = board.length;
  const arr = [];

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; ++j) {
      if (board[i][j] === 0) {
        arr.push({
          row: i,
          col: j,
        });
      }
    }
  }

  return arr[Math.round(Math.random() * arr.length)];
}

const boundCollision = (head: { row: number; col: number; }, n: number) => {
  if (head.row < 0 || head.col < 0 || head.row >= BOARD_SIZE || head.col >= BOARD_SIZE) {
    return true;
  }
  return false;
};

const snakeBodyCollision = (
  head: { row: number; col: number; },
  snake: {
    row: number;
    col: number;
  }[]
) => {
  const n = snake.length;
  for (let i = 1; i < n; i++) {
    if (head.row === snake[i].row && head.col === snake[i].col) {
      return true;
    }
  }
  return false;
};

export default App;
