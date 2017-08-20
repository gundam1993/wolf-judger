export const UPDATE_HINT_CONTEXT = 'UPDATE_HINT_CONTEXT'

export function updateHintContext (context) {
  return { type: UPDATE_HINT_CONTEXT, context: context}
}