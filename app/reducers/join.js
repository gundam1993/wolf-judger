const join = (state = {display: true}, action) => {
  switch (action.type) {
    case 'SHOW_JOIN' :
      return {display: true}
    case 'HIDE_JOIN' :
      return {display: false}
    default:
      return state 
  }
}

export default join