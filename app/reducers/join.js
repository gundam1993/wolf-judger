let init = {
  display: true,
  username: '',
  room: '',
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
    case 'JOIN_NEW_ROOM' :
      newState = Object.assign({}, state, action.info)
      return newState
    default:
      return state 
  }
}

export default join