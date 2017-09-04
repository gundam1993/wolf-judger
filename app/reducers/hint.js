let init = {
  content: [],
  display: false,
}

const hint = (state = init, action) => {
  let newState
  switch (action.type) {
    case 'ADD_HINT_CONTENT' :
      let newContent = [].concat(state.content, [action.content])
      newState = Object.assign({}, state, {content: newContent})
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