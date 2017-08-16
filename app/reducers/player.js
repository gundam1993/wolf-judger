let init = {
  username: '',
  id: '',
  role: '',
  lastRole: '',
}

const player = (state = init, action) => {
  let newState
  switch (action.type) {
    case 'UPDATE_USERNAME' :
      newState = Object.assign({}, state, {username: action.username})
      return newState
    default:
      return state 
  }
}

export default player