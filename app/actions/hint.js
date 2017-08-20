export const UPDATE_HINT_CONTEXT = 'UPDATE_HINT_CONTEXT'
export const DISPLAY_HINT = 'DISPLAY_HINT'
export const HIDE_HINT = 'HINT_HINT'

export function updateHintContext (context) {
  return { type: UPDATE_HINT_CONTEXT, context: context}
}

export function displayHint() {
  return { type: DISPLAY_HINT }
}

export function hideHint() {
  return { type: HIDE_HINT }
}