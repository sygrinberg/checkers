import React from 'react';
import PropTypes from 'prop-types';

function Soldier(props) {
  const { full: isFull, optional: isOptional } = props.tile;
  const className = `soldier ${isOptional ? 'optional' : ''} ${isFull ? 'draggable' : ''}`;
  return isFull || isOptional ?
    (<div
      className={className}
      draggable={isFull && !isOptional}
      onDragStart={props.onDragStart}
      onDragEnd={props.onDragEnd}
    />) : '';
}

Soldier.propTypes = {
  tile: PropTypes.object.isRequired,
  onDragStart: PropTypes.func.isRequired,
  onDragEnd: PropTypes.func.isRequired,
}

export default Soldier;
