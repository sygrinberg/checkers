import React from 'react';
import times from 'lodash.times';
import Tile from './Tile';

function createRow(rowIndex) {
  const squares = times(8, (columnIndex) => {
    return (
      <Tile
        rowIndex={rowIndex}
        columnIndex={columnIndex}
        key={columnIndex}
      />);
  });
  return (
    <div className={`board-row ${rowIndex % 2 ? 'odd' : 'even'}`} key={rowIndex}>
      {squares}
    </div>
  );
}

function createBoard() {
  return (
    <div className="board-container">
      <div className="board">
        {times(8, i => createRow(i)) }
      </div>
    </div>
  );
}

export default function Board() {
  return createBoard();
}