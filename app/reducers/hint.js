let init = {
  context: '',
  display: false,
}

const hint = (state = init, action) => {
  let newState
  switch (action.type) {
    case 'UPDATE_HINT_CONTEXT' :
      newState = Object.assign({}, state, {context: action.context})
      return newState
    case 'DISPLAY_HINT' :
      newState = Object.assign({}, state, {display: true})
      return newState
    case 'HIDE_HINT' :
      newState = Object.assign({}, state, {display: false})
      return newState
    default :
      return state
  }
}

export default hint