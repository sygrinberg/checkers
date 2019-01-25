import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { changeRow, changeColumn, focusInputs, blurInputs, addSoldier, removeSoldier } from './actions/actions';

function checkNumber(num) {
  return !num || num > 8;
}

function checkNumbers(rowNumber, columnNumber) {
  return checkNumber(rowNumber) || checkNumber(columnNumber);
}

function fixNumber(value) {
  if (value === '') {
    return value;
  }
  const number = Number(value);
  if (number < 1) {
    return 1;
  } else if (number > 8) {
    return 8;
  }
  return number;
}

class Controller extends Component {
  constructor(props) {
    super(props);    
    this.rowInput = React.createRef();
    this.columnInput = React.createRef();
    this.addButton = React.createRef();
    this.removeButton = React.createRef();
    this.rowInputChange = this.rowInputChange.bind(this);
    this.columnInputChange = this.columnInputChange.bind(this);
    this.addSoldier = this.addSoldier.bind(this);
    this.removeSoldier = this.removeSoldier.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
  }    
  rowInputChange(event) {
    const number = fixNumber(event.target.value);
    if (number) {
      this.props.onRowChange(number);
      this.columnInput.current.focus();
    }
    event.target.value = number;
  }

  columnInputChange(event) {
    const number = fixNumber(event.target.value);
    if (number) {
      this.props.onColumnChange(number);
    }
    event.target.value = number;
  }

  addSoldier() {
    this.rowInput.current.value = '';
    this.columnInput.current.value = '';
    this.props.addSoldier();
  }
  removeSoldier() {
    this.rowInput.current.value = '';
    this.columnInput.current.value = '';
    this.props.removeSoldier();
  }

  componentDidUpdate(){
    if (!this.props.rowNumber && !this.props.columnNumber) {
      this.rowInput.current.focus();
    }
  }

  handleBlur(event) {
    if (event.relatedTarget !== this.rowInput.current && 
        event.relatedTarget !== this.columnInput.current &&
        event.relatedTarget !== this.addButton.current &&
        event.relatedTarget !== this.removeButton.current) {
      this.props.onFocusOff();
    }
  }

  handleFocus() {
    this.props.onFocusOn();
  }

  render() {
    const { rowNumber, columnNumber } = this.props;
    const disabled = checkNumbers(rowNumber, columnNumber);
    const tile = (rowNumber && columnNumber) ? 
      this.props.boardState[rowNumber - 1][columnNumber - 1] || {} : {};
    const disableAdd = tile.full;
    const disableRemove = !tile.full;
    return (
      <div className="controller">
        <div className="number-inputs">
          <span className="number-input row-container">
            <label htmlFor="rowInput">Row</label>
            <input
              id="rowInput"
              onChange={this.rowInputChange}
              onBlur={this.handleBlur}
              onFocus={this.handleFocus}
              ref={this.rowInput}
              autoFocus={true}
              type="number"
            />
          </span>
          <span className="number-input column-container">
            <label htmlFor="columnInput">Column</label>
            <input
              id="columnInput"
              onChange={this.columnInputChange}
              onBlur={this.handleBlur}
              onFocus={this.handleFocus}
              ref={this.columnInput}
              type="number"
            />
          </span>
        </div>
        <div 
          className="buttons-container"
          >
          <button
            className="add"
            disabled={disabled || disableAdd}
            onClick={this.addSoldier}
            ref={this.addButton}
          >
            Add Soldier
          </button>
          <button
            className="remove"
            disabled={disabled || disableRemove}
            onClick={this.removeSoldier}
            ref={this.removeButton}
          >
            Remove Soldier
          </button>
        </div>
      </div>);
  }
}

const mapStateToProps = state => ({
  rowNumber: state.rowNumber,
  columnNumber: state.columnNumber,
  boardState: state.boardState,
});

const mapDispatchToProps = dispatch => ({
  onRowChange: (number) => {
    dispatch(changeRow(number));
  },
  onColumnChange: (number) => {
    dispatch(changeColumn(number));
  },
  onFocusOff: () => {
    dispatch(blurInputs());
  },
  onFocusOn: () => {
    dispatch(focusInputs());
  },
  addSoldier: () => {
    dispatch(addSoldier());
  },
  removeSoldier: () => {
    dispatch(removeSoldier());
  },
});

Controller.propTypes = {
  onRowChange: PropTypes.func.isRequired,
  onColumnChange: PropTypes.func.isRequired,
  columnNumber: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  rowNumber: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  boardState: PropTypes.array.isRequired,
  addSoldier: PropTypes.func.isRequired,
  removeSoldier: PropTypes.func.isRequired,
};

Controller = connect(mapStateToProps, mapDispatchToProps)(Controller);

export default Controller;
