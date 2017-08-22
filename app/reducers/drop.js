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
      default :
        return state
    }
  }
  
  export default drop