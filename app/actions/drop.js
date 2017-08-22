
export const DISPLAY_DROP = 'DISPLAY_DROP'
export const HIDE_DROP = 'HIDE_DROP'
export const CHOOSE_DROP = 'CHOOSE_DROP'
export const REMOVE_DROP = 'REMOVE_DROP'
export const CLEAN_DROP = 'CLEAN_DROP'
export const UPDATE_DROP_LIMIT = 'UPDATE_DROP_LIMIT'
export const UPDATE_SOCKET_EVENT = 'UPDATE_SOCKET_EVENT'

export function displayDrop () {
  return { type: DISPLAY_DROP }
}

export function hideDrop () {
  return { type: HIDE_DROP }
}

export function chooseDrop (index) {
  return { type: CHOOSE_DROP, index: index }
}

export function removeDrop (index) {
  return { type: REMOVE_DROP, index: index }
}

export function cleanDrop () {
  return { type: CLEAN_DROP }
}

export function updateDropLimit (limit) {
  return { type: UPDATE_DROP_LIMIT, chosenLimit: limit }
}

export function updateSocketEvent (event) {
  return { type: UPDATE_SOCKET_EVENT, socketEvent: event }
}
