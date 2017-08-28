let init = {
  inputType: 'text',
}

const bottomControlBar = (state = init, action) => {
  let newState
  switch (action.type) {
    case 'CHANGE_INPUT_TYPE_TO_TEXT' :
      newState = Object.assign({}, state, {inputType: 'text'})
      return newState
    case 'CHANGE_INPUT_TYPE_TO_AUDIO' :
      newState = Object.assign({}, state, {inputType: 'audio'})
      return newState
    default:
      return state 
  }
}

export default bottomControlBar