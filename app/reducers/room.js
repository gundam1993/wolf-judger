let init = {
  players: {},
  name: 'default',
  playerLimit: 0,
}

const room = (state = init, action) => {
  let newState
  switch (action.type) {
    case 'UPDATE_ROOM' :
      newState = Object.assign({}, state, action.roomInfo)
      return newState
    case 'ADD_NEW_PLAYER' :
      let players = Object.assign({}, state.players)
      players[action.player.id] = action.player
      newState = Object.assign({}, state, {players: players})
      return newState
    case 'LEAVE_ROOM' :
      return init
    default:
      return state 
  }
}

export default room