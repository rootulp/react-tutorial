import React from 'react';
import PropTypes from 'prop-types';
import MoveDescription from './MoveDescription';
import BoldMoveDescription from './BoldMoveDescription';

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

Moves.propTypes = {
  currentStep: PropTypes.number.isRequired,
  history: PropTypes.arrayOf(PropTypes.object).isRequired,
  jumpTo: PropTypes.func.isRequired,
};

export default Moves;
