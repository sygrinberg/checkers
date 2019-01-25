import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { dragStart, dragEnd, dragDrop } from './actions/actions';
import Soldier from './Soldier';

function isSameColor(rowIndex1, columnIndex1, rowIndex2, columnIndex2) {
  const isType1 = (rowIndex1 % 2) === (rowIndex2 % 2) && (columnIndex1 % 2) === (columnIndex2 % 2);
  const isType2 = (rowIndex1 % 2) !== (rowIndex2 % 2) && (columnIndex1 % 2) !== (columnIndex2 % 2);
  return isType1 || isType2;
}

class Tile extends Component {
  constructor(props) {
    super(props);

    this.state = { isDropOver: false };
  }
  onDragStart(event) {
    event.dataTransfer.setData('text',''); // To support Firefox
    const { rowIndex, columnIndex } = this.props;
    this.props.onDragStart({ rowIndex, columnIndex });
  }
  onDrop(event) {
    this.setState({ ...this.state, isDropOver: false });
    if (this.checkIfDroppable()) {
      const { rowIndex, columnIndex } = this.props;
      this.props.onDragDrop({ rowIndex, columnIndex });
    } else {
      this.props.onDragDrop({ rowIndex: '', columnIndex: '' });
    }
  }

  checkIfDroppable() {
    const { rowIndex, columnIndex, tile, dragState } = this.props;
    return dragState.isOn && !tile.full &&
          isSameColor(dragState.rowIndex, dragState.columnIndex, rowIndex, columnIndex);
  }

  dragEnter(event) {
    event.preventDefault();
    this.setState({ ...this.state, isDropOver: true });
  }

  dragLeave(event) {
    event.preventDefault();
    this.setState({ ...this.state, isDropOver: false });
  }

  render() {
    const { rowIndex, columnIndex, tile } = this.props;
    const droppableClass = this.checkIfDroppable() ? 'droppable' : '';
    const dropOverClass = droppableClass && this.state.isDropOver ? 'drop-over' : '';
    const child = tile.full || tile.optional ? (
      <Soldier
        rowIndex={rowIndex}
        columnIndex={columnIndex}
        tile={tile}
        onDragStart={e => this.onDragStart(e)}
        onDragEnd={this.props.onDragEnd}
      />
    ) : '';
    return (
      <div
        className={`tile ${droppableClass} ${dropOverClass}`}
        onDragOver={e => e.preventDefault()}
        onDragEnter={e => this.dragEnter(e)}
        onDragLeave={e => this.dragLeave(e)}
        onDrop={e => this.onDrop(e)}
      >
        {child}
      </div>);
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    tile: state.boardState[ownProps.rowIndex][ownProps.columnIndex],
    dragState: state.dragState,
  }
}

const mapDispatchToProps = dispatch => ({
  onDragStart: (data) => {
    dispatch(dragStart(data));
  },
  onDragEnd: () => {
    dispatch(dragEnd());
  },
  onDragDrop: (data) => {
    dispatch(dragDrop(data));
  },
});

Tile = connect(mapStateToProps, mapDispatchToProps)(Tile);

Tile.propTypes = {
  rowIndex: PropTypes.number.isRequired,
  columnIndex: PropTypes.number.isRequired,
  tile: PropTypes.object.isRequired,
  dragState: PropTypes.object.isRequired,
  onDragStart: PropTypes.func.isRequired,
  onDragEnd: PropTypes.func.isRequired,
  onDragDrop: PropTypes.func.isRequired,
}

Tile.defaultProps = {
  tile: {},
  dragState: {},
  onDragStart: () => {},
  onDragEnd: () => {},
  onDragDrop: () => {},
};

export default Tile;
