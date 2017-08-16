let init = {
  display: true,
}

const join = (state = init, action) => {
  let newState
  switch (action.type) {
    case 'SHOW_JOIN' :
      newState = Object.assign({}, state, {display: true})
      return newState
    case 'HIDE_JOIN' :
      newState = Object.assign({}, state, {display: false})
      return newState
    default:
      return state 
  }
}

export default join