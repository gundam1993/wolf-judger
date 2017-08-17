let init = {
  username: '',
  id: '',
  role: '',
  lastRole: '',
  ready: false,
}

const player = (state = init, action) => {
  let newState
  switch (action.type) {
    case 'UPDATE_USERNAME' :
      newState = Object.assign({}, state, {username: action.username})
      return newState
    case 'PLAYER_READY' :
      newState = Object.assign({}, state, {ready: true})
      return newState
    case 'LEAVE_ROOM' :
      return init
    default:
      return state 
  }
}

export default player