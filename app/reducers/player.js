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
    case 'UPDATE_USER_ID' :
      newState = Object.assign({}, state, {id: action.id})
      return newState
    case 'UPDATE_USERNAME' :
      newState = Object.assign({}, state, {username: action.username})
      return newState
    case 'PLAYER_READY' :
      newState = Object.assign({}, state, {ready: true})
      return newState
    case 'UPDATE_ROLE' :
      newState = Object.assign({}, state, {role: action.role})
      return newState
    case 'UPDATE_LAST_ROLE' :
      newState = Object.assign({}, state, {lastRole: action.lastRole})
      return newState
    case 'LEAVE_ROOM' :
      return init
    default:
      return state 
  }
}

export default player