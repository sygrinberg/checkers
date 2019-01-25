export const CHANGE_ROW = 'CHANGE_ROW';
export const CHANGE_COLUMN = 'CHANGE_COLUMN';

export const BLUR_INPUTS = 'BLUR_INPUTS';
export const FOCUS_INPUTS = 'FOCUS_INPUTS';

export const ADD_SOLDIER = 'ADD_SOLDIER';
export const REMOVE_SOLDIER = 'REMOVE_SOLDIER';

export const DRAG_START = 'DRAG_START';
export const DRAG_END = 'DRAG_END';
export const DRAG_DROP = 'DRAG_DROP';

export function changeRow(number) {
  return { type: CHANGE_ROW, number };
}

export function changeColumn(number) {
  return { type: CHANGE_COLUMN, number };
}

export function blurInputs() {
  return { type: BLUR_INPUTS };
}

export function focusInputs() {
  return { type: FOCUS_INPUTS };
}

export function addSoldier() {
  return { type: ADD_SOLDIER };
}

export function removeSoldier() {
  return { type: REMOVE_SOLDIER };
}

export function dragStart(data) {
  return { type: DRAG_START, data };
}

export function dragEnd(data) {
  return { type: DRAG_END, data };
}

export function dragDrop(data) {
  return { type: DRAG_DROP, data };
}