import React from 'react';
import PropTypes from 'prop-types';
import Row from './Row';

function Board(props) {
  const NUMBER_OF_ROWS = 3;
  const NUMBER_OF_COLS = 3;
  const rows = range(0, NUMBER_OF_ROWS).map(index =>
    <Row
      key={index}
      row={index}
      squares={props.squares}
      onClick={props.onClick}
      NUMBER_OF_COLS={NUMBER_OF_COLS}
    />,
  );
  return (
    <div>
      {rows}
    </div>
  );
}

function range(start, end) {
  return Array.from({ length: (end - start) }, (v, k) => k + start);
}

export default Board;
