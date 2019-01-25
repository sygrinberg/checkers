import React from 'react';
import Board from './Board';
import Controller from './Controller';

export default function Main() {
  return (
    <div className="main-container">
      <div className="checkers-container">
        <Board />
        <Controller />
      </div>
    </div>);
}
