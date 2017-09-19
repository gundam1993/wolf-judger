let init = {
    display: false,
    chosenDrop: [],
    chosenLimit: 0,
    socketEvent: '',
  }
  
  const modal = (state = init, action) => {
    let newState
    let chosenDrop
    let dropIndex
    switch (action.type) {
      case 'DISPLAY_DROP' :
        newState = Object.assign({}, state, {display: true})
        return newState
      case 'HIDE_DROP' :
        newState = Object.assign({}, state, {display: false})
        return newState
      case 'CHOOSE_DROP':
        chosenDrop = [].concat(state.chosenDrop)
        if (chosenDrop.indexOf(action.index) === -1) {
          chosenDrop.push(action.index)
        }
        newState = Object.assign({}, state, {chosenDrop: chosenDrop})
        return newState
      case 'REMOVE_DROP' :
        chosenDrop = [].concat(state.chosenDrop)
        dropIndex = chosenDrop.indexOf(action.index)
        if (dropIndex !== -1) {
          chosenDrop.splice(dropIndex, 1)
        }
        newState = Object.assign({}, state, {chosenDrop: chosenDrop})
        return newState
      case 'CLEAN_DROP' :
        newState = Object.assign({}, state, {chosenDrop: []})
        return newState
      case 'UPDATE_DROP_LIMIT' :
        newState = Object.assign({}, state, {chosenLimit: action.chosenLimit})
        return newState
      case 'UPDATE_SOCKET_EVENT' :
        newState = Object.assign({}, state, {socketEvent: action.socketEvent})
        return newState
      default :
        return state
    }
  }
  
  export default modal