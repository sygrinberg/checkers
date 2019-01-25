import times from 'lodash.times';
import { CHANGE_ROW, CHANGE_COLUMN, BLUR_INPUTS, FOCUS_INPUTS, ADD_SOLDIER, 
        REMOVE_SOLDIER, DRAG_START, DRAG_END, DRAG_DROP } from '../actions/actions';

const boardState = times(8, () => (
  times(8, () => ({
    full: false, 
    optional: false,
  }))
));

const initialState = {
  rowNumber: '',
  columnNumber: '',
  currentTile: {},
  dragState: {
    isOn: false,
    rowIndex: '',
    columnIndex: '',
  },
  boardState,
};

function newInputsState(state = initialState, action) {
  const rowNumber = action.type === CHANGE_ROW ? action.number : state.rowNumber;
  const columnNumber = action.type === CHANGE_COLUMN ? action.number : state.columnNumber;
  const currentBoardState = state.boardState;
  let oldTile = currentBoardState[state.rowNumber - 1] &&
                currentBoardState[state.rowNumber - 1][state.columnNumber - 1];
  if (oldTile) { // remove its optional state
    oldTile = { ...oldTile, optional: false };
    currentBoardState[state.rowNumber - 1][state.columnNumber - 1] = oldTile;
  }
  if (rowNumber && columnNumber) {
    const tile = currentBoardState[rowNumber - 1][columnNumber - 1];
    currentBoardState[rowNumber - 1][columnNumber - 1] = { ...tile,
      optional: true,
    };
    return { ...state,
      rowNumber,
      columnNumber,
    };
  }
  return { ...state,
    rowNumber,
    columnNumber,
  };
}

function toggleSoldier(state = initialState, action) {
  const isFull = action.type === ADD_SOLDIER ? true : false;
  const { rowNumber, columnNumber, boardState: currentBoardState } = state;
  const tile = boardState[rowNumber - 1][columnNumber - 1];
  currentBoardState[rowNumber - 1][columnNumber - 1] = { ...tile,
    full: isFull,
    optional: false,
  };

  return Object.assign({}, state, {
    boardState: currentBoardState,
    rowNumber: '',
    columnNumber: '',
  });
}

function dragEnd(state = initialState) {
  return { ...state,
    dragState: {
      isOn: false,
      rowIndex: '',
      columnIndex: '',
    },
  };
}

function dropSoldier(state = initialState, action) {
  const { dragState, boardState: currentBoardState } = state;
  if (typeof action.data.rowIndex === 'number' && typeof action.data.columnIndex === 'number') {
    currentBoardState[dragState.rowIndex][dragState.columnIndex] = { full: false, optional: false };
    currentBoardState[action.data.rowIndex][action.data.columnIndex] = {
      full: true,
      optional: false,
    };
  }
  return { ...state,
    dragState: {
      isOn: false,
      rowIndex: '',
      columnIndex: '',
    },
  };
}

function toggleCurrentSoldier(state = initialState, action) {
  const { rowNumber, columnNumber } = state;
  if (typeof rowNumber === 'number' && typeof columnNumber === 'number') {
    const optional = action.type === BLUR_INPUTS ? false : true;
    const tile = state.boardState[rowNumber - 1][columnNumber - 1];
    state.boardState[rowNumber - 1][columnNumber - 1] = { ...tile, optional };
    return { ...state };
  }
  return state;
}

function checkers(state = initialState, action) {
  switch (action.type) {
    case CHANGE_ROW:
    case CHANGE_COLUMN:
      return newInputsState(state, action);
    case ADD_SOLDIER:
    case REMOVE_SOLDIER:
      return toggleSoldier(state, action);
    case BLUR_INPUTS:
    case FOCUS_INPUTS:
      return toggleCurrentSoldier(state, action);
    case DRAG_START:
      return { ...state,
        dragState: {
          isOn: true,
          rowIndex: action.data.rowIndex,
          columnIndex: action.data.columnIndex,
        },
      };
    case DRAG_END:
      return dragEnd(state);
    case DRAG_DROP:
      return dropSoldier(state, action);
    default:
      return state;
  }
}

export default checkers;