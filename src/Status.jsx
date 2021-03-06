import React from 'react';
import PropTypes from 'prop-types';

function Status(props) {
  const winner = calculateWinner(props.squares);
  const status = winner ?
    `Winner: ${winner}` :
    `Next player: ${props.xIsNext ? 'X' : 'O'}`;

  return (
    <div>{status}</div>
  );
}

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

Status.propTypes = {
  xIsNext: PropTypes.bool.isRequired,
  squares: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Status;
