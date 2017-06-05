import React from 'react';
import PropTypes from 'prop-types';

function MoveDescription(props) {
  const description = props.move ?
    `Move ${moveLocation(props.squareNum)}` :
    'Game start';

  return (
    <li>
      <a href="#" onClick={() => props.jumpTo(props.move)}>{description}</a>
    </li>
  );
}

function moveLocation(squareNum) {
  return `(${row(squareNum)}, ${col(squareNum)})`;
}

function row(squareNum) {
  return Math.floor(squareNum / 3);
}

function col(squareNum) {
  return squareNum % 3;
}

MoveDescription.propTypes = {
  move: PropTypes.number.isRequired,
  squareNum: PropTypes.number,
  jumpTo: PropTypes.func.isRequired,
};

MoveDescription.defaultProps = {
  squareNum: null,
};

export default MoveDescription;
