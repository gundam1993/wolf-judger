export const CHANGE_INPUT_TYPE_TO_TEXT = 'CHANGE_INPUT_TYPE_TO_TEXT'
export const CHANGE_INPUT_TYPE_TO_AUDIO = 'CHANGE_INPUT_TYPE_TO_AUDIO'

// 用户输入文字
export function changeInputTypeToText() {
  return {type: CHANGE_INPUT_TYPE_TO_TEXT}
}

// 用户输入语音
export function changeInputTypeToAudio() {
  return {type: CHANGE_INPUT_TYPE_TO_AUDIO}
}
