
export const DISPLAY_MODAL = 'DISPLAY_MODAL'
export const HIDE_MODAL = 'HIDE_MODAL'
export const CHOOSE_ITEM = 'CHOOSE_ITEM'
export const REMOVE_ITEM = 'REMOVE_ITEM'
export const CLEAN_CHOSEN = 'CLEAN_CHOSEN'
export const UPDATE_CHOSEN_LIMIT = 'UPDATE_CHOSEN_LIMIT'
export const UPDATE_SOCKET_EVENT = 'UPDATE_SOCKET_EVENT'
export const UPDATE_OPTIONS_SRC = 'UPDATE_OPTIONS_SRC'

export function displayModal () {
  return { type: DISPLAY_MODAL }
}

export function hideModal () {
  return { type: HIDE_MODAL }
}

export function chooseItem (index) {
  return { type: CHOOSE_ITEM, index: index }
}

export function removeItem (index) {
  return { type: REMOVE_ITEM, index: index }
}

export function cleanChosen () {
  return { type: CLEAN_CHOSEN }
}

export function updateChosenLimit (limit) {
  return { type: UPDATE_CHOSEN_LIMIT, chosenLimit: limit }
}

export function updateSocketEvent (event) {
  return { type: UPDATE_SOCKET_EVENT, socketEvent: event }
}

export function updateOptionsSrc (options) {
  return { type: UPDATE_OPTIONS_SRC, optionsSrc: options}
}
