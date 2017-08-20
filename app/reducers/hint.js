let init = {
  content: '',
  subContent: '',
  display: false,
}

const hint = (state = init, action) => {
  let newState
  switch (action.type) {
    case 'UPDATE_HINT_CONTENT' :
      newState = Object.assign({}, state, {content: action.content})
      return newState
    case 'UPDATE_SUB_CONTENT' :
      newState = Object.assign({}, state, {content: action.content})
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