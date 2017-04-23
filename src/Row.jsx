import React from 'react';
import PropTypes from 'prop-types';
import Square from './Square';

function Row(props) {
  const squareIndex = props.row * props.NUMBER_OF_COLS;
  const squares = range(squareIndex, squareIndex + props.NUMBER_OF_COLS).map(index =>
    <Square key={index} value={props.squares[index]} onClick={() => props.onClick(index)} />,
  );

  return (
    <div className="board-row">
      {squares}
    </div>
  );
}

Row.propTypes = {
  row: PropTypes.number.isRequired,
  NUMBER_OF_COLS: PropTypes.number.isRequired,
  squares: PropTypes.array,
};

Row.defaultProps = {
  value: ' ',
  squares: [],
};

function range(start, end) {
  return Array.from({ length: (end - start) }, (v, k) => k + start);
}

export default Row;
