import React from 'react';
import PropTypes from 'prop-types';
import MoveDescription from './MoveDescription';

function BoldMoveDescription(props) {
  return (
    <b>
      <MoveDescription
        move={props.move}
        squareNum={props.squareNum}
        jumpTo={props.jumpTo}
      />
    </b>
  );
}

BoldMoveDescription.propTypes = {
  move: PropTypes.number.isRequired,
  squareNum: PropTypes.number,
  jumpTo: PropTypes.func.isRequired,
};

BoldMoveDescription.defaultProps = {
  squareNum: null,
};

export default BoldMoveDescription;
