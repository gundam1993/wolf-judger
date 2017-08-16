import actions from '../actions'

function createSocketMiddleware(socket) {
  var eventFlag = false
  return store => next => action => {
    console.log('dispatching', action)
    if (!eventFlag) {
      eventFlag = true
      socket.on('joinFail', () => {
        console.log('join fail')
      })
      socket.on('joinSuccess', (res) => {
        console.log(res)
        store.dispatch(actions.updateUserId(res.player.id))
        store.dispatch(actions.updateRoom(res.roomInfo))
        next(actions.hideJoin())
      })
    }
    switch (action.type) {
      case 'JOIN_NEW_ROOM' :
        let username = store.getState().player.username
        socket.emit('join', {room: 'default', username: username})
      default:
        return next(action)
    }
  }
}

export default createSocketMiddleware