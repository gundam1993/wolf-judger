export const ADD_HINT_CONTENT = 'ADD_HINT_CONTENT'
export const DISPLAY_HINT = 'DISPLAY_HINT'
export const HIDE_HINT = 'HINT_HINT'

export function addHintContent (content) {
  return { type: ADD_HINT_CONTENT, content: content}
}

export function displayHint() {
  return { type: DISPLAY_HINT }
}

export function hideHint() {
  return { type: HIDE_HINT }
}