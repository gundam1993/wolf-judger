let init = {
    display: false,
    chosenItem: [],
    chosenLimit: 0,
    socketEvent: '',
    optionsSrc: [{src: "/img/ques.png", content: ""}, {src: "/img/ques.png", content: ""}, {src: "/img/ques.png", content: ""}],
  }
  
  const modal = (state = init, action) => {
    let newState
    let chosenItem
    let dropIndex
    switch (action.type) {
      case 'DISPLAY_MODAL' :
        newState = Object.assign({}, state, {display: true})
        return newState
      case 'HIDE_MODAL' :
        newState = Object.assign({}, state, {display: false})
        return newState
      case 'CHOOSE_ITEM':
        chosenItem = [].concat(state.chosenItem)
        if (chosenItem.indexOf(action.index) === -1) {
          chosenItem.push(action.index)
        }
        newState = Object.assign({}, state, {chosenItem: chosenItem})
        return newState
      case 'REMOVE_ITEM' :
        chosenItem = [].concat(state.chosenItem)
        dropIndex = chosenItem.indexOf(action.index)
        if (dropIndex !== -1) {
          chosenItem.splice(dropIndex, 1)
        }
        newState = Object.assign({}, state, {chosenItem: chosenItem})
        return newState
      case 'CLEAN_CHOSEN' :
        newState = Object.assign({}, state, {chosenItem: []})
        return newState
      case 'UPDATE_CHOSEN_LIMIT' :
        newState = Object.assign({}, state, {chosenLimit: action.chosenLimit})
        return newState
      case 'UPDATE_SOCKET_EVENT' :
        newState = Object.assign({}, state, {socketEvent: action.socketEvent})
        return newState
      case 'UPDATE_OPTIONS_SRC' :
        newState = Object.assign({}, state, {optionsSrc: action.optionsSrc})
        return newState
      default :
        return state
    }
  }
  
  export default modal