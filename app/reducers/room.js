let init = {
  players: [],
  name: 'default',
  playerLimit: 0,
}

const room = (state = init, action) => {
  let newState
  switch (action.type) {
    case 'UPDATE_ROOM' :
      newState = Object.assign({}, state, action.roomInfo)
      return newState
    default:
      return state 
  }
}

export default room