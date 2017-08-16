let init = {
  players: [],
  name: 'default'
}

const room = (state = init, action) => {
  let newState
  switch (action.type) {
    case 'UPDATE_USERNAME' :
      newState = Object.assign({}, state, {username: action.username})
      return newState
    default:
      return state 
  }
}

export default room