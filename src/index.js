import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
  return (
    <button className="square" onClick={() => props.onClick()}>
      {props.value}
    </button>
  );
}

function Row(props) {
  const squareIndex = props.row * props.NUMBER_OF_COLS;
  const squares = range(squareIndex, squareIndex + props.NUMBER_OF_COLS).map((index) =>
    <Square key={index} value={props.squares[index]} onClick={() => props.onClick(index)} />
  );

  return (
    <div className="board-row">
      {squares}
    </div>
  )
}

function Board(props) {
  const NUMBER_OF_ROWS = 3;
  const NUMBER_OF_COLS = 3;
  const rows = range(0, NUMBER_OF_ROWS).map((index) =>
    <Row key={index}
         row={index}
         squares={props.squares}
         onClick={props.onClick}
         NUMBER_OF_COLS={NUMBER_OF_COLS}
    />
  );
  return (
    <div>
      {rows}
    </div>
  );
}

function Status(props) {
  const winner = calculateWinner(props.squares);
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (props.xIsNext ? 'X' : 'O');
  }
  return (
    <div>{status}</div>
  )
}

function Moves(props) {
  const moves = props.history.map((step, move) => {
    const description = move ?
      'Move ' + moveLocation(step.squareNum) :
      'Game start';
    if (move === props.currentStep) {
      return (
        <li key={move}>
          <b><a href="#" onClick={() => props.jumpTo(move)}>{description}</a></b>
        </li>
      );
    } else {
      return (
        <li key={move}>
          <a href="#" onClick={() => props.jumpTo(move)}>{description}</a>
        </li>
      );
    }
  });
  return (
    <ol>{moves}</ol>
  )
}

function GameInfo(props) {
  return (
    <div className="game-info">
      <Status squares={props.squares} xIsNext={props.xIsNext} />
      <Moves history={props.history} jumpTo={props.jumpTo} />
    </div>
  );
}

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      history: [{
        squares: Array(9).fill(null)
      }],
      xIsNext: true,
      stepNumber: 0,
    };
  }
  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <GameInfo
          history={history}
          squares={current.squares}
          currentStep={this.state.currentStep}
          xIsNext={this.state.xIsNext}
          jumpTo={(move) => this.jumpTo(move)}
        />
      </div>
    );
  }
  handleClick(i) {
    const stepNumber = this.state.stepNumber;
    const history = this.state.history.slice(0, stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares,
        squareNum: i,
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }
  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) ? false : true,
    });
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function range(start, end) {
  return Array.from({length: (end - start)}, (v, k) => k + start);
}

function moveLocation(squareNum) {
  return "(" + row(squareNum) + ", " + col(squareNum) + ")";
}

function row(squareNum) {
  return Math.floor(squareNum / 3);
};

function col(squareNum){
  return squareNum % 3
};
