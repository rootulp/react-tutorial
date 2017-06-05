import React from 'react';
import ReactDOM from 'react-dom';
import Board from './Board';
import Status from './Status';
import MoveDescription from './MoveDescription';
import BoldMoveDescription from './BoldMoveDescription';
import './index.css';

class Moves extends React.Component {
  constructor() {
    super();
    this.state = { sortAscending: true };
  }

  toggleSort() {
    this.setState({ sortAscending: !this.state.sortAscending });
  }

  ascendingOrDescending() {
    return this.state.sortAscending ? 'Ascending' : 'Descending';
  }

  currentMove(move) {
    return move === this.props.currentStep;
  }

  sortedMoves() {
    return this.state.sortAscending ? this.moves() : this.moves().reverse();
  }

  moves() {
    return this.props.history.map((step, move) => {
      if (this.currentMove(move)) {
        return (
          <BoldMoveDescription
            key={move}
            move={move}
            squareNum={step.squareNum}
            jumpTo={this.props.jumpTo}
          />
        );
      }
      return (
        <MoveDescription
          key={move}
          move={move}
          squareNum={step.squareNum}
          jumpTo={this.props.jumpTo}
        />
      );
    });
  }

  render() {
    return (
      <div>
        <button onClick={() => this.toggleSort()}>Sort {this.ascendingOrDescending()}</button>
        <ol>{this.sortedMoves()}</ol>
      </div>
    );
  }
}

function GameInfo(props) {
  return (
    <div className="game-info">
      <Status squares={props.squares} xIsNext={props.xIsNext} />
      <Moves history={props.history} jumpTo={props.jumpTo} currentStep={props.currentStep} />
    </div>
  );
}

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      xIsNext: true,
      stepNumber: 0,
    };
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
        squares,
        squareNum: i,
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: !((step % 2)),
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={i => this.handleClick(i)}
          />
        </div>
        <GameInfo
          history={history}
          squares={current.squares}
          currentStep={this.state.stepNumber}
          xIsNext={this.state.xIsNext}
          jumpTo={move => this.jumpTo(move)}
        />
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root'),
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
  for (let i = 0; i < lines.length; i += 1) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
