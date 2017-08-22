let init = {
    display: false,
    chosenDrop: [],
  }
  
  const drop = (state = init, action) => {
    let newState
    switch (action.type) {
      case 'DISPLAY_DROP' :
        newState = Object.assign({}, state, {display: true})
        return newState
      case 'HIDE_DROP' :
        newState = Object.assign({}, state, {display: false})
        return newState
      case 'CHOOSE_DROP':
        let chosenDrop = [].concat(state.chosenDrop)
        if (chosenDrop.indexOf(action.index) === -1) {
          chosenDrop.push(action.index)
        }
        newState = Object.assign({}, state, {chosenDrop: chosenDrop})
        return newState
      case 'REMOVE_DROP' :
        let chosenDrop = [].concat(state.chosenDrop)
        let dropIndex = chosenDrop.indexOf(action.index)
        if (dropIndex !== -1) {
          chosenDrop.splice(dropIndex, 1)
        }
        newState = Object.assign({}, state, {chosenDrop: chosenDrop})
        return newState
      case 'CLEAN_DROP' :
        newState = Object.assign({}, state, {chosenDrop: []})
        return newState
      default :
        return state
    }
  }
  
  export default drop