let init = {
  context: ''
}

const hint = (state = init, action) => {
  let newState
  switch (action.type) {
    case 'UPDATE_HINT_CONTEXT' :
      newState = Object.assign({}, state, {context: action.context})
      return newState
    default :
      return newState
  }
}

export default hint