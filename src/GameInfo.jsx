import React from 'react';
import PropTypes from 'prop-types';
import Status from './Status';
import Moves from './Moves';

function GameInfo(props) {
  return (
    <div className="game-info">
      <Status squares={props.squares} xIsNext={props.xIsNext} />
      <Moves history={props.history} jumpTo={props.jumpTo} currentStep={props.currentStep} />
    </div>
  );
}

GameInfo.propTypes = {
  squares: PropTypes.arrayOf(PropTypes.string).isRequired,
  history: PropTypes.arrayOf(PropTypes.object).isRequired,
  xIsNext: PropTypes.bool.isRequired,
  jumpTo: PropTypes.func.isRequired,
  currentStep: PropTypes.number.isRequired,
};

export default GameInfo;
