export const UPDATE_HINT_CONTENT = 'UPDATE_HINT_CONTENT'
export const UPDATE_SUB_CONTENT = 'UPDATE_SUB_CONTENT'
export const DISPLAY_HINT = 'DISPLAY_HINT'
export const HIDE_HINT = 'HINT_HINT'

export function updateHintContent (content) {
  return { type: UPDATE_HINT_CONTENT, content: content}
}

export function updateSubContent (content) {
  return {type: UPDATE_SUB_CONTENT, content: content}
}

export function displayHint() {
  return { type: DISPLAY_HINT }
}

export function hideHint() {
  return { type: HIDE_HINT }
}